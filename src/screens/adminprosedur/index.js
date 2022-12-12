import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {Button, Input} from '../../components';
import {UPDATE_PROCEDUR} from '../../helpers/admin';
import {GET_PROCEDUR} from '../../helpers/firebase';
import {Typo} from '../../styles';

const AdminProsedurScreen = ({navigation}) => {
  const [steps, setSteps] = React.useState([]);
  const [p1, setP1] = React.useState(steps[0]);
  const [p2, setP2] = React.useState(steps[1]);
  const [p3, setP3] = React.useState(steps[2]);
  const [p4, setP4] = React.useState(steps[3]);

  const [isLoading, setIsLoading] = React.useState('');

  const INPUT = [
    {
      value: p1,
      onUpdate: text => setP1(text),
    },
    {
      value: p2,
      onUpdate: text => setP2(text),
    },
    {
      value: p3,
      onUpdate: text => setP3(text),
    },
    {
      value: p4,
      onUpdate: text => setP4(text),
    },
  ];

  React.useLayoutEffect(() => {
    getProsedur();
  }, []);

  async function getProsedur() {
    const data = await GET_PROCEDUR();
    if (data) {
      setSteps(data);
      setP1(data[0]);
      setP2(data[1]);
      setP3(data[2]);
      setP4(data[3]);
    }
  }

  async function onSave() {
    setIsLoading(true);
    const data = [p1, p2, p3, p4];

    await UPDATE_PROCEDUR(data)
      .then(() => {
        setIsLoading(false);
        Alert.alert('Sukses', 'Berhasil disimpan!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch(err => {
        console.log('err : ' + err);
        setIsLoading(false);
        Alert.alert('Gagal', 'Simpan prosedur gagal, mohon coba lagi!');
      });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>
          4 Langkah mencari pasangan sesuai syariat islam :{' '}
        </Text>
        <View style={{marginTop: 14}}>
          {INPUT.map((item, index) => {
            return (
              <Input
                inputStyle={{marginBottom: 8}}
                multiline={true}
                containerStyle={{
                  marginBottom: 18,
                  maxHeight: 100,
                }}
                editable={!isLoading}
                value={item.value}
                onChangeText={text => item.onUpdate(text)}
              />
            );
          })}
        </View>
        <Button
          disabled={!p1 || !p2 || !p3 || !p4}
          title="Simpan"
          isLoading={isLoading}
          onPress={() => onSave()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    ...Typo.TextLargeBold,
  },

  item: {
    ...Typo.TextNormalRegular,
    marginTop: 14,
  },
});

export default AdminProsedurScreen;
