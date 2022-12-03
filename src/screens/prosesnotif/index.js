import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import NotificationCard from '../../components/NotificationCard';
import {GET_NOTIFICATION} from '../../helpers/firebase';

const ProsesNotifScreen = ({navigation, route}) => {
  const [notification, setNotification] = React.useState();

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotification();
    });

    return unsubscribe;
  }, [navigation]);

  async function getNotification() {
    const data = await GET_NOTIFICATION();

    if (data) {
      const filtered = data.filter((item, index) => {
        return item?.type !== 'favorite';
      });

      console.log(JSON.stringify(filtered));

      setNotification(filtered);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 60, paddingTop: 18}}
        data={notification}
        renderItem={({item, index}) => <NotificationCard data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
});

export default ProsesNotifScreen;
