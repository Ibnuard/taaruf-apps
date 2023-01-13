import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {
  GET_IS_ON_TAARUF,
  GET_SENDED_CV,
  IS_REJECTED_SEND,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import NoItemScreen from '../../components/NoItem';
import {splitByMonth} from '../../utils/utils';
import {Colors, Typo} from '../../styles';

const CVTerkirimScreen = ({navigation, route}) => {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
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
        isPremium: isPremium,
      });
    } else {
      getSendedCV();
    }
  }

  const getSendedCV = async () => {
    setIsLoading(true);
    const data = await GET_SENDED_CV();
    const isPremium = await USER_IS_PREMIUM();

    const filtered = data.filter((item, index) => {
      return item?.id !== USER?.id;
    });
    const dataSplitted = splitByMonth(filtered);

    setUsers(dataSplitted);
    setIsPremium(isPremium);
    setIsLoading(false);
  };

  const onCardPress = async item => {
    const data = await GET_IS_ON_TAARUF(item.nomorwa);
    const isRejected = await IS_REJECTED_SEND(item);

    //const completeData = {taaruf: true, ...data[0]};

    if (data.length > 0) {
      Alert.alert(
        'Pemberitahuan',
        'Pengguna ini sedang ada didalam sesi taaruf dengan pengguna lain!',
      );

      return;
    }

    if (isRejected.rejected == true) {
      Alert.alert('Taaruf Ditolak', isRejected.reason);
      return;
    }

    navigation.navigate('ProfileDetail', {
      key: 'kirimtaaruf',
      data: item,
      isPremium: isPremium,
    });
  };

  return (
    <View style={styles.container}>
      {users?.length ? (
        <SectionList
          sections={users}
          contentContainerStyle={{
            paddingBottom: 64,
          }}
          renderSectionHeader={({section: {title, data}}) => (
            <Text style={styles.header}>
              {title} ( {data.length} / 5 )
            </Text>
          )}
          renderItem={({item, index}) => (
            <PeopleCardList data={item} onPress={() => onCardPress(item)} />
          )}
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

  header: {
    ...Typo.TextExtraLargeBold,
    color: Colors.COLOR_BLACK,
    paddingVertical: 4,
    marginVertical: 10,
  },
});

export default CVTerkirimScreen;
