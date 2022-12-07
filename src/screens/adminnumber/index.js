import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, Input} from '../../components';
import {AuthContext} from '../../context';
import {GET_ADMIN_NUMBER, SAVE_ADMIN_NUMBER} from '../../helpers/admin';
import {USER_GET_ADMIN_INFO} from '../../helpers/firebase';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';

const AdminNumberScreen = ({navigation}) => {
  const [number, setNumber] = React.useState('');
  const [bankName, setBankName] = React.useState('');
  const [bankHolder, setBankHolder] = React.useState('');
  const [bankNumber, setBankNumber] = React.useState('');
  const [isLoading, setIsLoading] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [alamat, setAlamat] = React.useState('');
  const [instagram, setInstagram] = React.useState('');

  React.useLayoutEffect(() => {
    getAdminNumber();
  }, []);

  async function getAdminNumber() {
    setIsLoading(true);
    const data = await USER_GET_ADMIN_INFO();

    if (data) {
      setNumber(data?.wa);
      setBankHolder(data?.bankHolder);
      setBankName(data?.bankName);
      setBankNumber(data?.bankNumber);
      setEmail(data?.email);
      setAlamat(data?.alamat);
      setInstagram(data?.instagram);
    }

    setIsLoading(false);
  }

  async function onSavePress() {
    setIsLoading(true);

    const data = {
      wa: number,
      bankHolder: bankHolder,
      bankName: bankName,
      bankNumber: bankNumber,
      email: email,
      alamat: alamat,
      instagram: instagram,
    };

    await SAVE_ADMIN_NUMBER(data)
      .then(() => {
        setIsLoading(false);
        Alert.alert('Sukses', 'Info admin berhasil disimpan!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Gagal', 'Ada kesalahan mohon coba lagi!');
      });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
      <View style={{padding: 24}}>
        <Text style={styles.textTitle}>Nomor Admin Harus Diawali 628</Text>
        <Input
          placeholder={'Masukan nomor wa admin'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setNumber(text)}
          value={number}
        />
        <Text style={styles.textTitle}>Bank Admin ( BCA, MANDIRI, DLL )</Text>
        <Input
          placeholder={'Masukan nama bank admin'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setBankName(text)}
          value={bankName}
        />
        <Text style={styles.textTitle}>Nama Pemegang Rekening Admin</Text>
        <Input
          placeholder={'Masukan nama pemegang rekening'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setBankHolder(text)}
          value={bankHolder}
        />
        <Text style={styles.textTitle}>Nomor Rekening</Text>
        <Input
          placeholder={'Masukan nomor rekening'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setBankNumber(text)}
          value={bankNumber}
        />
        <Text style={styles.textTitle}>Email</Text>
        <Input
          placeholder={'Masukan email'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Text style={styles.textTitle}>Alamat</Text>
        <Input
          placeholder={'Masukan alamat'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setAlamat(text)}
          value={alamat}
        />
        <Text style={styles.textTitle}>Instagram</Text>
        <Input
          placeholder={'Masukan instagram'}
          containerStyle={{marginTop: 14, marginBottom: 24}}
          onChangeText={text => setInstagram(text)}
          value={instagram}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end', padding: 24}}>
        <Button
          isLoading={isLoading}
          disabled={!number || !bankHolder || !bankName || !bankNumber}
          title={'Simpan'}
          onPress={() => onSavePress()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textTitle: {
    ...Typo.TextNormalBold,
  },
});

export default AdminNumberScreen;
