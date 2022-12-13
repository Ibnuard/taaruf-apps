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
import {IMAGES_RES} from '../../helpers/images';
import {Button, Card, Modal, Input, Row, Dropdown} from '../../components';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {LaunchCamera, LaunchGallery} from '../../utils/imagePicker';
import _ from 'lodash';
import {MushForm} from '../../utils/forms';
import {USER_REGISTER, USER_UPDATE} from '../../helpers/firebase';
import {storeUserSession, updateUserSession} from '../../helpers/storage';
import Touchable from '../../components/touchable';
import DatePicker from 'react-native-date-picker';
import {PARSE_DATE} from '../../utils/moment';

const DetailCVScreen = ({navigation, route}) => {
  const KEY = route?.params?.key;
  const USER = route?.params?.user;

  const [mode, setMode] = React.useState('pria'); //pria || wanita
  const [imagePickerVisible, setImagePickerVisible] = React.useState(false);
  const [inputError, setInputError] = React.useState([]);

  //image
  const [selectType, setSelectType] = React.useState();
  const [faceImage, setFaceImage] = React.useState(USER?.fotowajah ?? '');
  const [bodyImage, setBodyImage] = React.useState(USER?.fotofull ?? '');
  const [ktpImage, setKtpImage] = React.useState(USER?.fotoid ?? '');

  //inpput
  const [selectedPekerjaan, setSelectedPekerjaan] = React.useState(
    USER?.pekerjaan ?? '',
  );
  const [selectedPendidikan, setSelectedPendidikan] = React.useState(
    USER?.pendidikanTerakhir ?? '',
  );
  const [riwayatPendidikan, setRiwayatPendidikan] = React.useState(
    USER?.riwayatPendidikan ?? '',
  );
  const [selectedStatus, setSelectedStatus] = React.useState(
    USER?.status ?? '',
  );
  const [tinggiBadan, setTinggiBadan] = React.useState(USER?.tinggi ?? '');
  const [beratBadan, setBeratBadan] = React.useState(USER?.berat ?? '');
  const [selectedIbadah, setSelectedIbadah] = React.useState(
    USER?.ibadah ?? '',
  );
  const [kriteria, setKriteria] = React.useState(USER?.kriteria ?? '');
  const [deskripsi, setDeskripsi] = React.useState(USER?.deskripsi ?? '');
  const [hobi, setHobi] = React.useState(USER?.hobi ?? '');
  const [anak, setAnak] = React.useState(USER?.anak ?? '');
  const [selectedSuku, setSelectedSuku] = React.useState(USER?.suku ?? '');
  const [selectedWarnaKulit, setSelectedWarnaKulit] = React.useState(
    USER?.kulit ?? '',
  );
  const [penyakit, setPenyakit] = React.useState(USER?.penyakit ?? '');
  const [organisasi, setOrganisasi] = React.useState(USER?.organisasi ?? '');
  const [kelebihan, setKelebihan] = React.useState(USER?.kelebihan ?? '');
  const [kekurangan, setKekurangan] = React.useState(USER?.kekurangan ?? '');
  const [aktivitasHarian, setAktivitasHarian] = React.useState(
    USER?.aktivitas ?? '',
  );
  const [visimisi, setVisimisi] = React.useState(USER?.visimisi ?? '');

  //question
  const [firstQA, setFirstQA] = React.useState(USER?.pertanyaansatu ?? '');
  const [secondQA, setSecondQA] = React.useState(USER?.pertanyaandua ?? '');
  const [thirdQA, setThirdQA] = React.useState(USER?.pertanyaantiga ?? '');

  //other
  const [kode, setKode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  //EDIT
  const [name, setName] = React.useState(USER?.nama ?? '');
  const [domisiliOrangTua, setDomisiliOrangTua] = React.useState(
    USER?.orangtuadom ?? '',
  );
  const [alamat, setAlamat] = React.useState(USER?.alamatdom ?? '');
  const [selectedDate, setSelectedDate] = React.useState(
    USER?.ttl ? new Date(USER?.ttl) : new Date(),
  );
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const SELECTED_DOMISILI = route?.params?.domisili ?? USER?.kota;

  //const {signIn} = React.useContext(AuthContext);

  //DATA FROM PREVIOUS SCREEN
  const PREV_DATA = route?.params?.data;

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
  const status = ['Single', 'Duda', 'Janda'];
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
  const skin = ['Putih', 'Kuning Langsat', 'Coklat', 'Hitam'];

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
      minMaxChar: [100, 1000], //100
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
      minMaxChar: [3, 150],
      value: aktivitasHarian,
    },
    {
      key: 'visimisi',
      required: true,
      minMaxChar: [3, 150],
      value: visimisi,
    },
    {
      key: 'q1',
      required: true,
      minMaxChar: [3, 150],
      value: firstQA,
    },
    {
      key: 'q2',
      required: true,
      minMaxChar: [3, 150],
      value: secondQA,
    },
    {
      key: 'q3',
      required: true,
      minMaxChar: [3, 150],
      value: thirdQA,
    },
  ];

  const input_config_edit = [
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
      !riwayatPendidikan ||
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
      !thirdQA ||
      (KEY == 'edit' && !name) ||
      (KEY == 'edit' && !domisiliOrangTua) ||
      (KEY == 'edit' && !alamat)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const _onDoneButtonPressed = () => {
    setIsLoading(true);

    const editConfig = input_config.concat(input_config_edit);

    const {errors} = MushForm(KEY == 'edit' ? editConfig : input_config);
    setInputError(errors);

    console.log(errors);

    const data = {
      ...PREV_DATA,
      fotoWajah: faceImage,
      fotoFull: bodyImage,
      fotoid: ktpImage,
      pekerjaan: selectedPekerjaan,
      pendidikanTerakhir: selectedPendidikan,
      riwayatPendidikan: riwayatPendidikan,
      status: selectedStatus,
      tinggi: tinggiBadan,
      berat: beratBadan,
      ibadah: selectedIbadah,
      kriteria: kriteria,
      deskripsi: deskripsi,
      hobi: hobi,
      anak: anak,
      suku: selectedSuku,
      kulit: selectedWarnaKulit,
      penyakit: penyakit,
      organisasi: organisasi,
      kelebihan: kelebihan,
      kekurangan: kekurangan,
      aktivitas: aktivitasHarian,
      visimisi: visimisi,
      pertanyaansatu: firstQA,
      pertanyaandua: secondQA,
      pertanyaantiga: thirdQA,
      sertifikat: kode,
    };

    if (_.isEmpty(errors)) {
      //navigation.navigate('DoneCV');
      //setIsLoading(false);
      KEY == 'edit' ? _updateUser(data) : _registerUser(data);
    } else {
      setIsLoading(false);
    }
  };

  const _registerUser = async data => {
    USER_REGISTER(data)
      .then(() => {
        setIsLoading(false);
        navigation.navigate('DoneCV');
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert(
          'Pendaftaran Gagal',
          'Ada kesalahan data, mohon di cek kembali',
        );
      });
  };

  const _updateUser = async data => {
    const existingData = {
      alamatdom: alamat,
      email: USER?.email,
      gender: USER?.gender,
      kota: SELECTED_DOMISILI,
      nama: name,
      nomorwa: USER?.nomorwa,
      orangtuadom: domisiliOrangTua,
      password: USER?.password,
      ttl: String(selectedDate),
    };

    const updateData = {...existingData, ...data};

    USER_UPDATE(USER?.nomorwa, updateData)
      .then(async () => {
        setIsLoading(false);
        await updateUserSession(updateData);
        Alert.alert('Sukses!', 'Update CV telah berhasil!', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert('Gagal!', 'Ada kesalahan data, mohon di cek kembali!');
      });
  };

  // React.useEffect(() => {
  //   console.log(faceImage?.length, bodyImage?.length, ktpImage?.length);
  // }, [faceImage, bodyImage, ktpImage]);

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
                : PREV_DATA?.gender == 'pria'
                ? IMAGES_RES.man_head
                : IMAGES_RES.girl_head
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
                : PREV_DATA?.gender == 'pria'
                ? IMAGES_RES.man_body
                : IMAGES_RES?.girl_body
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
        {KEY == 'edit' ? (
          <>
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
          </>
        ) : null}
        <Dropdown
          caption={'Pilih Pekerjaan'}
          style={styles.input}
          data={pekerjaan}
          title={'Pilih Pekerjaan'}
          onItemSelected={item => setSelectedPekerjaan(item)}
          defaultValue={selectedPekerjaan}
        />
        <Dropdown
          caption={'Pilih Pendidikan Terakhir'}
          style={styles.input}
          data={pendidikan}
          title={'Pilih Pendidikan Terakhir'}
          onItemSelected={item => setSelectedPendidikan(item)}
          defaultValue={selectedPendidikan}
        />
        <Input
          caption={'Riwayat Pendidikan'}
          containerStyle={styles.input}
          placeholder={'Riwayat Pendidikan'}
          errorMessage={inputError['riwayat']}
          onChangeText={text => setRiwayatPendidikan(text)}
          value={riwayatPendidikan}
        />
        <Text style={styles.textInfo}>
          Sebutkan nama sekolah atau universitas
        </Text>
        <Dropdown
          caption={'Pilih Status'}
          style={styles.input}
          data={status}
          title={'Pilih Status'}
          onItemSelected={item => setSelectedStatus(item)}
          defaultValue={selectedStatus}
        />
        <Input
          caption={'Tinggi Badan ( CM )'}
          keyboardType={'phone-pad'}
          maxLength={3}
          containerStyle={styles.input}
          placeholder={'Tinggi Badan ( CM )'}
          errorMessage={inputError['tinggi']}
          onChangeText={text => setTinggiBadan(text)}
          value={tinggiBadan}
        />
        <Input
          caption={'Berat Badan ( KG )'}
          keyboardType={'phone-pad'}
          maxLength={3}
          containerStyle={styles.input}
          placeholder={'Berat Badan ( KG )'}
          errorMessage={inputError['berat']}
          onChangeText={text => setBeratBadan(text)}
          value={beratBadan}
        />
        <Dropdown
          caption={'Melakukan Ibadah'}
          style={styles.input}
          data={ibadah_rate}
          title={'Melakukan Ibadah'}
          onItemSelected={item => setSelectedIbadah(item)}
          defaultValue={selectedIbadah}
        />
        <Input
          caption={'Kriteria yang diinginkan'}
          containerStyle={styles.input}
          placeholder={'Kriteria yang diinginkan'}
          errorMessage={inputError['kriteria']}
          onChangeText={text => setKriteria(text)}
          value={kriteria}
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
          onChangeText={text => setDeskripsi(text)}
          value={deskripsi}
        />
        <Input
          caption={'Hobi'}
          containerStyle={styles.input}
          placeholder={'Hobi'}
          errorMessage={inputError['hobi']}
          onChangeText={text => setHobi(text)}
          value={hobi}
        />
        <Text style={styles.textInfo}>
          Harap tambahkan "," (koma) setiap menambahkan hobi
        </Text>
        <Input
          caption={'Anak ke ( contoh 1 dari 3 )'}
          containerStyle={styles.input}
          keyboardType={'phone-pad'}
          placeholder={'Anak ke ( contoh 1 dari 3 )'}
          errorMessage={inputError['anak']}
          onChangeText={text => setAnak(text)}
          value={anak}
        />
        <Dropdown
          caption={'Suku'}
          style={styles.input}
          data={suku}
          title={'Suku'}
          onItemSelected={item => setSelectedSuku(item)}
          defaultValue={selectedSuku}
        />
        <Dropdown
          caption={'Warna Kulit'}
          style={styles.input}
          data={skin}
          title={'Warna Kulit'}
          onItemSelected={item => setSelectedWarnaKulit(item)}
          defaultValue={selectedWarnaKulit}
        />
        <Input
          caption={'Riwayat Penyakit'}
          containerStyle={styles.input}
          placeholder={'Riwayat Penyakit'}
          errorMessage={inputError['penyakit']}
          onChangeText={text => setPenyakit(text)}
          value={penyakit}
        />
        <Input
          caption={'Organisasi atau komunitas yang diikuti'}
          containerStyle={styles.input}
          placeholder={'Organisasi atau komunitas yang diikuti'}
          errorMessage={inputError['organisasi']}
          onChangeText={text => setOrganisasi(text)}
          value={organisasi}
        />
        <Input
          caption={'Kelebihan diri'}
          multiline
          containerStyle={styles.multiline}
          placeholder={'Kelebihan diri'}
          errorMessage={inputError['kelebihan']}
          onChangeText={text => setKelebihan(text)}
          value={kelebihan}
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
          onChangeText={text => setKekurangan(text)}
          value={kekurangan}
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
          onChangeText={text => setAktivitasHarian(text)}
          value={aktivitasHarian}
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
          onChangeText={text => setVisimisi(text)}
          value={visimisi}
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
        onChangeText={text => setFirstQA(text)}
        errorMessage={inputError['q1']}
        value={firstQA}
      />
      <Text style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        caption={'Pertanyaan ke 2'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 2'}
        onChangeText={text => setSecondQA(text)}
        errorMessage={inputError['q2']}
        value={secondQA}
      />
      <Text style={styles.textInfo}>Maksimal 150 karakter</Text>
      <Input
        caption={'Pertanyaan ke 3'}
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Pertanyaan ke 3'}
        onChangeText={text => setThirdQA(text)}
        errorMessage={inputError['q3']}
        value={thirdQA}
      />
      <Text style={styles.textInfo}>Maksimal 150 karakter</Text>
      {/* <Input
        maxLength={150}
        containerStyle={styles.input}
        placeholder={'Kode Sertifikasi Alumni Kelas Pranikah'}
        onChangeText={text => setKode(text)}
        value={kode}
      />
      <Text style={styles.textInfo}>Kosongi jika tidak punya</Text> */}
      <View style={{marginTop: 48}}>
        <Button
          disabled={isButtonDisabled()}
          isLoading={isLoading}
          title={KEY == 'edit' ? 'Update CV' : 'Buat CV'}
          onPress={() => _onDoneButtonPressed()}
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
    padding: 24,
  },

  input: {
    marginTop: 24,
  },

  multiline: {
    marginTop: 24,
    maxHeight: 72,
    marginBottom: 14,
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
