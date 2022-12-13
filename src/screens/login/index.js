import * as React from 'react';
import {View, Text, Image, StyleSheet, StatusBar, Alert} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {
  USER_GET_ADMIN_INFO,
  USER_LOGIN,
  USER_REGISTER,
} from '../../helpers/firebase';
import {IMAGES_RES} from '../../helpers/images';
import {storeUserSession} from '../../helpers/storage';
import {Colors, Typo} from '../../styles';
import {retrieveData} from '../../utils/store';

const LoginScreen = ({navigation}) => {
  const [nomor, setNomor] = React.useState('');
  const [pw, setPW] = React.useState('');
  const [adminData, setAdminData] = React.useState({no: '', pw: ''});

  const [isLoading, setIsLoading] = React.useState(false);

  const {signIn, admin} = React.useContext(AuthContext);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAdminInfo();
    });

    return unsubscribe;
  }, [navigation]);

  async function getAdminInfo() {
    const data = await USER_GET_ADMIN_INFO();

    if (data) {
      setAdminData({no: data?.loginNumber, pw: data?.loginPassword});
    }
  }

  console.log('admin : ' + JSON.stringify(adminData));

  const ADMIN = {
    no: '000000',
    pw: 'ADMIN0123',
  };

  const _userLogin = async () => {
    setIsLoading(true);
    const data = {
      nomor: nomor,
      password: pw,
    };

    if (nomor == adminData.no && pw == adminData.pw) {
      console.log('login admin');
      admin();
    } else {
      console.log('Login user!');
      const login = await USER_LOGIN(data);

      if (login == 'NOT_USER') {
        setIsLoading(false);
        Alert.alert('Gagal Masuk', 'User tidak ditemukan!');
      } else if (login == 'PASSWORD_INVALID') {
        setIsLoading(false);
        Alert.alert('Gagal Masuk', 'Kata Sandi salah!');
      } else {
        setIsLoading(false);
        const token = await retrieveData('fcmToken');
        await storeUserSession({token: token, ...login});

        signIn();
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
      <Image
        source={IMAGES_RES.wave_background}
        style={{width: '100%', height: 100, marginBottom: 24}}
        resizeMode={'stretch'}
      />
      <View style={styles.child}>
        <Text style={styles.textLogin}>Login</Text>
        <Text style={styles.textDesc}>
          Mungkinkan jodoh anda di sini ? Ayo dapatkan jodoh dengan jalan
          ta'aruf silahkan buat CV atau login
        </Text>
        <View style={styles.inputContainer}>
          <Input
            containerStyle={styles.input}
            placeholder={'No Whatsapp'}
            keyboardType={'phone-pad'}
            onChangeText={item => setNomor(item)}
            value={nomor}
          />
          <Input
            placeholder={'Kata Sandi'}
            showEye
            type={'password'}
            onChangeText={item => setPW(item)}
            value={pw}
          />
        </View>
        <Touchable
          style={{alignSelf: 'flex-end', marginTop: 14}}
          onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.textCreateCV}>Lupa Password?</Text>
        </Touchable>
        <View style={styles.bottomContainer}>
          <Button
            isLoading={isLoading}
            disabled={!nomor || !pw}
            title="Masuk"
            onPress={() => _userLogin()}
          />
          <Row style={styles.rowBottom}>
            <Text style={styles.textDontHaveAccount}>Belum punya akun?</Text>
            <Touchable onPress={() => navigation.navigate('CreateCV')}>
              <Text style={styles.textCreateCV}>Buat CV</Text>
            </Touchable>
          </Row>
        </View>
      </View>
    </View>
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

  input: {
    marginBottom: 14,
  },

  inputContainer: {
    marginTop: 24,
  },

  bottomContainer: {
    marginTop: 32,
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

export default LoginScreen;
