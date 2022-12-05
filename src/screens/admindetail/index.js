import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {Button, Card} from '../../components';
import {AuthContext} from '../../context';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';

const AdminDetailScreen = ({navigation, route}) => {
  const [user, setUser] = React.useState('');
  const [isPremium, setIsPremium] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const USER_DATA = route?.params?.data;

  React.useEffect(() => {
    setUser(USER_DATA);
  }, []);

  const normalizeDataList = (data = '') => {
    const splitting = data.split(',');

    return splitting;
  };

  const PROFILE_DATA = [
    {
      title: 'Kriteria yang diinginkan',
      type: 'data',
      value: normalizeDataList(user?.kriteria),
    },
    {
      title: 'Hobi',
      type: 'data',
      value: normalizeDataList(user?.hobi),
    },
    {
      title: 'Anak ke',
      type: 'default',
      value: user?.anak,
    },
    {
      title: 'Suku',
      type: 'default',
      value: user?.suku,
    },
    {
      title: 'Warna Kulit',
      type: 'default',
      value: user?.kulit,
    },
    {
      title: 'Riwayat Penyakit',
      type: 'default',
      value: user?.penyakit,
    },
    {
      title: 'Organisasi yang pernah diikuti',
      type: 'default',
      value: user?.organisasi,
    },
    {
      title: 'Pendidikan',
      type: 'default',
      value: user?.pendidikanTerakhir,
    },
    {
      title: 'Riwayat Pendidikan',
      type: 'default',
      value: user?.riwayatPendidikan,
    },
    {
      title: 'Kelebihan Diri',
      type: 'default',
      value: user?.kelebihan,
    },
    {
      title: 'Kekurangan Diri',
      type: 'default',
      value: user?.kekurangan,
    },
    {
      title: 'Aktivitas Keseharian',
      type: 'default',
      value: user?.aktivitas,
    },
    {
      title: 'Kota Domisili Orang Tua',
      type: 'default',
      value: user?.orangtuadom,
    },
    {
      title: 'Visi Misi Pernikahan',
      type: 'default',
      value: user?.visimisi,
    },
  ];

  const IMAGE_PIC = [user?.fotowajah, user?.fotofull];
  return (
    <ScrollView
      style={styles.container}
      nestedScrollEnabled
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
              <GestureHandlerRootView style={{marginBottom: 8}}>
                <Carousel
                  loop={true}
                  autoPlay={true}
                  style={{width: 96, height: 128}}
                  width={96}
                  data={IMAGE_PIC}
                  panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <Image
                        style={{
                          height: 128,
                          width: 96,
                          backgroundColor: Colors.COLOR_LIGHT_GRAY,
                          borderRadius: 8,
                        }}
                        source={{uri: `data:image/png;base64,${item}`}}
                      />
                    );
                  }}
                  scrollAnimationDuration={1200}
                />
              </GestureHandlerRootView>
              <Text style={styles.textName}>{user?.nama}</Text>
              <Text style={styles.textUmur}>{user?.umur} tahun</Text>
              {isPremium && (
                <View style={styles.badgeTop}>
                  <Text style={styles.textBadgeTopValue}>Siap Taaruf</Text>
                </View>
              )}
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
                  {`${user?.status}, ${user?.pekerjaan}, ${user?.kota}`}
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
                  {`${user?.tinggi}cm/${user?.berat}kg`}
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
                <Text style={styles.textInfo}>{user?.ibadah}</Text>
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
                <Text style={styles.textInfo}>{user?.deskripsi}</Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: 24}}>
            {PROFILE_DATA.map((item, index) => {
              if (item.type == 'data') {
                return (
                  <View
                    key={index}
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: Colors.COLOR_GRAY,
                      paddingBottom: 14,
                      marginBottom: 24,
                    }}>
                    <Text style={styles.textCaption}>{item.title}</Text>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        paddingTop: 10,
                      }}>
                      {item.value.map((item, index) => {
                        return (
                          <View key={index} style={styles.badge}>
                            <Text style={styles.textBadgeValue}>{item}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: Colors.COLOR_GRAY,
                      marginBottom: 24,
                    }}>
                    <Text style={styles.textCaption}>{item.title}</Text>
                    <Text style={styles.textNormalValue}>{item?.value}</Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
        <Card style={{marginTop: 14}}>
          <View>
            <Text style={styles.textQuestion}>Pertanyaan 1</Text>
            <Text style={styles.textCaptionQuestion}>
              {user?.pertanyaansatu}
            </Text>
          </View>
          <View>
            <Text style={styles.textQuestion}>Pertanyaan 2</Text>
            <Text style={styles.textCaptionQuestion}>
              {user?.pertanyaandua}
            </Text>
          </View>
          <View>
            <Text style={styles.textQuestion}>Pertanyaan 3</Text>
            <Text style={styles.textCaptionQuestion}>
              {user?.pertanyaantiga}
            </Text>
          </View>
        </Card>
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
    margin: 4,
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

  textCaptionQuestion: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DARK_GRAY,
    marginTop: 4,
    marginBottom: 8,
  },

  textQuestion: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_ACCENT,
  },

  textNormalValue: {
    ...Typo.TextNormalRegular,
    paddingTop: 8,
    paddingBottom: 18,
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

  textTopCard: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_BLACK,
  },
});

export default AdminDetailScreen;
