import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Colors, Typo} from '../../styles';
import DatePicker from 'react-native-date-picker';
import Touchable from '../../components/touchable';
import {Button, Input} from '../../components';
import {CHECK_IS_VALID, PARSE_DATE} from '../../utils/moment';
import {MushForm} from '../../utils/forms';
import _ from 'lodash';
import {USER_CHECK_DATA, USER_UPDATE_PASSWORD} from '../../helpers/firebase';

const ForgotScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noWA, setNoWA] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [inputError, setInputError] = React.useState([]);
  const [password, setPassword] = React.useState('');
  const [mode, setMode] = React.useState('cek'); // cek || ubah

  //input validation
  const input_config = [
    {
      key: 'noWA',
      required: true,
      minMaxChar: [9, 15],
      type: 'phonenumber',
      value: noWA,
    },
    {
      key: 'email',
      required: true,
      minMaxChar: [3, 128],
      type: 'email',
      value: email,
    },
  ];

  const onLanjutPressed = async () => {
    setIsLoading(true);
    const {errors} = MushForm(input_config);
    setInputError(errors);

    const data = {
      nomorwa: noWA,
      email: email,
      ttl: selectedDate,
    };

    if (_.isEmpty(errors)) {
      const isValid = await USER_CHECK_DATA(data);

      if (isValid) {
        setIsLoading(false);
        setMode('ubah');
      } else {
        setIsLoading(false);
        Alert.alert('Gagal', 'Data yang anda masukan tidak sesuai!');
      }
    } else {
      setIsLoading(false);
    }
  };

  const onUpdatePress = async () => {
    const config = [
      {
        key: 'password',
        required: true,
        minMaxChar: [6, 32],
        value: password,
      },
    ];

    setIsLoading(true);
    const {errors} = MushForm(config);
    setInputError(errors);

    const data = {
      nomorwa: noWA,
      password: password,
    };

    if (_.isEmpty(errors)) {
      await USER_UPDATE_PASSWORD(data)
        .then(() => {
          setIsLoading(false);
          Alert.alert(
            'Sukses!',
            'Kata sandi berhasil diubah, silahkan login!',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        })
        .catch(() => {
          setIsLoading(false);
          Alert.alert('Gagal!', 'Ada kesalahan mohon coba lagi');
        });
    }
  };

  function renderCek() {
    return (
      <>
        <Input
          caption={'No Whatsapp'}
          containerStyle={styles.input}
          keyboardType={'phone-pad'}
          placeholder={'No Whatsapp'}
          onChangeText={text => setNoWA(text)}
          value={noWA}
          errorMessage={inputError['noWA']}
        />
        <Input
          caption={'Email'}
          containerStyle={styles.input}
          placeholder={'Email'}
          onChangeText={text => setEmail(text)}
          value={email}
          errorMessage={inputError['email']}
        />
        <Touchable onPress={() => setShowDatePicker(true)}>
          <Input
            containerStyle={styles.input}
            editable={false}
            caption={'Tanggal Lahir'}
            placeholder={'Tanggal Lahir'}
            value={PARSE_DATE(selectedDate)}
          />
        </Touchable>
      </>
    );
  }

  function renderUbah() {
    return (
      <>
        <Input
          caption={'Kata Sandi Baru'}
          type={'password'}
          showEye={true}
          containerStyle={styles.input}
          placeholder={'Kata Sandi Baru'}
          onChangeText={text => setPassword(text)}
          value={password}
          errorMessage={inputError['password']}
        />
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <>
        <Text style={styles.textTitle}>
          {mode == 'cek'
            ? 'Masukan data berikut untuk melakukan perubahan kata sandi!'
            : 'Atur kata sandi yang baru!'}
        </Text>
        {mode == 'cek' ? renderCek() : renderUbah()}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button
            isLoading={isLoading}
            title={mode == 'cek' ? 'Lanjut' : 'Konfirmasi'}
            disabled={
              isLoading || !noWA || !email || (mode == 'ubah' && !password)
            }
            onPress={() =>
              mode == 'cek' ? onLanjutPressed() : onUpdatePress()
            }
          />
        </View>
        <DatePicker
          modal
          open={showDatePicker}
          date={selectedDate}
          mode={'date'}
          onConfirm={date => {
            setShowDatePicker(false);
            setSelectedDate(date);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />
      </>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.COLOR_WHITE,
  },

  input: {
    marginTop: 24,
  },

  textTitle: {
    ...Typo.TextLargeBold,
  },
});

export default ForgotScreen;
