import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import {Colors, Typo} from '../../styles';
import {Button, Dropdown, Input} from '../../components';
import Touchable from '../../components/touchable';

const FilterScreen = ({navigation, route}) => {
  const USER = route?.params?.user;
  const FILTER = route?.params?.filter;

  const [umur, setUmur] = React.useState(FILTER?.umurMinMax[0] ?? 18);
  const [umurMax, setUmurMax] = React.useState(FILTER?.umurMinMax[1] ?? 50);
  const [umurMaxMinimumAmount, setUmurMaxMinimumAmount] = React.useState(19);
  const [tinggi, setTinggi] = React.useState(FILTER?.tinggi ?? 0);

  //DOMISILI
  const SELECTED_DOMISILI = FILTER?.domisili ?? route?.params?.domisili;

  //inpput
  const [selectedPekerjaan, setSelectedPekerjaan] = React.useState(
    FILTER?.pekerjaan ?? '',
  );
  const [selectedPendidikan, setSelectedPendidikan] = React.useState(
    FILTER?.pendidikan ?? '',
  );
  const [selectedStatus, setSelectedStatus] = React.useState(
    FILTER?.status ?? '',
  );
  const [selectedIbadah, setSelectedIbadah] = React.useState(
    FILTER?.ibadah ?? '',
  );
  const [selectedWarnaKulit, setSelectedWarnaKulit] = React.useState(
    FILTER?.kulit ?? '',
  );

  const onFilterPressed = () => {
    navigation.navigate('KirimTaaruf', {
      user: USER,
      filter: {
        umurMinMax: [umur, umurMax],
        tinggi: tinggi ?? 0,
        pekerjaan: selectedPekerjaan
          ? selectedPekerjaan == 'Semua'
            ? ''
            : selectedPekerjaan
          : '',
        pendidikan: selectedPendidikan
          ? selectedPendidikan == 'Semua'
            ? ''
            : selectedPendidikan
          : '',
        status: selectedStatus
          ? selectedStatus == 'Semua'
            ? ''
            : selectedStatus
          : '',
        ibadah: selectedIbadah
          ? selectedIbadah == 'Semua'
            ? ''
            : selectedIbadah
          : '',
        kulit: selectedWarnaKulit
          ? selectedWarnaKulit == 'Semua'
            ? ''
            : selectedWarnaKulit
          : '',
        domisili: SELECTED_DOMISILI ?? '',
      },
    });
  };

  const onRemoveFilterPressed = () => {
    navigation.navigate('KirimTaaruf', {
      user: USER,
      filter: null,
    });
  };

  const pekerjaan = [
    'Semua',
    'Pelajar',
    'Swasta',
    'Pemerintah',
    'Usaha',
    'Fresh Graduate',
    'BUMN',
    'Tidak / Belum Bekerja',
  ];
  const pendidikan = [
    'Semua',
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
  const status = ['Semua', 'Single', 'Duda', 'Janda'];
  const ibadah_rate = [
    'Semua',
    'Kurang Ibadah',
    'Belajar Ibadah',
    'Sering Ibadah',
    'Sangat Sering Ibadah',
  ];

  const suku = [
    'Semua',
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
  const skin = ['Semua', 'Putih', 'Kuning Langsat', 'Coklat', 'Hitam'];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 60}}>
      <Text style={styles.textCaption}>Usia Minimal: {umur}</Text>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={18}
        maximumValue={50}
        minimumTrackTintColor={Colors.COLOR_ACCENT}
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.COLOR_ACCENT}
        step={1}
        value={umur}
        onValueChange={val => setUmur(val)}
        onSlidingComplete={val => {
          setUmurMax(val + 1);
          setUmurMaxMinimumAmount(val + 1);
        }}
      />
      <Text style={styles.textCaption}>Usia Maksimal: {umurMax}</Text>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={umurMaxMinimumAmount}
        maximumValue={50}
        minimumTrackTintColor={Colors.COLOR_ACCENT}
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.COLOR_ACCENT}
        step={1}
        value={umurMax}
        onValueChange={val => setUmurMax(val)}
      />
      <Text style={styles.textCaption}>Tinggi Minimal: {tinggi}</Text>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={200}
        minimumTrackTintColor={Colors.COLOR_ACCENT}
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.COLOR_ACCENT}
        step={1}
        value={tinggi}
        onValueChange={val => setTinggi(val)}
      />
      <Dropdown
        caption={'Pilih Pekerjaan'}
        style={styles.input}
        data={pekerjaan}
        title={'Semua'}
        onItemSelected={item => setSelectedPekerjaan(item)}
        defaultValue={selectedPekerjaan}
      />
      <Dropdown
        caption={'Pilih Pendidikan Terakhir'}
        style={styles.input}
        data={pendidikan}
        title={'Semua'}
        onItemSelected={item => setSelectedPendidikan(item)}
        defaultValue={selectedPendidikan}
      />
      <Dropdown
        caption={'Pilih Status'}
        style={styles.input}
        data={status}
        title={'Semua'}
        onItemSelected={item => setSelectedStatus(item)}
        defaultValue={selectedStatus}
      />
      <Dropdown
        caption={'Melakukan Ibadah'}
        style={styles.input}
        data={ibadah_rate}
        title={'Semua'}
        onItemSelected={item => setSelectedIbadah(item)}
        defaultValue={selectedIbadah}
      />
      <Dropdown
        caption={'Warna Kulit'}
        style={styles.input}
        data={skin}
        title={'Semua'}
        onItemSelected={item => setSelectedWarnaKulit(item)}
        defaultValue={selectedWarnaKulit}
      />
      <Touchable
        onPress={() => navigation.navigate('Domisili', {fromFilter: true})}>
        <Input
          caption={'Kota Domisili'}
          containerStyle={styles.input}
          editable={false}
          placeholder={'Kota Domisili'}
          value={SELECTED_DOMISILI}
        />
      </Touchable>
      <View style={{marginTop: 32}}>
        <Button title="Terapkan Filter" onPress={() => onFilterPressed()} />
        <View style={{marginTop: 14}} />
        <Button
          invert
          title="Hapus Filter"
          onPress={() => onRemoveFilterPressed()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },

  textCaption: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_ACCENT,
    marginVertical: 14,
  },

  input: {
    marginTop: 24,
  },
});

export default FilterScreen;
