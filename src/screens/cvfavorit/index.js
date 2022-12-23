import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {
  CHECK_IS_MATCH,
  GET_CV_COUNT_BY_MONTH,
  GET_FAVORITED_CV,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import NoItemScreen from '../../components/NoItem';
import {Modal} from '../../components';

const FavoriteScreen = ({navigation}) => {
  const [favList, setFavList] = React.useState([]);
  const [available, setAvailable] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavCV();
    });

    return unsubscribe;
  }, [navigation]);

  const getFavCV = async () => {
    setIsLoading(true);
    const data = await GET_FAVORITED_CV();

    const isPremium = await USER_IS_PREMIUM();
    const chance = await GET_CV_COUNT_BY_MONTH();

    setAvailable(chance);
    setIsPremium(isPremium);

    setFavList(data);
    setIsPremium(isPremium);
    setIsLoading(false);
  };

  async function onCardPress(item) {
    setModalVisible(true);
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
        isPremium: isPremium,
      });
    }
  }

  return (
    <View style={styles.container}>
      {favList.length ? (
        <FlatList
          data={favList}
          contentContainerStyle={{paddingBottom: 64}}
          renderItem={({item, index}) => (
            <PeopleCardList data={item} onPress={() => onCardPress(item)} />
          )}
          numColumns={2}
        />
      ) : (
        <NoItemScreen isLoading={isLoading} />
      )}
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

export default FavoriteScreen;
