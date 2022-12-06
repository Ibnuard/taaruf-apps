import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {
  CHECK_IS_MATCH,
  GET_CV_COUNT_BY_MONTH,
  GET_USER_LIST,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';
import NoItemScreen from '../../components/NoItem';
import {Modal} from '../../components';

const KirimTaarufScreen = ({navigation, route}) => {
  const [users, setUsers] = React.useState([]);
  const [available, setAvailable] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const USER = route?.params?.user;
  const FILTER = route?.params?.filter;

  // React.useEffect(() => {
  //   getAllUsers();
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllUsers();
      if (FILTER) {
        _handleFilter();
      }
    });

    return unsubscribe;
  }, [navigation]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (FILTER) {
  //       _handleFilter();
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation, FILTER]);

  const _handleFilter = (data = []) => {
    if (FILTER) {
      const filterUmur = FILTER?.umurMinMax;
      if (data?.length) {
        const filtered = data.filter((item, index) => {
          let pekerjaanFiltered;
          let pendidikanFiltered;
          let statusFiltered;
          let ibadahFiltered;

          const umurFiltered =
            item?.umur >= filterUmur[0] && item?.umur <= filterUmur[1];

          const tinggiFiltered = item?.tinggi >= FILTER?.tinggi;

          if (FILTER?.pekerjaan?.length) {
            console.log('pekerjaan filter : ' + FILTER?.pekerjaan);
            pekerjaanFiltered = item?.pekerjaan == FILTER?.pekerjaan;
          } else {
            pekerjaanFiltered = item?.pekerjaan == item?.pekerjaan;
          }

          if (FILTER?.pendidikan?.length) {
            console.log('pendidikan filter : ' + FILTER?.pendidikan);
            pendidikanFiltered = item?.pendidikanTerakhir == FILTER?.pendidikan;
          } else {
            pendidikanFiltered =
              item?.pendidikanTerakhir == item?.pendidikanTerakhir;
          }

          if (FILTER?.status?.length) {
            console.log('status filter : ' + FILTER?.status);
            statusFiltered = item?.status == FILTER?.status;
          } else {
            statusFiltered = item?.status == item?.status;
          }

          if (FILTER?.ibadah?.length) {
            console.log('ibadah filter : ' + FILTER?.ibadah);
            ibadahFiltered = item?.ibadah == FILTER?.ibadah;
          } else {
            ibadahFiltered = item?.ibadah == item?.ibadah;
          }

          return (
            umurFiltered &&
            tinggiFiltered &&
            pekerjaanFiltered &&
            pendidikanFiltered &&
            statusFiltered &&
            ibadahFiltered
          );
        });

        return filtered;
      }
    } else {
      return data;
    }
  };

  // const _normalizeList = (data = []) => {
  //   return data.filter((item, index) => {
  //     return item?.id !== USER?.id && item?.gender !== USER?.gender;
  //   });
  // };

  const getAllUsers = async () => {
    setIsLoading(true);
    const users = await GET_USER_LIST();

    const filtered = users.filter((item, inex) => {
      return item?.id !== USER?.id && item?.gender !== USER?.gender;
    });

    //filter by domisili
    const sortedbyDomisili = []
      .concat(
        filtered.map(e => e.kota.includes(USER?.kota) && e),
        filtered.map(e => !e.kota.includes(USER?.kota) && e),
      )
      .filter(e => e);

    setUsers(sortedbyDomisili);

    const isPremium = await USER_IS_PREMIUM();
    const chance = await GET_CV_COUNT_BY_MONTH();

    console.log('CHANCE : ' + chance);

    if (chance !== null && isPremium !== null) {
      setAvailable(chance);
      setIsPremium(isPremium);
      setIsLoading(false);
    }
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
    } else if (item == 'bt_filter') {
      navigation.navigate('Filter', {user: USER, filter: FILTER});
    } else {
      navigation.navigate('CVTerkirim');
    }
  }

  async function onCardPress(item) {
    setModalVisible(true);
    if (isPremium) {
      const isMatch = await CHECK_IS_MATCH(item);

      if (isMatch) {
        setModalVisible(false);
        Alert.alert(
          'Pesan!',
          'User ini telah mengajukan taaruf ke anda, silahkan cek di Menerima CV!',
          [{text: 'OK', onPress: () => navigation.navigate('TerimaTaaruf')}],
        );
      } else {
        setModalVisible(false);
        navigation.navigate('ProfileDetail', {
          key: 'kirimtaaruf',
          data: item,
          available: available,
        });
      }
    } else {
      await setModalVisible(false);
      navigation.navigate('Upgrade', {user: USER});
    }
  }

  return (
    <View style={styles.container}>
      {_handleFilter(users).length ? (
        <FlatList
          data={_handleFilter(users)}
          contentContainerStyle={{paddingBottom: 64}}
          renderItem={({item, index}) => (
            <PeopleCardList
              data={item}
              blur={!isPremium}
              onPress={
                () => onCardPress(item)
                // navigation.navigate('Upgrade')
              }
            />
          )}
          numColumns={2}
        />
      ) : (
        <NoItemScreen isLoading={isLoading} />
      )}

      <FloatingAction
        actions={actions}
        onPressItem={item => _onFabPress(item)}
      />
      <Modal visible={modalVisible} type={'loading'} />
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
