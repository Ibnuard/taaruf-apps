import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Button, Card, Modal, Input, Row } from '../../components';
import Touchable from '../../components/touchable';
import { AuthContext } from '../../context';
import { IMAGES_RES } from '../../helpers/images';
import { Colors, Typo } from '../../styles';
import DatePicker from 'react-native-date-picker'
import { CHECK_IS_VALID, PARSE_DATE } from '../../utils/moment';

const CreateCVScreen = ({ navigation, route }) => {
  const [mode, setMode] = React.useState('pria') //pria || wanita
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [showDatePicker, setShowDatePicker] = React.useState(false)

  const SELECTED_DOMISILI = route?.params?.domisili

  //const {signIn} = React.useContext(AuthContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar backgroundColor={Colors.COLOR_PRIMARY} />
      <Image
        source={IMAGES_RES.wave_background}
        style={{ width: '100%', height: 100, marginBottom: 24 }}
        resizeMode={'stretch'} />
      <View style={styles.child}>
        <Text style={styles.textLogin}>Buat CV</Text>
        <Text style={styles.textDesc}>Isi CV dengan jujur karena sebagai pondasi awal kepercayaan dan akan diajukan ke calon pasangan</Text>
        <Text style={styles.textPilihGender}>Pilih Gender</Text>
        <Row>
          <Touchable style={mode == 'pria' ? styles.boxPria : styles.box} onPress={() => setMode('pria')}>
            <Text style={mode == 'pria' ? styles.textModeActive : styles.textModeInactive}>Laki - laki</Text>
          </Touchable>
          <View style={{ marginHorizontal: 4 }} />
          <Touchable style={mode !== 'pria' ? styles.boxWanita : styles.box} onPress={() => setMode('wanita')}>
            <Text style={mode !== 'pria' ? styles.textModeActive : styles.textModeInactive}>Perempuan</Text>
          </Touchable>
        </Row>
        <View>
          <Input caption={'Nama Lengkap'} containerStyle={styles.input} placeholder={'Nama Lengkap'} />
          <Touchable onPress={() => setShowDatePicker(true)}>
            <Input
              containerStyle={styles.input}
              editable={false}
              caption={'Tanggal Lahir'}
              placeholder={'Tanggal Lahir'}
              value={PARSE_DATE(selectedDate)} />
          </Touchable>
          <Touchable onPress={() => navigation.navigate('Domisili')}>
            <Input
              caption={'Kota Domisili'}
              containerStyle={styles.input}
              editable={false}
              placeholder={'Kota Domisili'}
              value={SELECTED_DOMISILI} />
          </Touchable>
          <Input
            caption={'Kota Domisili Orang Tua'}
            containerStyle={styles.input}
            placeholder={'Kota Domisili Orang Tua'} />
          <Input
            caption={'Alamat Domisili'}
            containerStyle={styles.input}
            placeholder={'Alamat Domisili'} />
          <Input
            caption={'No Whatsapp'}
            containerStyle={styles.input}
            keyboardType={'phone-pad'}
            placeholder={'No Whatsapp'} />
          <Input
            caption={'Kata Sandi'}
            type={'password'}
            showEye={true}
            containerStyle={styles.input}
            placeholder={'Kata Sandi'} />
          <View style={{ marginTop: 48 }}>
            <Button title='Lanjutkan' onPress={() => navigation.navigate('DetailCV')} />
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
        onConfirm={(date) => {
          setShowDatePicker(false)
          setSelectedDate(date)
        }}
        onCancel={() => {
          setShowDatePicker(false)
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE
  },

  child: {
    flex: 1,
    paddingHorizontal: 24,
  },

  box: {
    backgroundColor: Colors.COLOR_WHITE,
    borderWidth: .5,
    height: 42,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  boxPria: {
    backgroundColor: Colors.COLOR_ACCENT,
    height: 42,
    width: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  boxWanita: {
    backgroundColor: Colors.COLOR_PINK,
    height: 42,
    width: 128,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    marginTop: 24
  },

  rowBottom: {
    alignSelf: 'center',
    marginTop: 32
  },

  //text style

  textLogin: {
    ...Typo.TextLargeBold
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_BLACK,
    marginVertical: 8
  },

  textPilihGender: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_SECONDARY,
    marginVertical: 14
  },

  textModeActive: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_WHITE
  },

  textModeInactive: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_BLACK
  },

  textDontHaveAccount: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY
  },

  textCreateCV: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_ACCENT,
    paddingHorizontal: 8
  }
});


export default CreateCVScreen;
