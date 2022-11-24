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
import {AuthContext} from '../../context';
import {retrieveUserSession} from '../../helpers/storage';
import {
  ADD_TO_FAVORITE,
  IS_FAVORITED,
  REMOVE_FROM_FAVORITE,
} from '../../helpers/firebase';

const ProfileScreen = ({navigation, route}) => {
  const [firstQ, setFirstQ] = React.useState('');
  const [secondQ, setSecondQ] = React.useState('');
  const [thirdQ, setThirdQ] = React.useState('');

  const [user, setUser] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const [favorited, setIsFavorited] = React.useState(false);

  const KEY = route?.params?.key;
  const USER_DATA = route?.params?.data;

  const {signOut} = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!KEY) {
      //own profile
      getOwnProfile();
    } else {
      setUser(USER_DATA);
      checkIsFavorited();
    }

    return () => null;
  }, []);

  // React.useEffect(() => {
  //   if (KEY) {
  //     console.log('check fav');
  //     checkIsFavorited();
  //   }
  // }, [isLoading]);

  const checkIsFavorited = async () => {
    const favorited = await IS_FAVORITED(user);

    console.log('is fav : ' + favorited);

    setIsFavorited(favorited);
  };

  async function getOwnProfile() {
    const user = await retrieveUserSession();
    const parse = JSON.parse(user);

    setUser(parse);
  }

  const normalizeDataList = (data = '') => {
    const splitting = data.split(',');

    return splitting;
  };

  const onFavoriteButtonPress = async () => {
    setIsLoading(true);

    if (favorited) {
      await REMOVE_FROM_FAVORITE(user).then(() => {
        console.log('remove succes');
        setIsLoading(false);
      });
    } else {
      await ADD_TO_FAVORITE(user).then(() => {
        console.log('add succes');
        setIsLoading(false);
      });
    }
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
                  backgroundColor: Colors.COLOR_LIGHT_GRAY,
                  marginBottom: 8,
                  borderRadius: 8,
                }}
                source={{uri: `data:image/png;base64,${user?.fotowajah}`}}
              />
              <Text style={styles.textName}>{user?.nama}</Text>
              <Text style={styles.textUmur}>{user?.umur} tahun</Text>
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
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
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

        {!KEY ? (
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
        ) : KEY == 'terimataaruf' ? (
          <Card style={{marginTop: 14}}>
            <View>
              <Text style={styles.textQuestion}>Pertanyaan 1</Text>
              <Text style={styles.textCaption}>{user?.pertanyaansatu}</Text>
              <Text style={styles.textNormalValue}>ini jawabannya</Text>
            </View>
            <View>
              <Text style={styles.textQuestion}>Pertanyaan 2</Text>
              <Text style={styles.textCaption}>{user?.pertanyaandua}</Text>
              <Text style={styles.textNormalValue}>ini jawabannya</Text>
            </View>
            <View>
              <Text style={styles.textQuestion}>Pertanyaan 3</Text>
              <Text style={styles.textCaption}>{user?.pertanyaantiga}</Text>
              <Text style={styles.textNormalValue}>ini jawabannya</Text>
            </View>
          </Card>
        ) : (
          <Card style={{marginTop: 14}}>
            <View>
              <Text style={styles.textQuestion}>Pertanyaan 1</Text>
              <Text style={styles.textCaption}>{user?.pertanyaansatu}</Text>
              <Input
                containerStyle={{height: 32, marginBottom: 18, marginTop: 8}}
                placeholder={'Tulis Jawaban'}
                onChangeText={text => setFirstQ(text)}
                value={firstQ}
              />
            </View>
            <View>
              <Text style={styles.textQuestion}>Pertanyaan 2</Text>
              <Text style={styles.textCaption}>{user?.pertanyaandua}</Text>
              <Input
                containerStyle={{height: 32, marginBottom: 18, marginTop: 8}}
                placeholder={'Tulis Jawaban'}
                onChangeText={text => setSecondQ(text)}
                value={secondQ}
              />
            </View>
            <View>
              <Text style={styles.textQuestion}>Pertanyaan 3</Text>
              <Text style={styles.textCaption}>{user?.pertanyaantiga}</Text>
              <Input
                containerStyle={{height: 32, marginBottom: 18, marginTop: 8}}
                placeholder={'Tulis Jawaban'}
                onChangeText={text => setThirdQ(text)}
                value={thirdQ}
              />
            </View>
          </Card>
        )}

        {KEY ? (
          <View style={{marginTop: 14}}>
            {KEY == 'terimataaruf' ? (
              <>
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
                    }}
                    onPress={() => onFavoriteButtonPress()}>
                    <Icon
                      name="heart"
                      color={
                        favorited ? Colors.COLOR_RED : Colors.COLOR_LIGHT_GRAY
                      }
                      size={20}
                    />
                  </Touchable>
                  <Button title="Terima Taaruf" buttonStyle={{flex: 1}} />
                </Row>
                <Button title="Tolak Taaruf" invert />
              </>
            ) : (
              <>
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
                    }}
                    onPress={() => onFavoriteButtonPress()}>
                    <Icon
                      name="heart"
                      color={
                        favorited ? Colors.COLOR_RED : Colors.COLOR_LIGHT_GRAY
                      }
                      size={20}
                    />
                  </Touchable>
                  <Button
                    disabled={!firstQ || !secondQ || !thirdQ}
                    title="Ajukan Taaruf"
                    buttonStyle={{flex: 1}}
                  />
                </Row>
              </>
            )}
          </View>
        ) : (
          <View style={{marginVertical: 24}}>
            <Button title="Keluar" onPress={() => signOut()} />
          </View>
        )}
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
});

export default ProfileScreen;
