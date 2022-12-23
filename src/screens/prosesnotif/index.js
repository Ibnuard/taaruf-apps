import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import NoItemScreen from '../../components/NoItem';
import NotificationCard from '../../components/NotificationCard';
import {GET_NOTIFICATION} from '../../helpers/firebase';
import {DECODE_MOMENT} from '../../utils/moment';

const ProsesNotifScreen = ({navigation, route}) => {
  const [notification, setNotification] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotification();
    });

    return unsubscribe;
  }, [navigation]);

  async function getNotification() {
    setIsLoading(true);
    const data = await GET_NOTIFICATION();

    if (data) {
      const filtered = data.filter((item, index) => {
        return item?.type !== 'favorite';
      });

      const _parseDate = date => {
        const result = DECODE_MOMENT(date, 'LLL');

        const getTime = new Date(result).getTime();

        return getTime;
      };

      const sort = filtered.sort(function (a, b) {
        return _parseDate(b.timestamp) - _parseDate(a.timestamp);
      });

      setNotification(sort);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {notification?.length ? (
        <FlatList
          contentContainerStyle={{paddingBottom: 60, paddingTop: 18}}
          data={notification}
          renderItem={({item, index}) => <NotificationCard data={item} />}
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
    paddingHorizontal: 14,
  },
});

export default ProsesNotifScreen;
