import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Card from './card';
import Pic from '../../assets/images/pic.jpeg';
import Touchable from './touchable';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors, Typo} from '../styles';

const PeopleCardList = ({onPress}) => {
  return (
    <Card useShadow={false} style={styles.container} onPress={onPress}>
      <Image
        blurRadius={24}
        source={Pic}
        resizeMode={'contain'}
        style={styles.image}
      />
      <View style={{padding: 8, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>ID, 20 th</Text>
          <Text style={styles.textDesc}>Desc</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="heart" color={Colors.COLOR_RED} size={24} />
          <Text style={styles.textFavCount}>100</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
  },

  image: {
    flex: 1,
    height: 196,
    width: '100%',
    borderRadius: 8,
  },

  textTitle: {
    ...Typo.TextNormalBold,
    color: Colors.COLOR_BLACK,
  },

  textDesc: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_BLACK,
  },

  textFavCount: {
    ...Typo.TextExtraSmallRegular,
    color: Colors.COLOR_WHITE,
    position: 'absolute',
    top: 4,
  },
});

export default PeopleCardList;
