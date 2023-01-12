import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {
  CHECK_IS_MATCH,
  GET_CV_COUNT_BY_MONTH,
  GET_IS_ON_TAARUF,
  GET_USER_LIST,
  IS_HAVE_CHANCE,
  IS_REJECTED_SEND,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';
import NoItemScreen from '../../components/NoItem';
import {Input, Modal} from '../../components';

const KirimTaarufScreen = ({navigation, route}) => {
  const [users, setUsers] = React.useState([]);
  const [available, setAvailable] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputActive, setInputActive] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');

  const USER = route?.params?.user;
  const FILTER = route?.params?.filter;

  // React.useEffect(() => {
  //   getAllUsers();
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getIsOnTaaruf();
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

  async function getIsOnTaaruf() {
    setIsLoading(true);
    //getAllUsers();
    const data = await GET_IS_ON_TAARUF();

    const completeData = {taaruf: true, ...data[0]};

    if (data.length > 0) {
      navigation.replace('ProfileDetail', {
        key: 'ontaaruf',
        data: completeData,
        available: available,
        isPremium: isPremium,
      });
    } else {
      getAllUsers();
    }
  }

  const _handleFilter = (data = []) => {
    if (FILTER) {
      const filterUmur = FILTER?.umurMinMax;
      if (data?.length) {
        const filtered = data.filter((item, index) => {
          let pekerjaanFiltered;
          let pendidikanFiltered;
          let statusFiltered;
          let ibadahFiltered;
          let kulitFiltered;
          let domisiliFiltered;

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

          // if (FILTER?.suku?.length) {
          //   console.log('suku filter : ' + FILTER?.suku);
          //   sukuFiltered = item?.suku == FILTER?.suku;
          // } else {
          //   sukuFiltered = item?.suku == item?.suku;
          // }

          if (FILTER?.kulit?.length) {
            console.log('kulit filter : ' + FILTER?.kulit);
            kulitFiltered = item?.kulit == FILTER?.kulit;
          } else {
            kulitFiltered = item?.kulit == item?.kulit;
          }

          if (FILTER?.domisili?.length) {
            console.log('domisili filter : ' + FILTER?.domisili);
            domisiliFiltered = item?.kota == FILTER?.domisili;
          } else {
            domisiliFiltered = item?.kota == item?.kota;
          }

          return (
            umurFiltered &&
            tinggiFiltered &&
            pekerjaanFiltered &&
            pendidikanFiltered &&
            statusFiltered &&
            ibadahFiltered &&
            kulitFiltered &&
            domisiliFiltered
          );
        });

        return filtered;
      }
    } else {
      return data;
    }
  };

  const onSearch = (arr = []) => {
    if (keyword !== '' && !inputActive) {
      return arr.filter((item, index) => {
        return (
          item?.id.toLowerCase()?.includes(keyword.toLowerCase()) ||
          item?.nama?.toLowerCase()?.includes(keyword.toLowerCase())
        );
      });
    } else {
      return arr;
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
    const chance = await IS_HAVE_CHANCE();

    console.log('have chance: ' + chance);

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
    const data = await GET_IS_ON_TAARUF(item.nomorwa);
    const isRejected = await IS_REJECTED_SEND(item);

    if (isRejected.rejected == true) {
      setModalVisible(false);
      Alert.alert(
        'Taaruf Anda Ditolak',
        'Alasan : ' +
          isRejected.reason +
          '.\n\nAnda dapat mengajukan kembali bulan depan',
      );
      return;
    }

    if (data.length > 0) {
      Alert.alert(
        'Pemberitahuan',
        'Pengguna ini sedang ada didalam sesi taaruf dengan pengguna lain!',
      );
      setModalVisible(false);
    } else {
      const isMatch = await CHECK_IS_MATCH(item);

      if (isMatch) {
        setModalVisible(false);
        Alert.alert(
          'Pesan!',
          'User ini telah mengajukan taaruf ke anda, silahkan cek di Menerima CV!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('TerimaTaaruf', {user: USER}),
            },
          ],
        );
      } else {
        setModalVisible(false);
        navigation.navigate('ProfileDetail', {
          key: 'kirimtaaruf',
          data: item,
          available: available,
          isPremium: isPremium,
        });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder={'Cari'}
        containerStyle={{marginBottom: 14}}
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        onChangeText={text => setKeyword(text)}
        showClearButton={keyword}
        onClear={() => setKeyword('')}
        value={keyword}
      />
      {_handleFilter(onSearch(users)).length ? (
        <>
          <FlatList
            data={_handleFilter(onSearch(users))}
            contentContainerStyle={{paddingBottom: 64}}
            extraData={isLoading}
            renderItem={({item, index}) => (
              <PeopleCardList
                data={item}
                user={USER}
                showTime
                onPress={
                  () => onCardPress(item)
                  // navigation.navigate('Upgrade')
                }
              />
            )}
            numColumns={2}
          />
        </>
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
