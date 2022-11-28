import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {GET_SENDED_CV, GET_USER_LIST} from '../../helpers/firebase';
import {retrieveUserSession} from '../../helpers/storage';

const CVTerkirimScreen = ({navigation, route}) => {
  const [users, setUsers] = React.useState([]);

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
    const data = await GET_SENDED_CV();

    const filtered = data.filter((item, index) => {
      return item?.id !== USER?.id;
    });

    setUsers(filtered);
  };

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
});

export default CVTerkirimScreen;
