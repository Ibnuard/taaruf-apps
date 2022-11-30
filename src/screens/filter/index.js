import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import {Colors, Typo} from '../../styles';
import {Button, Dropdown} from '../../components';

const FilterScreen = () => {
  const [umur, setUmur] = React.useState(0);
  const [umurMax, setUmurMax] = React.useState(0);
  const [tinggi, setTinggi] = React.useState(0);

  //inpput
  const [selectedPekerjaan, setSelectedPekerjaan] = React.useState('');
  const [selectedPendidikan, setSelectedPendidikan] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [selectedIbadah, setSelectedIbadah] = React.useState('');

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
        onValueChange={val => setUmur(val)}
      />
      <Text style={styles.textCaption}>Usia Maksimal: {umurMax}</Text>
      <Slider
        style={{width: '100%', height: 40}}
        minimumValue={18}
        maximumValue={50}
        minimumTrackTintColor={Colors.COLOR_ACCENT}
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.COLOR_ACCENT}
        step={1}
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
      <View style={{marginTop: 32}}>
        <Button title="Terapkan Filter" />
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
