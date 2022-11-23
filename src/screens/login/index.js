import * as React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {USER_REGISTER} from '../../helpers/firebase';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';

const LoginScreen = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  const _userLogin = () => {
    const data = {
      phone: '0857',
      name: 'Ibnu',
      password: 1234,
    };

    USER_REGISTER(data)
      .then(() => console.log('Sukses'))
      .catch(error => console.log('Error: ' + error));
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
        <Text style={styles.textLogin}>Masuk</Text>
        <Text style={styles.textDesc}>
          Bismillah, mencari pasangan yang halal dengan cara taaruf
        </Text>
        <View style={styles.inputContainer}>
          <Input
            containerStyle={styles.input}
            placeholder={'No Whatsapp'}
            keyboardType={'phone-pad'}
          />
          <Input placeholder={'Kata Sandi'} showEye type={'password'} />
        </View>
        <View style={styles.bottomContainer}>
          <Button title="Masuk" onPress={() => _userLogin()} />
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
