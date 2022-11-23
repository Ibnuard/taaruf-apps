import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Touchable from '../../components/touchable';

const ProfileScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 60}}>
      <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
      <Image
        source={IMAGES_RES.wave_background}
        style={{width: '100%', height: 100}}
        resizeMode={'stretch'}
      />
      <View style={{paddingHorizontal: 14}}>
        <View style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 24}}>
              <Image
                style={{
                  height: 128,
                  width: 96,
                  backgroundColor: 'red',
                  marginBottom: 8,
                  borderRadius: 8,
                }}
              />
              <Text style={styles.textName}>Nama</Text>
              <Text style={styles.textUmur}>Umur</Text>
              <View style={styles.badgeTop}>
                <Text style={styles.textBadgeTopValue}>Siap Taaruf</Text>
              </View>
            </View>
            <View style={{flex: 1, marginRight: 8}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.COLOR_GRAY,
                  paddingVertical: 10,
                }}>
                <Icon name="idcard" size={20} color={Colors.COLOR_DARK_GRAY} />
                <Text style={styles.textInfo}>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsmu
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.COLOR_GRAY,
                  paddingVertical: 10,
                  maxWidth: '78%',
                }}>
                <Icon
                  name="infocirlceo"
                  size={20}
                  color={Colors.COLOR_DARK_GRAY}
                />
                <Text style={styles.textInfo}>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsmu
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.COLOR_GRAY,
                  paddingVertical: 10,
                  maxWidth: '78%',
                }}>
                <Icon name="home" size={20} color={Colors.COLOR_DARK_GRAY} />
                <Text style={styles.textInfo}>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsmu
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.COLOR_GRAY,
                  paddingVertical: 10,
                  maxWidth: '78%',
                }}>
                <Icon
                  name="solution1"
                  size={20}
                  color={Colors.COLOR_DARK_GRAY}
                />
                <Text style={styles.textInfo}>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsmu
                </Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: 24}}>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.COLOR_GRAY,
                marginBottom: 24,
              }}>
              <Text style={styles.textCaption}>Kriteria yang diinginkan</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.badge}>
                  <Text style={styles.textBadgeValue}>Value</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.COLOR_GRAY,
                marginBottom: 24,
              }}>
              <Text style={styles.textCaption}>Hobi</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.badge}>
                  <Text style={styles.textBadgeValue}>Value</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.COLOR_GRAY,
                marginBottom: 24,
              }}>
              <Text style={styles.textCaption}>Anak ke</Text>
              <Text style={styles.textNormalValue}>Value</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.COLOR_GRAY,
                marginBottom: 24,
              }}>
              <Text style={styles.textCaption}>Suku</Text>
              <Text style={styles.textNormalValue}>Value</Text>
            </View>
          </View>
        </View>

        <View>
          <Row style={{marginVertical: 8}}>
            <Touchable
              style={{
                height: 42,
                width: 42,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: Colors.COLOR_ACCENT,
                backgroundColor: Colors.COLOR_WHITE,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}>
              <Icon name="heart" color={Colors.COLOR_LIGHT_GRAY} size={20} />
            </Touchable>
            <Button title="Terima Taaruf" buttonStyle={{flex: 1}} />
          </Row>
          <Button title="Tolak Taaruf" invert />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: -24,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.05,
    elevation: 2,
    margin: 2,
  },

  badgeTop: {
    backgroundColor: Colors.COLOR_ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderRadius: 20,
    marginTop: 14,
    margin: 2,
  },

  badge: {
    backgroundColor: Colors.COLOR_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 8,
  },

  textInfo: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_BLACK,
    marginLeft: 8,
  },

  textName: {
    ...Typo.TextNormalRegular,
  },

  textUmur: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_GRAY,
  },

  textCaption: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DARK_GRAY,
  },

  textNormalValue: {
    ...Typo.TextNormalRegular,
    paddingVertical: 8,
  },

  textBadgeValue: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_WHITE,
    paddingVertical: 4,
  },

  textBadgeTopValue: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_WHITE,
    paddingVertical: 4,
  },
});

export default ProfileScreen;
