import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import DatePicker from 'react-native-date-picker';
import {CHECK_IS_VALID, PARSE_DATE} from '../../utils/moment';
import {MushForm} from '../../utils/forms';
import _ from 'lodash';
import {CHECK_USER} from '../../helpers/firebase';

const CreateCVScreen = ({navigation, route}) => {
  const [mode, setMode] = React.useState('pria'); //pria || wanita
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [inputError, setInputError] = React.useState([]);

  //input
  const [name, setName] = React.useState('');
  const [domisiliOrangTua, setDomisiliOrangTua] = React.useState('');
  const [alamat, setAlamat] = React.useState('');
  const [noWA, setNoWA] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  //other
  const [isLoading, setIsLoading] = React.useState(false);

  const SELECTED_DOMISILI = route?.params?.domisili;

  //const {signIn} = React.useContext(AuthContext);

  //input validation
  const input_config = [
    {
      key: 'name',
      required: true,
      minMaxChar: [3, 64],
      value: name,
    },
    {
      key: 'olddomisili',
      required: true,
      minMaxChar: [3, 128],
      value: domisiliOrangTua,
    },
    {
      key: 'alamat',
      required: true,
      minMaxChar: [3, 128],
      value: alamat,
    },
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
    {
      key: 'password',
      required: true,
      minMaxChar: [6, 32],
      value: password,
    },
  ];

  const _doInputValidation = async () => {
    setIsLoading(true);
    const {errors} = MushForm(input_config);
    setInputError(errors);

    console.log(errors);

    const data = {
      gender: mode,
      nama: name,
      ttl: String(selectedDate),
      kota: SELECTED_DOMISILI,
      orangtuadom: domisiliOrangTua,
      alamatdom: alamat,
      nomorwa: noWA,
      email: email,
      password: password,
    };

    if (_.isEmpty(errors)) {
      setIsLoading(false);
      //navigation.navigate('DetailCV', {data: data});
      const isUser = await CHECK_USER(noWA);

      if (isUser) {
        console.log('Exist');
        Alert.alert('Gagal!', 'Nomor sudah terdaftar!');
      } else {
        navigation.navigate('DetailCV', {data: data});
        console.log('Not Exist');
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60}}>
      <StatusBar backgroundColor={Colors.COLOR_PRIMARY} />
      <Image
        source={IMAGES_RES.wave_background}
        style={{width: '100%', height: 100, marginBottom: 24}}
        resizeMode={'stretch'}
      />
      <View style={styles.child}>
        <Text style={styles.textLogin}>Buat CV</Text>
        <Text style={styles.textDesc}>
          Isi CV dengan jujur karena sebagai pondasi awal kepercayaan dan akan
          diajukan ke calon pasangan
        </Text>
        <Text style={styles.textPilihGender}>Pilih Gender</Text>
        <Row>
          <Touchable
            style={mode == 'pria' ? styles.boxPria : styles.box}
            onPress={() => setMode('pria')}>
            <Text
              style={
                mode == 'pria' ? styles.textModeActive : styles.textModeInactive
              }>
              Laki - laki
            </Text>
          </Touchable>
          <View style={{marginHorizontal: 4}} />
          <Touchable
            style={mode !== 'pria' ? styles.boxWanita : styles.box}
            onPress={() => setMode('wanita')}>
            <Text
              style={
                mode !== 'pria'
                  ? styles.textModeActive
                  : styles.textModeInactive
              }>
              Perempuan
            </Text>
          </Touchable>
        </Row>
        <View>
          <Input
            caption={'Nama Lengkap'}
            containerStyle={styles.input}
            placeholder={'Nama Lengkap'}
            onChangeText={text => setName(text)}
            value={name}
            errorMessage={inputError['name']}
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
          <Touchable onPress={() => navigation.navigate('Domisili')}>
            <Input
              caption={'Kota Domisili'}
              containerStyle={styles.input}
              editable={false}
              placeholder={'Kota Domisili'}
              value={SELECTED_DOMISILI}
            />
          </Touchable>
          <Input
            caption={'Kota Domisili Orang Tua'}
            containerStyle={styles.input}
            placeholder={'Kota Domisili Orang Tua'}
            onChangeText={text => setDomisiliOrangTua(text)}
            value={domisiliOrangTua}
            errorMessage={inputError['olddomisili']}
          />
          <Input
            caption={'Alamat Domisili'}
            containerStyle={styles.input}
            placeholder={'Alamat Domisili'}
            onChangeText={text => setAlamat(text)}
            value={alamat}
            errorMessage={inputError['alamat']}
          />
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
          <Input
            caption={'Kata Sandi'}
            type={'password'}
            showEye={true}
            containerStyle={styles.input}
            placeholder={'Kata Sandi'}
            onChangeText={text => setPassword(text)}
            value={password}
            errorMessage={inputError['password']}
          />
          <View style={{marginTop: 48}}>
            <Button
              disabled={
                !name.length ||
                !SELECTED_DOMISILI?.length ||
                !domisiliOrangTua.length ||
                !alamat.length ||
                !noWA.length ||
                !password.length
              }
              title="Lanjutkan"
              isLoading={isLoading}
              onPress={() => _doInputValidation()}
            />
          </View>
          <Row style={styles.rowBottom}>
            <Text style={styles.textDontHaveAccount}>Sudah punya akun?</Text>
            <Touchable onPress={() => navigation.goBack()}>
              <Text style={styles.textCreateCV}>Masuk</Text>
            </Touchable>
          </Row>
        </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  child: {
    flex: 1,
    paddingHorizontal: 24,
  },

  box: {
    backgroundColor: Colors.COLOR_WHITE,
    borderWidth: 0.5,
    height: 42,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxPria: {
    backgroundColor: Colors.COLOR_ACCENT,
    height: 42,
    width: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxWanita: {
    backgroundColor: Colors.COLOR_PINK,
    height: 42,
    width: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    marginTop: 24,
  },

  rowBottom: {
    alignSelf: 'center',
    marginTop: 32,
  },

  //text style

  textLogin: {
    ...Typo.TextLargeBold,
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_BLACK,
    marginVertical: 8,
  },

  textPilihGender: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_SECONDARY,
    marginVertical: 14,
  },

  textModeActive: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_WHITE,
  },

  textModeInactive: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_BLACK,
  },

  textDontHaveAccount: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY,
  },

  textCreateCV: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_ACCENT,
    paddingHorizontal: 8,
  },
});

export default CreateCVScreen;
