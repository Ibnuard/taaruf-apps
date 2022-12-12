import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {retrieveUserSession} from '../../helpers/storage';
import Carousel from 'react-native-reanimated-carousel';
import {GET_BANNER} from '../../helpers/admin';
import {USER_IS_PREMIUM} from '../../helpers/firebase';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [banners, setBanners] = React.useState([]);
  const [isPremium, setIsPremium] = React.useState(false);

  const {width} = Dimensions.get('window');

  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await retrieveUserSession();
    const premium = await USER_IS_PREMIUM();

    const parsed = JSON.parse(user);

    setUser(parsed);

    setIsPremium(premium);

    //banner
    const banner = await GET_BANNER();

    if (banner) {
      setBanners(banner);
    }
  };

  const MENU = [
    {
      title: 'Pengajuan Taaruf',
      desc: 'Silahkan ajukan CV untuk taaruf',
      icon: IMAGES_RES.kirimTaaruf,
      onpress: () => navigation.navigate('KirimTaaruf', {user: user}),
    },
    {
      title: 'Menerima Taaruf',
      desc: 'Daftar CV yang diajukan',
      icon: IMAGES_RES.terimaTaaruf,
      onpress: () => navigation.navigate('TerimaTaaruf', {user: user}),
    },
    {
      title: 'Daftar CV Terkirim',
      desc: 'Daftar CV yang sudah dikirim',
      icon: IMAGES_RES.sended,
      onpress: () => navigation.navigate('CVTerkirim'),
    },
    {
      title: 'Prosedur',
      desc: 'Menjelaskan alur proses aplikasi ini',
      icon: IMAGES_RES.gear,
      onpress: () => navigation.navigate('Prosedur'),
    },
    {
      title: 'Informasi',
      desc: 'Pertanyaan yang sering ditanyakan',
      icon: IMAGES_RES.info,
      onpress: () => navigation.navigate('Setting'),
    },
    !isPremium && {
      title: 'Daftar Premium',
      desc: 'Daftar menjadi anggota premium',
      icon: IMAGES_RES.premium,
      onpress: () => navigation.navigate('Upgrade', {user: user}),
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{paddingBottom: 60}}>
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
          <Touchable
            style={{width: 36}}
            onPress={() => navigation.jumpTo('Profile')}>
            <Image
              source={{uri: `data:image/png;base64,${user?.fotowajah}`}}
              style={{
                height: 36,
                width: 36,
                borderRadius: 28,
                backgroundColor: 'white',
              }}
            />
          </Touchable>
        </View>
        <Touchable
          style={{marginHorizontal: 14}}
          onPress={() => navigation.navigate('Favorite')}>
          <Icon name="heart" color={Colors.COLOR_WHITE} size={20} />
        </Touchable>
      </View>
      <Carousel
        loop={true}
        autoPlay={true}
        style={{
          width: width,
          height: 200,
          marginTop: -14,
        }}
        width={width}
        data={banners}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({item, index}) => {
          return (
            <Image
              style={{
                height: 200,
                width: width,
                backgroundColor: Colors.COLOR_LIGHT_GRAY,
                borderRadius: 8,
              }}
              source={{uri: `data:image/png;base64,${item}`}}
            />
          );
        }}
        scrollAnimationDuration={1500}
        autoPlayInterval={5000}
      />
      <View style={{paddingHorizontal: 14}}>
        {MENU.map((item, index) => {
          return (
            item && (
              <Card style={{marginTop: 14}} key={index}>
                <Touchable onPress={() => item.onpress()}>
                  <Row>
                    <Image
                      source={item?.icon}
                      style={{width: 48, height: 48, marginRight: 18}}
                      resizeMode={'contain'}
                    />
                    <View style={{flex: 1}}>
                      <Text style={styles.textTitle}>{item?.title}</Text>
                      <Text style={styles.textDesc}>{item?.desc}</Text>
                    </View>
                  </Row>
                </Touchable>
              </Card>
            )
          );
        })}
      </View>
    </ScrollView>
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
