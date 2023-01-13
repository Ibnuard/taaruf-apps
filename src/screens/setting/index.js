import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Touchable from '../../components/touchable';
import {Typo} from '../../styles';

const SettingScreen = ({navigation}) => {
  const menu = [
    {
      key: 'faq',
      title: 'FAQ',
    },
    {
      key: 'kebijakanprivasi',
      title: 'Kebijakan Privasi',
    },
    {
      key: 'tacs',
      title: 'Ketentuan dan Kebijakan Layanan',
    },
    {
      key: 'kontak',
      title: 'Kontak',
    },
  ];

  return (
    <View style={styles.container}>
      {menu.map((item, index) => {
        return (
          <Touchable
            style={{
              borderBottomWidth: 0.5,
              paddingVertical: 14,
              paddingHorizontal: 18,
            }}
            onPress={() => navigation.navigate('Menu', {key: item?.key})}>
            <Text style={styles.textTitle}>{item?.title}</Text>
          </Touchable>
        );
      })}
    </View>
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

export default SettingScreen;
