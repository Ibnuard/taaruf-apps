import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { IMAGES_RES } from '../../helpers/images';
import { Button, Card, Modal, Input, Row, Dropdown } from '../../components';
import Touchable from '../../components/touchable';
import { AuthContext } from '../../context';
import { Colors, Typo } from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';

const DetailCVScreen = ({ navigation }) => {
  const [mode, setMode] = React.useState('pria') //pria || wanita

  //const {signIn} = React.useContext(AuthContext);

  const pekerjaan = ['Pelajar', 'Swasta', 'Pemerintah', 'Usaha', 'Fresh Graduate', 'BUMN', 'Tidak / Belum Bekerja']
  const pendidikan = ['SD', 'SMP', 'SMA / SMK', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']
  const status = ['Single', 'Duda', 'Menikah']
  const ibadah_rate = ['Kurang Ibadah', 'Belajar Ibadah', 'Sering Ibadah', 'Sangat Sering Ibadah']
  const suku = ['Jawa', 'Sunda', 'Batak', 'Madura', 'Betawi', 'Minangkabau', 'Bugis', 'Melayu', 'Arab', 'Banten', 'Bali', 'Sasak', 'Dayak', 'Tionghoa', 'Makassar', 'Cirebon', 'Ambon', 'Lampung', 'Tolaki']
  const skin = ['Putih', 'Kuning Lamgsat', 'Coklat', 'Hitam']

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar backgroundColor={Colors.COLOR_PRIMARY} />
      <Card style={{ margin: 4 }}>
        <Row>
          <Icon name='infocirlceo' size={24} color={Colors.COLOR_ACCENT} />
          <View style={{ marginHorizontal: 14 }}>
            <Text style={styles.textSmallInfo}>* Upload foto yang menutupi aurat</Text>
            <Text style={styles.textSmallInfo}>* Foto digunakan admin untuk verifikasi dan kemamanan</Text>
            <Text style={styles.textSmallInfo}>* Foto tidak akan di publish secara umum</Text>
          </View>
        </Row>
      </Card>
      <View style={styles.child}>
        <Dropdown
          caption={'Pilih Pekerjaan'}
          style={styles.input}
          data={pekerjaan}
          title={'Pilih Pekerjaan'} />
        <Dropdown
          caption={'Pilih Pendidikan Terakhir'}
          style={styles.input}
          data={pendidikan}
          title={'Pilih Pendidikan Terakhir'} />
        <Input
          caption={'Riwayat Pendidikan'}
          containerStyle={styles.input}
          placeholder={'Riwayat Pendidikan'} />
        <Dropdown
          caption={'Pilih Status'}
          style={styles.input}
          maxLength={3}
          data={status}
          title={'Pilih Status'} />
        <Input
          caption={'Tinggi Badan ( CM )'}
          keyboardType={'phone-pad'}
          maxLength={3}
          containerStyle={styles.input}
          placeholder={'Tinggi Badan ( CM )'} />
        <Input
          caption={'Berat Badan ( KG )'}
          keyboardType={'phone-pad'}
          containerStyle={styles.input}
          placeholder={'Berat Badan ( KG )'} />
        <Dropdown
          caption={'Melakukan Ibadah'}
          style={styles.input}
          data={ibadah_rate}
          title={'Melakukan Ibadah'} />
        <Input
          caption={'Kriteria yang diinginkan'}
          containerStyle={styles.input}
          placeholder={'Kriteria yang diinginkan'} />
        <Text
          style={styles.textInfo}>Harap tambahkan "," (koma) setiap menambahkan kriteria</Text>
        <Input
          caption={'Deskripsi singkat tentang diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Deskripsi singkat tentang diri'} />
        <Text
          style={styles.textWarn}>Minimal 100 karakter</Text>
        <Input
          caption={'Hobi'}
          containerStyle={styles.input}
          placeholder={'Hobi'} />
        <Text
          style={styles.textInfo}>Harap tambahkan "," (koma) setiap menambahkan hobi</Text>
        <Input
          caption={'Anak ke ( contoh 1 dari 3 )'}
          containerStyle={styles.input}
          placeholder={'Anak ke ( contoh 1 dari 3 )'} />
        <Dropdown
          caption={'Suku'}
          style={styles.input}
          data={suku}
          title={'Suku'} />
        <Dropdown
          caption={'Warna Kulit'}
          style={styles.input}
          data={skin}
          title={'Warna Kulit'} />
        <Input
          caption={'Riwayat Penyakit'}
          containerStyle={styles.input}
          placeholder={'Riwayat Penyakit'} />
        <Input
          caption={'Organisasi atau komunitas yang diikuti'}
          containerStyle={styles.input}
          placeholder={'Organisasi atau komunitas yang diikuti'} />
        <Input
          caption={'Kelebihan diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Kelebihan diri'} />
        <Text
          style={styles.textWarn}>Sebutkan dan jelaskan minimal 3 sifat antum. Minimal 100 karakter</Text>
        <Input
          caption={'Kekurangan diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Kekurangan diri'} />
        <Text
          style={styles.textWarn}>Sebutkan dan jelaskan minimal 3 sifat antum. Minimal 100 karakter</Text>
        <Input
          caption={'Aktivitas Harian'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Aktivitas Harian'} />
        <Text
          style={styles.textWarn}>Contoh: Pagi-Sore Bekerja dsb, semakin detail semakin baik. Minimal 100 karakter</Text>
        <Input
          caption={'Visi Misi Pernikahan'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Visi Misi Pernikahan'} />
        <Text
          style={styles.textWarn}>Minimal 100 karakter</Text>
      </View>
      <Card style={{ margin: 4 }}>
        <Row>
          <Icon name='infocirlceo' size={24} color={Colors.COLOR_ACCENT} />
          <View style={{ marginHorizontal: 14 }}>
            <Text style={styles.textSmallInfo}>Buat 3 pertanyaan untuk calon, Buatlah pertanyaan yang menurut antum penting untuk diketahui dari calon sehingga memudahkan antum untuk menilai kecocokan dengannya.</Text>
            <Text style={styles.textSmallInfoBold}>Dilarang Mencatumkan Kontak Pribadi.</Text>
          </View>
        </Row>
      </Card>
      <Input
        caption={'Pertanyaan ke 1'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 1'} />
      <Text
        style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        caption={'Pertanyaan ke 2'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 2'} />
      <Text
        style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        caption={'Pertanyaan ke 3'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 3'} />
      <Text
        style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Kode Sertifikasi Alumni Kelas Pranikah'} />
      <Text style={styles.textInfo}>Kosongi jika tidak punya</Text>
      <View style={{ marginTop: 48 }}>
        <Button title='Buat CV' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: 24
  },

  input: {
    marginTop: 24
  },

  multiline: {
    marginTop: 24,
    maxHeight: 96
  },

  child: {
    marginBottom: 28
  },
  //text style

  textSmallInfo: {
    ...Typo.TextSmallRegular
  },

  textSmallInfoBold: {
    ...Typo.TextSmallBold,
    marginTop: 12
  },

  textWarn: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_RED,
    marginTop: 4
  },


  textInfo: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_ACCENT,
    marginTop: 4
  }
});


export default DetailCVScreen;
