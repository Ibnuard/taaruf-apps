import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {GET_USER_LIST} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';

const KirimTaarufScreen = ({navigation, route}) => {
  const [users, setUsers] = React.useState([]);

  const USER = route?.params?.user;

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const users = await GET_USER_LIST();

    const filtered = users.filter((item, inex) => {
      return item?.id !== USER?.id;
    });

    setUsers(filtered);
  };

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

  function _onFabPress(item) {
    if (item == 'bt_favorite') {
      navigation.navigate('Favorite');
    } else if (item == bt_filter) {
      navigation.navigate('filter');
    } else {
      navigation.navigate('sendcv');
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        contentContainerStyle={{paddingBottom: 64}}
        renderItem={({item, index}) => (
          <PeopleCardList
            data={item}
            onPress={
              () =>
                navigation.navigate('ProfileDetail', {
                  key: 'kirimtaaruf',
                  data: item,
                })
              // navigation.navigate('Upgrade')
            }
          />
        )}
        numColumns={2}
      />
      <FloatingAction
        actions={actions}
        onPressItem={item => _onFabPress(item)}
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

export default KirimTaarufScreen;
