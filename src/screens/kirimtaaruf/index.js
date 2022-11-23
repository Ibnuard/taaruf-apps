import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PeopleCardList from '../../components/PeopleCardList';

const KirimTaarufScreen = ({navigation}) => {
  const arr = [1, 2, 3, 49, 0, 1, 6, 7, 8];
  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        renderItem={({item, index}) => (
          <PeopleCardList
            onPress={() => navigation.navigate('ProfileDetail')}
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

export default KirimTaarufScreen;
