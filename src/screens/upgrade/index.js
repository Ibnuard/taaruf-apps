import * as React from 'react';
import {View, Text, StyleSheet, Image, Alert, ScrollView} from 'react-native';
import {Button, Card} from '../../components';
import {
  USER_CHECK_STATUS,
  USER_GET_ADMIN_INFO,
  USER_REQUEST_PREMIUM,
} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';
import {Colors, Typo} from '../../styles';
import {formatRupiah} from '../../utils/utils';

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
      setStatus(status);
    }
  }

  console.log('ADMIN INFO : ' + JSON.stringify(admin));

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 62}}>
      <Card style={{marginBottom: 14}}>
        <Text style={styles.textQ}>Kenapa sih berbayar?</Text>
        <Text style={styles.textA}>
          Untuk menjaga komitemen dan keseriusan proses taaruf agar aplikasi
          tidak di gunakan untuk permainan
        </Text>
      </Card>
      <Card style={{marginBottom: 14}}>
        <Text style={styles.textQ}>Berapa sih biayanya ?</Text>
        <Text style={styles.textA}>
          Biayanya adalah {formatRupiah(admin?.biaya)}
        </Text>
      </Card>
      <Card style={{marginBottom: 14}}>
        <Text style={styles.textQ}>Dapat apa saja ?</Text>
        <Text style={styles.textA}>
          - bisa mengajukan 5 cv setiap bulan {'\n'}- cv yang du ajukan tidak
          hilang selama 3 bulan {'\n'}- unlimited menerima pengajuan cv {'\n'}-
          tidak du kenakan infaq pembayaran di bulan berikutnya - akun premium
          akan hangus setelah nadzor {'\n'}- dapat melihat cv yang memfavoritkan
          {'\n'}- pendampingan admin taaruf secara online saat taaruf
        </Text>
      </Card>
      <Card style={{marginBottom: 14}}>
        <Text style={styles.textQ}>Untuk apa biayanya ?</Text>
        <Text style={styles.textA}>
          - akomodasi admin selama proses taaruf {'\n'}- maintenance server dan
          pengembangan aplikasi {'\n'}- operasional tim
        </Text>
      </Card>
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
    </ScrollView>
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

  textQ: {
    ...Typo.TextMediumBold,
    marginBottom: 8,
  },

  textA: {
    ...Typo.TextNormalRegular,
  },
});

export default UpgradeScreen;
