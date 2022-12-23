import * as React from 'react';
import {View, Text, StyleSheet, FlatList, SectionList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {
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
      getSendedCV();
    });

    return unsubscribe;
  }, [navigation]);

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
            <PeopleCardList
              data={item}
              onPress={
                () =>
                  navigation.navigate('ProfileDetail', {
                    key: 'kirimtaaruf',
                    data: item,
                    isPremium: isPremium,
                  })
                // navigation.navigate('Upgrade')
              }
            />
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
