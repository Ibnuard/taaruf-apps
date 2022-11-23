import * as React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
      <Image
        source={IMAGES_RES.wave_background}
        style={{width: '100%', height: 100, marginBottom: 24}}
        resizeMode={'stretch'}
      />
      <View
        style={{
          position: 'absolute',
          top: 40,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
        }}>
        <View style={{flex: 1}}>
          <Image
            style={{
              height: 36,
              width: 36,
              borderRadius: 28,
              backgroundColor: 'white',
            }}
          />
        </View>
        <View>
          <Icon name="heart" color={Colors.COLOR_WHITE} size={20} />
        </View>
      </View>
      <View style={{paddingHorizontal: 14}}>
        <Card>
          <Touchable onPress={() => navigation.navigate('KirimTaaruf')}>
            <Row>
              <Image
                source={IMAGES_RES.kirimTaaruf}
                style={{width: 48, height: 48, marginRight: 18}}
                resizeMode={'contain'}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textTitle}>Pengajuan Taaruf</Text>
                <Text style={styles.textDesc}>
                  Antum mengajukan CV ke akhwat
                </Text>
              </View>
            </Row>
          </Touchable>
        </Card>

        <Card style={{marginTop: 14}}>
          <Touchable onPress={() => navigation.navigate('TerimaTaaruf')}>
            <Row>
              <Image
                source={IMAGES_RES.terimaTaaruf}
                style={{width: 48, height: 48, marginRight: 18}}
                resizeMode={'contain'}
              />
              <View style={{flex: 1}}>
                <Text style={styles.textTitle}>Menerima Taaruf</Text>
                <Text style={styles.textDesc}>
                  Daftar CV yang diajukan akhwat ke antum
                </Text>
              </View>
            </Row>
          </Touchable>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textTitle: {
    ...Typo.TextLargeBold,
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY,
    marginTop: 4,
  },
});

export default HomeScreen;
