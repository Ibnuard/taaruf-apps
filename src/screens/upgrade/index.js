import * as React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {Button, Card} from '../../components';
import {
  USER_CHECK_STATUS,
  USER_GET_ADMIN_INFO,
  USER_REQUEST_PREMIUM,
} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';
import {Colors, Typo} from '../../styles';

const UpgradeScreen = ({navigation, route}) => {
  const [status, setStatus] = React.useState('idle');
  const [isLoading, setIsLoading] = React.useState(false);
  const [admin, setAdmin] = React.useState();

  const USER = route?.params?.user;

  React.useLayoutEffect(() => {
    getAdminInfo();
  }, []);

  React.useEffect(() => {
    getUserStatus();
  }, [isLoading]);

  async function getAdminInfo() {
    setIsLoading(true);
    const info = await USER_GET_ADMIN_INFO();

    if (info) {
      setIsLoading(false);
      setAdmin(info);
    }
  }

  async function getUserStatus() {
    const session = await retrieveUserSession();
    const parsed = JSON.parse(session);

    const status = await USER_CHECK_STATUS(parsed?.nomorwa);

    if (status) {
      console.log(`status : ${parsed?.nomorwa}` + status);
      setStatus(status);
    }
  }

  async function onTransferPress() {
    const session = await retrieveUserSession();
    const parsed = JSON.parse(session);

    setIsLoading(true);
    const data = {premiumStatus: 'pending', ...parsed};
    await USER_REQUEST_PREMIUM(data)
      .then(() => {
        setIsLoading(false);
        Alert.alert(
          'Sukses',
          'Permintaan premium berhasil dikirim, mohon tunggu sampai admin melakukan cek!',
        );
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Gagal', 'Ada kesalahan mohon coba lagi!');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textDesc}>
        Silahkan lakukan tranfer ke rekening berikut untuk dapat meningkatkan
        akun anda, sehingga anda dapat menggunakan semua fitur aplikasi ini.
      </Text>
      <Card style={{alignItems: 'center', marginVertical: 14}}>
        <Text style={styles.textAccNo}>{admin?.bankNumber ?? '...'}</Text>
        <Image />
        <Text style={styles.textBankDesc}>
          {admin?.bankName ?? '...'} a/n {admin?.bankHolder ?? '...'}
        </Text>
      </Card>
      <Text style={styles.textDesc}>
        Pilih sudah transfer jika anda sudah melakukan transfer
      </Text>
      {status == 'reject' && (
        <Text style={styles.textDescRed}>
          Permintaan upgrade akun sebelumnya telah ditolak, Mohon periksa data
          anda dan ajukan ulang!
        </Text>
      )}
      <View style={{marginTop: 24}}>
        <Button
          disabled={status == 'pending' || isLoading}
          isLoading={isLoading}
          title={
            status == 'pending'
              ? 'Akun Sedang Ditinjau'
              : 'Sudah Tranfer, Ajukan!'
          }
          onPress={() => onTransferPress()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  textAccNo: {
    ...Typo.TextLargeBold,
    color: Colors.COLOR_BLACK,
  },

  textBankDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY,
    marginTop: 4,
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY,
    marginTop: 8,
  },

  textDescRed: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_RED,
    marginTop: 8,
  },
});

export default UpgradeScreen;
