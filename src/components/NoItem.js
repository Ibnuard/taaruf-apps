import * as React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors, Typo} from '../styles';

const NoItemScreen = ({isLoading}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.textTitle}>Tidak ada data disini</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textTitle: {
    ...Typo.TextLargeBold,
    color: Colors.COLOR_GRAY,
  },
});

export default NoItemScreen;
