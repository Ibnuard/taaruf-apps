import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NotificationCard from '../../components/NotificationCard';

const ProsesNotifScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text>halo</Text>
      <NotificationCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProsesNotifScreen;
