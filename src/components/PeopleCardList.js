import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Card from './card';
import Pic from '../../assets/images/pic.jpeg';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors, Typo} from '../styles';

const PeopleCardList = ({
  onPress,
  data,
  showCount = true,
  blur = false,
  showBadgePremium = false,
}) => {
  return (
    <Card useShadow={false} style={styles.container} onPress={onPress}>
      <Image
        blurRadius={blur ? 24 : 0}
        source={{uri: `data:image/png;base64,${data?.fotowajah}`}}
        resizeMode={'contain'}
        style={styles.image}
      />
      {showBadgePremium && data?.premium && (
        <View
          style={{
            backgroundColor: Colors.COLOR_ACCENT,
            position: 'absolute',
            margin: 8,
            paddingHorizontal: 14,
            paddingVertical: 4,
            borderRadius: 14,
            opacity: 0.8,
          }}>
          <Text style={styles.textPremium}>User Premium</Text>
        </View>
      )}
      <View style={{padding: 8, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, marginHorizontal: 4}}>
          <Text style={styles.textTitle}>
            {data?.id}, {data?.umur} th
          </Text>
          <Text style={styles.textDesc}>
            {data?.status}, {data?.pekerjaan}, {data?.kota}
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="heart" color={Colors.COLOR_RED} size={24} />
          {showCount && (
            <Text style={styles.textFavCount}>{data?.favoritCount}</Text>
          )}
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

  textPremium: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_WHITE,
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
