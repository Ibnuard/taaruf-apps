import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';

const TerimaTaarufScreen = ({navigation}) => {
  const arr = [1, 2, 3, 49, 0, 1, 6, 7, 8];

  const actions = [
    {
      text: 'Favorit',
      icon: IMAGES_RES.heart,
      name: 'bt_favorite',
      position: 1,
    },
    {
      text: 'Filter',
      icon: IMAGES_RES.filter,
      name: 'bt_filter',
      position: 2,
    },
    {
      text: 'CV Terkirim',
      icon: IMAGES_RES.kirimTaaruf,
      name: 'bt_sended',
      position: 3,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        contentContainerStyle={{paddingBottom: 64}}
        renderItem={({item, index}) => (
          <PeopleCardList
            onPress={() =>
              navigation.navigate('ProfileDetail', {
                key: 'terimataaruf',
              })
            }
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
});

export default TerimaTaarufScreen;
