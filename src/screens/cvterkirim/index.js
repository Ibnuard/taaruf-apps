import * as React from 'react';
import {View, Text, StyleSheet, FlatList, SectionList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {
  GET_CHANCE_COUNTER,
  GET_IS_ON_TAARUF,
  GET_SENDED_CV,
  GET_USER_LIST,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';
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
    const data = await GET_CHANCE_COUNTER();
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
        key: 'kirimtaaruf',
        data: item,
        isPremium: isPremium,
      });
    }
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
