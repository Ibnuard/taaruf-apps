import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {IMAGES_RES} from '../../helpers/images';
import {Button, Card, Modal, Input, Row, Dropdown} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {LaunchCamera, LaunchGallery} from '../../utils/imagePicker';

const DetailCVScreen = ({navigation}) => {
  const [mode, setMode] = React.useState('pria'); //pria || wanita
  const [imagePickerVisible, setImagePickerVisible] = React.useState(false);
  const [inputError, setInputError] = React.useState([]);

  //image
  const [selectType, setSelectType] = React.useState();
  const [faceImage, setFaceImage] = React.useState();
  const [bodyImage, setBodyImage] = React.useState();
  const [ktpImage, setKtpImage] = React.useState();

  //inpput
  const [selectedPekerjaan, setSelectedPekerjaan] = React.useState('');
  const [selectedPendidikan, setSelectedPendidikan] = React.useState('');
  const [riwayatPendidikan, setRiwayatPendidikan] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [tinggiBadan, setTinggiBadan] = React.useState('');
  const [beratBadan, setBeratBadan] = React.useState('');
  const [selectedIbadah, setSelectedIbadah] = React.useState('');
  const [kriteria, setKriteria] = React.useState('');
  const [deskripsi, setDeskripsi] = React.useState('');
  const [hobi, setHobi] = React.useState('');
  const [anak, setAnak] = React.useState('');
  const [selectedSuku, setSelectedSuku] = React.useState('');
  const [selectedWarnaKulit, setSelectedWarnaKulit] = React.useState('');
  const [penyakit, setPenyakit] = React.useState('');
  const [organisasi, setOrganisasi] = React.useState('');
  const [kelebihan, setKelebihan] = React.useState('');
  const [kekurangan, setKekurangan] = React.useState('');
  const [aktivitasHarian, setAktivitasHarian] = React.useState('');
  const [visimisi, setVisimisi] = React.useState('');

  //question
  const [firstQA, setFirstQA] = React.useState('');
  const [secondQA, setSecondQA] = React.useState('');
  const [thirdQA, setThirdQA] = React.useState('');

  //other
  const [kode, setKode] = React.useState('');

  //const {signIn} = React.useContext(AuthContext);

  const pekerjaan = [
    'Pelajar',
    'Swasta',
    'Pemerintah',
    'Usaha',
    'Fresh Graduate',
    'BUMN',
    'Tidak / Belum Bekerja',
  ];
  const pendidikan = [
    'SD',
    'SMP',
    'SMA / SMK',
    'D1',
    'D2',
    'D3',
    'D4',
    'S1',
    'S2',
    'S3',
  ];
  const status = ['Single', 'Duda', 'Menikah'];
  const ibadah_rate = [
    'Kurang Ibadah',
    'Belajar Ibadah',
    'Sering Ibadah',
    'Sangat Sering Ibadah',
  ];
  const suku = [
    'Jawa',
    'Sunda',
    'Batak',
    'Madura',
    'Betawi',
    'Minangkabau',
    'Bugis',
    'Melayu',
    'Arab',
    'Banten',
    'Bali',
    'Sasak',
    'Dayak',
    'Tionghoa',
    'Makassar',
    'Cirebon',
    'Ambon',
    'Lampung',
    'Tolaki',
  ];
  const skin = ['Putih', 'Kuning Lamgsat', 'Coklat', 'Hitam'];

  const input_config = [
    {
      key: 'riwayat',
      required: true,
      minMaxChar: [3, 128],
      value: riwayatPendidikan,
    },
    {
      key: 'tinggi',
      required: true,
      minMaxChar: [1, 3],
      value: tinggiBadan,
    },
    {
      key: 'berat',
      required: true,
      minMaxChar: [1, 3],
      value: beratBadan,
    },
    {
      key: 'kriteria',
      required: true,
      minMaxChar: [3, 128],
      value: kriteria,
    },
    {
      key: 'deskripsi',
      required: true,
      minMaxChar: [100, 1000],
      value: deskripsi,
    },
    {
      key: 'hobi',
      required: true,
      minMaxChar: [3, 512],
      value: hobi,
    },
    {
      key: 'anak',
      required: true,
      minMaxChar: [1, 2],
      value: anak,
    },
    {
      key: 'penyakit',
      required: true,
      minMaxChar: [3, 128],
      value: penyakit,
    },
    {
      key: 'penyakit',
      required: true,
      minMaxChar: [3, 128],
      value: penyakit,
    },
    {
      key: 'organisasi',
      required: true,
      minMaxChar: [3, 128],
      value: organisasi,
    },
    {
      key: 'kelebihan',
      required: true,
      minMaxChar: [3, 128],
      value: kelebihan,
    },
    {
      key: 'kekurangan',
      required: true,
      minMaxChar: [3, 128],
      value: kekurangan,
    },
    {
      key: 'aktivitas',
      required: true,
      minMaxChar: [3, 128],
      value: aktivitasHarian,
    },
    {
      key: 'visimisi',
      required: true,
      minMaxChar: [3, 128],
      value: visimisi,
    },
    {
      key: 'q1',
      required: true,
      minMaxChar: [3, 128],
      value: firstQA,
    },
    {
      key: 'q2',
      required: true,
      minMaxChar: [3, 128],
      value: secondQA,
    },
    {
      key: 'q3',
      required: true,
      minMaxChar: [3, 128],
      value: thirdQA,
    },
  ];

  const loadFromGallery = async () => {
    setImagePickerVisible(false);
    const selectedImage = await LaunchGallery();

    if (selectedImage) {
      if (selectType == 'face') {
        setFaceImage(selectedImage);
      } else if (selectType == 'body') {
        setBodyImage(selectedImage);
      } else {
        setKtpImage(selectedImage);
      }
    }
  };

  const loadFromCamera = async () => {
    setImagePickerVisible(false);
    const selectedImage = await LaunchCamera();

    if (selectedImage) {
      if (selectType == 'face') {
        setFaceImage(selectedImage);
      } else if (selectType == 'body') {
        setBodyImage(selectedImage);
      } else {
        setKtpImage(selectedImage);
      }
    }
  };

  const isButtonDisabled = () => {
    if (
      !faceImage ||
      !bodyImage ||
      !ktpImage ||
      !selectedPekerjaan ||
      !selectedPendidikan ||
      !pendidikan ||
      !status ||
      !tinggiBadan ||
      !beratBadan ||
      !selectedIbadah ||
      !kriteria ||
      !deskripsi ||
      !hobi ||
      !anak ||
      !selectedSuku ||
      !selectedWarnaKulit ||
      !penyakit ||
      !organisasi ||
      !kelebihan ||
      !kekurangan ||
      !aktivitasHarian ||
      !visimisi ||
      !firstQA ||
      !secondQA ||
      !!thirdQA
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60}}>
      <StatusBar backgroundColor={Colors.COLOR_PRIMARY} />
      <Card style={{margin: 4}}>
        <Row>
          <Icon name="infocirlceo" size={24} color={Colors.COLOR_ACCENT} />
          <View style={{marginHorizontal: 14, flex: 1}}>
            <Text style={styles.textSmallInfo}>
              * Upload foto yang menutupi aurat
            </Text>
            <Text style={styles.textSmallInfo}>
              * Foto digunakan admin untuk verifikasi dan kemamanan
            </Text>
            <Text style={styles.textSmallInfo}>
              * Foto tidak akan di publish secara umum
            </Text>
          </View>
        </Row>
      </Card>
      <Row style={{marginVertical: 8}}>
        <Card
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            setSelectType('face');
            setImagePickerVisible(true);
          }}>
          <Image
            source={
              faceImage
                ? {uri: `data:image/png;base64,${faceImage}`}
                : IMAGES_RES.man_head
            }
            style={{height: 152, margin: 4, borderRadius: 4, width: 152}}
            resizeMode={'contain'}
          />
          <Text style={styles.textPhotoInfo}>Upload Foto Wajah</Text>
        </Card>
        <Card
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => {
            setSelectType('body');
            setImagePickerVisible(true);
          }}>
          <Image
            source={
              bodyImage
                ? {uri: `data:image/png;base64,${bodyImage}`}
                : IMAGES_RES.man_body
            }
            style={{height: 152, margin: 4, borderRadius: 4, width: 152}}
            resizeMode={'contain'}
          />
          <Text style={styles.textPhotoInfo}>Upload Foto Full</Text>
        </Card>
      </Row>
      <Card
        onPress={() => {
          setSelectType('ktp');
          setImagePickerVisible(true);
        }}
        style={{
          height: 148,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!ktpImage ? (
          <Text style={styles.textPhotoInfo}>Upload Foto KTP</Text>
        ) : (
          <Image
            source={{uri: `data:image/png;base64,${ktpImage}`}}
            style={{height: 148, margin: 4, borderRadius: 4, width: '100%'}}
            resizeMode={'contain'}
          />
        )}
      </Card>
      <View style={styles.child}>
        <Dropdown
          caption={'Pilih Pekerjaan'}
          style={styles.input}
          data={pekerjaan}
          title={'Pilih Pekerjaan'}
          onItemSelected={item => setSelectedPekerjaan(item)}
        />
        <Dropdown
          caption={'Pilih Pendidikan Terakhir'}
          style={styles.input}
          data={pendidikan}
          title={'Pilih Pendidikan Terakhir'}
          onItemSelected={item => setSelectedPendidikan(item)}
        />
        <Input
          caption={'Riwayat Pendidikan'}
          containerStyle={styles.input}
          placeholder={'Riwayat Pendidikan'}
          errorMessage={inputError['riwayat']}
        />
        <Text style={styles.textInfo}>
          Sebutkan nama sekolah atau universitas
        </Text>
        <Dropdown
          caption={'Pilih Status'}
          style={styles.input}
          maxLength={3}
          data={status}
          title={'Pilih Status'}
          onItemSelected={item => setSelectedStatus(item)}
        />
        <Input
          caption={'Tinggi Badan ( CM )'}
          keyboardType={'phone-pad'}
          maxLength={3}
          containerStyle={styles.input}
          placeholder={'Tinggi Badan ( CM )'}
          errorMessage={inputError['tinggi']}
        />
        <Input
          caption={'Berat Badan ( KG )'}
          keyboardType={'phone-pad'}
          containerStyle={styles.input}
          placeholder={'Berat Badan ( KG )'}
          errorMessage={inputError['berat']}
        />
        <Dropdown
          caption={'Melakukan Ibadah'}
          style={styles.input}
          data={ibadah_rate}
          title={'Melakukan Ibadah'}
          onItemSelected={item => setSelectedIbadah(item)}
        />
        <Input
          caption={'Kriteria yang diinginkan'}
          containerStyle={styles.input}
          placeholder={'Kriteria yang diinginkan'}
          errorMessage={inputError['kriteria']}
        />
        <Text style={styles.textInfo}>
          Harap tambahkan "," (koma) setiap menambahkan kriteria
        </Text>
        <Input
          caption={'Deskripsi singkat tentang diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Deskripsi singkat tentang diri'}
          errorMessage={inputError['deskripsi']}
        />
        <Input
          caption={'Hobi'}
          containerStyle={styles.input}
          placeholder={'Hobi'}
          errorMessage={inputError['hobi']}
        />
        <Text style={styles.textInfo}>
          Harap tambahkan "," (koma) setiap menambahkan hobi
        </Text>
        <Input
          caption={'Anak ke ( contoh 1 dari 3 )'}
          containerStyle={styles.input}
          placeholder={'Anak ke ( contoh 1 dari 3 )'}
          errorMessage={inputError['anak']}
        />
        <Dropdown
          caption={'Suku'}
          style={styles.input}
          data={suku}
          title={'Suku'}
          onItemSelected={item => setSelectedSuku(item)}
        />
        <Dropdown
          caption={'Warna Kulit'}
          style={styles.input}
          data={skin}
          title={'Warna Kulit'}
          onItemSelected={item => setSelectedWarnaKulit(item)}
        />
        <Input
          caption={'Riwayat Penyakit'}
          containerStyle={styles.input}
          placeholder={'Riwayat Penyakit'}
          errorMessage={inputError['penyakit']}
        />
        <Input
          caption={'Organisasi atau komunitas yang diikuti'}
          containerStyle={styles.input}
          placeholder={'Organisasi atau komunitas yang diikuti'}
          errorMessage={inputError['organisasi']}
        />
        <Input
          caption={'Kelebihan diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Kelebihan diri'}
          errorMessage={inputError['kelebihan']}
        />
        <Text style={styles.textInfo}>
          Sebutkan dan jelaskan minimal 3 sifat antum
        </Text>
        <Input
          caption={'Kekurangan diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Kekurangan diri'}
          errorMessage={inputError['kekurangan']}
        />
        <Text style={styles.textInfo}>
          Sebutkan dan jelaskan minimal 3 sifat antum
        </Text>
        <Input
          caption={'Aktivitas Harian'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Aktivitas Harian'}
          errorMessage={inputError['aktivitas']}
        />
        <Text style={styles.textInfo}>
          Contoh: Pagi-Sore Bekerja dsb, semakin detail semakin baik
        </Text>
        <Input
          caption={'Visi Misi Pernikahan'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Visi Misi Pernikahan'}
          errorMessage={inputError['visimisi']}
        />
      </View>
      <Card style={{margin: 4}}>
        <Row>
          <Icon name="infocirlceo" size={24} color={Colors.COLOR_ACCENT} />
          <View style={{marginHorizontal: 14, flex: 1}}>
            <Text style={styles.textSmallInfo}>
              Buat 3 pertanyaan untuk calon, Buatlah pertanyaan yang menurut
              antum penting untuk diketahui dari calon sehingga memudahkan antum
              untuk menilai kecocokan dengannya.
            </Text>
            <Text style={styles.textSmallInfoBold}>
              Dilarang Mencatumkan Kontak Pribadi.
            </Text>
          </View>
        </Row>
      </Card>
      <Input
        caption={'Pertanyaan ke 1'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 1'}
      />
      <Text style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        caption={'Pertanyaan ke 2'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 2'}
      />
      <Text style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        caption={'Pertanyaan ke 3'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 3'}
      />
      <Text style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Kode Sertifikasi Alumni Kelas Pranikah'}
      />
      <Text style={styles.textInfo}>Kosongi jika tidak punya</Text>
      <View style={{marginTop: 48}}>
        <Button
          disabled={!isButtonDisabled()}
          title="Buat CV"
          onPress={() => navigation.navigate('DoneCV')}
        />
      </View>
      <Modal
        type={'popup3b'}
        visible={imagePickerVisible}
        onPress={() => setImagePickerVisible(false)}
        onOptionButtonPress={type =>
          type == 'first' ? loadFromGallery() : loadFromCamera()
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
    padding: 24,
  },

  input: {
    marginTop: 24,
  },

  multiline: {
    marginTop: 24,
    maxHeight: 72,
  },

  child: {
    marginBottom: 28,
  },
  //text style

  textSmallInfo: {
    ...Typo.TextSmallRegular,
  },

  textSmallInfoBold: {
    ...Typo.TextSmallBold,
    marginTop: 12,
  },

  textWarn: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_RED,
    marginTop: 4,
  },

  textInfo: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_ACCENT,
    marginTop: 4,
  },

  textPhotoInfo: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_BLACK,
    marginTop: 4,
  },
});

export default DetailCVScreen;
