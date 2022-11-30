import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';
import {FloatingAction} from 'react-native-floating-action';
import {IMAGES_RES} from '../../helpers/images';
import {GET_FAVORITED_CV} from '../../helpers/firebase';
import NoItemScreen from '../../components/NoItem';

const FavoriteScreen = ({navigation}) => {
  const [favList, setFavList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavCV();
    });

    return unsubscribe;
  }, [navigation]);

  const getFavCV = async () => {
    setIsLoading(true);
    const data = await GET_FAVORITED_CV();

    setFavList(data);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {favList.length ? (
        <FlatList
          data={favList}
          contentContainerStyle={{paddingBottom: 64}}
          renderItem={({item, index}) => (
            <PeopleCardList
              data={item}
              onPress={() =>
                navigation.navigate('ProfileDetail', {
                  key: 'kirimtaaruf',
                  data: item,
                })
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
    padding: 14,
  },
});

export default FavoriteScreen;
