import {useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {View, Text, StyleSheet, Image, BackHandler} from 'react-native';
import Touchable from '../../components/touchable';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';

const DoneCVScreen = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('SignIn');
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Selamat CV sudah berhasil dibuat silahkan login.
      </Text>
      <Image source={IMAGES_RES.love_pic} style={{height: 100, width: 100}} />
      <Touchable
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.textButton}>Masuk</Text>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },

  button: {
    backgroundColor: Colors.COLOR_WHITE,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: 154,
  },

  textTitle: {
    ...Typo.TextLargeBold,
    textAlign: 'center',
    color: Colors.COLOR_WHITE,
  },

  textButton: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_ACCENT,
  },
});

export default DoneCVScreen;
