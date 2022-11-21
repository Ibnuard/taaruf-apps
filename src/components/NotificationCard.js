import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typo} from '../styles';
import Card from './card';

const NotificationCard = data => {
  return (
    <Card style={styles.container}>
      <Text style={styles.textTitle}>Halo</Text>
      <Text style={styles.textDesc}>Desc</Text>
      <Text style={styles.textTime}>datetime</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  textTitle: {
    ...Typo.TextMediumBold,
    fontWeight: 'bold',
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DARK_GRAY,
    marginTop: 2,
    marginBottom: 4,
  },

  textTime: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DARK_GRAY,
  },
});

export default NotificationCard;
