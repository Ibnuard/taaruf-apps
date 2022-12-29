import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Card from './card';
import Pic from '../../assets/images/pic.jpeg';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors, Typo} from '../styles';
import {
  CHECK_IS_MATCH,
  CHECK_TAARUF_STATUS,
  CHECK_TAARUF_STATUS_RECEIVE,
  GET_SENDED_CV,
} from '../helpers/firebase';

const PeopleCardList = ({
  onPress,
  data,
  showCount = true,
  showBadgePremium = false,
  showBadgeUser = true,
  user,
  isAdmin,
}) => {
  const [userStatus, setUserStatus] = React.useState('loading');

  if (user) {
    checkUserStatus();
  }

  async function checkUserStatus() {
    const sendedCV = await GET_SENDED_CV();
    const isMatch = await CHECK_IS_MATCH(data);
    const status = await CHECK_TAARUF_STATUS(data?.nomorwa);
    const statusReceive = await CHECK_TAARUF_STATUS_RECEIVE(data?.nomorwa);

    const findUser = sendedCV.filter((item, index) => {
      return item.id == data?.id;
    });

    if (isMatch) {
      if (statusReceive == 'ACCEPTED') {
        setUserStatus('taaruf');
      } else {
        setUserStatus('idle');
      }
    } else {
      if (findUser[0]?.id == data.id) {
        if (status == 'ACCEPTED') {
          setUserStatus('taaruf');
        } else {
          setUserStatus('idle');
        }
      } else {
        setUserStatus('idle');
      }
    }
  }

  function renderBadge() {
    if (userStatus == 'loading') {
      return <Text style={styles.textPremium}>...</Text>;
    } else if (userStatus == 'idle') {
      return (
        <Text style={styles.textPremium}>
          {data?.premium ? 'Siap Taaruf' : 'Ada'}
        </Text>
      );
    } else {
      return <Text style={styles.textPremium}>{'Dalam Taaruf'}</Text>;
    }
  }

  return (
    <Card useShadow={false} style={styles.container} onPress={onPress}>
      <Image
        blurRadius={isAdmin ? 0 : userStatus !== 'taaruf' ? 24 : 0}
        source={{uri: `data:image/png;base64,${data?.fotowajah}`}}
        resizeMode={'contain'}
        style={styles.image}
      />
      {showBadgePremium && data?.premium && !user && (
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
      {showBadgeUser && user && (
        <View
          style={{
            backgroundColor:
              userStatus == 'process'
                ? Colors.COLOR_RED
                : userStatus == 'taaruf'
                ? Colors.COLOR_GREEN
                : Colors.COLOR_ACCENT,
            position: 'absolute',
            margin: 8,
            paddingHorizontal: 14,
            paddingVertical: 4,
            borderRadius: 14,
            opacity: 0.8,
          }}>
          {renderBadge()}
        </View>
      )}
      <View style={{padding: 8, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, marginHorizontal: 4}}>
          <Text style={styles.textTitle}>
            {data[userStatus == 'taaruf' ? 'nama' : 'id']}, {data?.umur} th
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
