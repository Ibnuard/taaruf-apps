import * as React from 'react';
import {View, Text, StyleSheet, Image, StatusBar, FlatList} from 'react-native';
import {Button, Input} from '../../components';
import NoItemScreen from '../../components/NoItem';
import PeopleCardList from '../../components/PeopleCardList';
import {AuthContext} from '../../context';
import {ADMIN_USER_LIST} from '../../helpers/admin';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';

const AdminUsersScreen = ({navigation}) => {
  const [users, setUsers] = React.useState();
  const [id, setId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllUsers();
    });

    return unsubscribe;
  }, [navigation]);

  function filterId(data = []) {
    return data.filter((item, index) => {
      if (id.length) {
        return item.id.toLowerCase().includes(id.toLowerCase());
      } else return item;
    });
  }

  async function getAllUsers() {
    setIsLoading(true);
    const usersList = await ADMIN_USER_LIST();

    if (usersList) {
      setUsers(usersList);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder={'Cari ID'}
        onChangeText={text => setId(text)}
        value={id}
      />
      {filterId(users)?.length ? (
        <FlatList
          data={filterId(users)}
          contentContainerStyle={{paddingBottom: 64, marginTop: 14}}
          renderItem={({item, index}) => (
            <PeopleCardList
              data={item}
              showBadgePremium
              isAdmin={true}
              onPress={
                () =>
                  navigation.navigate('AdminDetail', {
                    data: item,
                  })
                // navigation.navigate('Upgrade')
              }
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
    padding: 24,
  },

  textTitle: {
    ...Typo.TextExtraLargeBold,
  },
});

export default AdminUsersScreen;
