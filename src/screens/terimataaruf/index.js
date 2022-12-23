import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {
  GET_ACCEPT_TAARUF_COUNT,
  GET_IS_ON_TAARUF,
  GET_RECEIVED_CV,
  GET_USER_LIST,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';
import NoItemScreen from '../../components/NoItem';

const TerimaTaarufScreen = ({navigation, route}) => {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [canTaaruf, setCanTaaruf] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState(false);

  const USER = route?.params?.user;

  // React.useEffect(() => {
  //   getAllUsers();
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getIsOnTaaruf();
    });

    return unsubscribe;
  }, [navigation]);

  async function getIsOnTaaruf() {
    setIsLoading(true);
    const data = await GET_IS_ON_TAARUF();

    if (data.length > 0) {
      const completeData = {taaruf: true, ...data[0]};
      navigation.replace('ProfileDetail', {
        key: 'ontaaruf',
        data: completeData,
        canTaaruf: canTaaruf,
        isPremium: isPremium,
      });
    } else {
      getReceivedTaaruf();
    }
  }

  const getReceivedTaaruf = async () => {
    setIsLoading(true);
    const users = await GET_RECEIVED_CV();
    const isPremium = await USER_IS_PREMIUM();

    const filtered = users.filter((item, index) => {
      return item?.id !== USER?.id;
    });

    const isCanTaaruf = await GET_ACCEPT_TAARUF_COUNT();

    console.log('is premium -> ' + isPremium);

    setCanTaaruf(isCanTaaruf);

    setUsers(filtered);
    setIsPremium(isPremium);
    setIsLoading(false);
  };

  const onCardPress = async item => {
    const data = await GET_IS_ON_TAARUF();

    const completeData = {taaruf: true, ...data[0]};

    if (data.length > 0) {
      Alert.alert(
        'Pemberitahuan',
        `Anda sedang ada di sesi taaruf dengan ${data[0].name}, Anda akan diarahkan ke detail sesi taaruf yang sedang berlangsung!`,
        [
          {
            text: 'Ok',
            onPress: () => {
              navigation.replace('ProfileDetail', {
                key: 'ontaaruf',
                data: completeData,
                available: available,
                isPremium: isPremium,
              });
            },
          },
        ],
      );
    } else {
      navigation.navigate('ProfileDetail', {
        key: 'terimataaruf',
        data: item,
        canTaaruf: canTaaruf,
        isPremium: isPremium,
      });
    }
  };

  return (
    <View style={styles.container}>
      {users.length ? (
        <FlatList
          data={users}
          contentContainerStyle={{paddingBottom: 64}}
          renderItem={({item, index}) => (
            <PeopleCardList
              data={item}
              user={USER}
              showBadgeUser
              onPress={() => onCardPress(item)}
            />
          )}
          numColumns={2}
        />
      ) : (
        <NoItemScreen isLoading={isLoading} />
      )}
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
