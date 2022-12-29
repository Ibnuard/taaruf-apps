import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Linking,
  BackHandler,
} from 'react-native';
import {Button, Card, Modal, Input, Row} from '../../components';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {retrieveUserSession} from '../../helpers/storage';
import {
  ACCEPT_TAARUF,
  ADD_TO_FAVORITE,
  CANCEL_NADZOR,
  CANCEL_TAARUF,
  CHECK_IS_MATCH,
  CHECK_IS_TAARUFED,
  CHECK_TAARUF_STATUS,
  CREATE_NOTIFICATION,
  IS_FAVORITED,
  REJECT_TAARUF,
  REMOVE_FROM_FAVORITE,
  SEND_TAARUF,
  UPDATE_NOTIFICATION,
  USER_GET_ADMIN_INFO,
  USER_IS_PREMIUM,
} from '../../helpers/firebase';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = ({navigation, route}) => {
  const [firstQ, setFirstQ] = React.useState('');
  const [secondQ, setSecondQ] = React.useState('');
  const [thirdQ, setThirdQ] = React.useState('');

  const [user, setUser] = React.useState('');
  const [isPremium, setIsPremium] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [favorited, setIsFavorited] = React.useState(false);
  const [taarufed, setTaarufed] = React.useState(false);

  const [buttonId, setButtonId] = React.useState('idle');

  const [isMatch, setIsMatch] = React.useState(false);

  const scrollRef = React.useRef(null);

  const KEY = route?.params?.key;
  const USER_DATA = route?.params?.data;
  const AVAILABLE = route?.params?.available;
  const CAN_TAARUF = route?.params?.canTaaruf;
  const IS_PREMIUM = route?.params?.isPremium;

  const [accepted, setAccepted] = React.useState(USER_DATA?.taaruf ?? false);
  const [rejected, setRejected] = React.useState(USER_DATA?.rejected ?? false);

  const [modalVisible, setModalVisible] = React.useState(false);

  const [rejectPressed, setRejectPressed] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState('');

  const {signOut} = React.useContext(AuthContext);

  const [selfQuestion, setSelfQuestion] = React.useState();

  const TAARUF_MESSAGES = id => {
    return `Assalamualaikum, Saya dari aplikasi Mencari Cinta Sejati, Partner taaruf saya ${id}`;
  };

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!KEY) {
        //own profile
        getOwnProfile();
      }

      if (KEY == 'ontaaruf') {
        navigation.setOptions({
          title: '',
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (accepted || KEY == 'ontaaruf') {
          navigation.navigate('HomeInit');
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [accepted, KEY]),
  );

  React.useLayoutEffect(() => {
    if (KEY) {
      setUser(USER_DATA);
      checkIsFavorited();
      checkIsTaarufed();
      checkIsMatch();
      getSelfData();
    }

    return () => null;
  }, [favorited, isLoading]);

  async function getSelfData() {
    const data = await retrieveUserSession();
    const parsed = JSON.parse(data);

    setSelfQuestion(parsed);
  }

  React.useLayoutEffect(() => {
    if (KEY == 'terimataaruf') {
      sendNotification();
    }
  }, []);

  async function checkIsMatch() {
    const match = await CHECK_IS_MATCH(USER_DATA);

    if (match) {
      setIsMatch(match);
    }
  }

  async function sendNotification() {
    const user = await retrieveUserSession();
    const parsed = JSON.parse(user);

    await UPDATE_NOTIFICATION(parsed?.id, 'send', USER_DATA?.nomorwa, 'read');
  }

  const checkIsFavorited = async () => {
    const favorited = await IS_FAVORITED(USER_DATA);

    console.log('is fav : ' + favorited);

    setIsFavorited(favorited);
  };

  const checkIsTaarufed = async () => {
    const result = await CHECK_IS_TAARUFED(USER_DATA);
    const status = await CHECK_TAARUF_STATUS(USER_DATA?.nomorwa);

    if (result) {
      console.log('is taarufed : ' + result);

      if (status == 'ACCEPTED') {
        setAccepted(true);
      } else if (status == 'REJECTED') {
        setRejected(true);
      }

      setTaarufed(result);
    }

    if (KEY == 'ontaaruf') {
      setAccepted(true);
      setTaarufed(true);
    }
  };

  console.log('is accepted : ' + true);

  async function getOwnProfile() {
    console.log('Get user session!!!');
    const user = await retrieveUserSession();
    const parse = JSON.parse(user);

    console.log('is prem : ' + isPremium);
    setUser(parse);

    const token = parse.token;
    console.log('token : ' + token);

    const isPremium = await USER_IS_PREMIUM();
    setIsPremium(isPremium);
  }

  const normalizeDataList = (data = '') => {
    const splitting = data.split(',');

    return splitting;
  };

  //ADD OR REMOVE FROM FAV
  const onFavoriteButtonPress = async () => {
    setButtonId('favorite');
    setIsLoading(true);

    if (favorited) {
      Alert.alert('Sukses', 'Berhasil dihapus dari daftar favorit!');
      await REMOVE_FROM_FAVORITE(user).then(() => {
        console.log('remove succes');
        setIsLoading(false);
      });
    } else {
      Alert.alert('Sukses', 'Berhasil ditambahkan ke daftar favorit!');
      await ADD_TO_FAVORITE(user).then(() => {
        console.log('add succes');
        setIsLoading(false);
      });
    }
  };

  //AJUKAN TAARUF PRESSED
  const onSendTaarufButtonPressed = async () => {
    if (IS_PREMIUM) {
      setButtonId('taaruf');
      if (taarufed) {
        console.log('cancel');
        Alert.alert(
          'Konfirmasi',
          'Apakah anda yakin ingin membatalkan pengajuan CV anda?',
          [
            {
              text: 'Batalkan',
              onPress: () => setIsLoading(false),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: async () => {
                setIsLoading(true);
                await CANCEL_TAARUF(USER_DATA)
                  .then(() => {
                    setIsLoading(false);
                    setTaarufed(false);
                    Alert.alert(
                      'Sukses!',
                      'Permintaan taaruf telah dibatalkan!',
                      [
                        {
                          text: 'OK',
                          onPress: () => navigation.goBack(),
                        },
                      ],
                    );
                  })
                  .catch(err => {
                    console.log('errors: ' + err);
                    setIsLoading(false);
                    Alert.alert(
                      'Gagal!',
                      'Permintaan taaruf gagal dibatalkan, mohon coba lagi!',
                    );
                  });
              },
            },
          ],
        );
      } else {
        console.log('send');
        Alert.alert(
          'Konfirmasi',
          'Apakah anda yakin ingin mengajukan CV taaruf anda?',
          [
            {
              text: 'Batalkan',
              onPress: () => setIsLoading(false),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: async () => {
                setIsLoading(true);
                const answers = {
                  q1: firstQ,
                  q2: secondQ,
                  q3: thirdQ,
                };

                if (AVAILABLE) {
                  await SEND_TAARUF(USER_DATA, answers)
                    .then(() => {
                      setIsLoading(false);
                      Alert.alert(
                        'Sukses!',
                        'Pengajuan taaruf telah terkirim!',
                        [
                          {
                            text: 'OK',
                            onPress: () => navigation.navigate('CVTerkirim'),
                          },
                        ],
                      );
                    })
                    .catch(err => {
                      console.log('fail : ' + err);
                      setIsLoading(false);
                      Alert.alert(
                        'Gagal!',
                        'Permintaan taaruf gagal dikirim, mohon coba lagi!',
                      );
                    });
                } else {
                  setIsLoading(false);
                  Alert.alert(
                    'Gagal!',
                    'Anda telah mencapai batas maksimum pengajuan CV bulan ini!',
                  );
                }
              },
            },
          ],
        );
      }
    } else {
      navigation.navigate('Upgrade', {user: USER_DATA});
    }
  };

  //MENERIMA TAARUF
  const onAcceptTaarufPressed = async () => {
    if (!IS_PREMIUM) {
      navigation.navigate('Upgrade', {user: USER_DATA});
    } else {
      if (CAN_TAARUF) {
        Alert.alert(
          'Konfirmasi',
          'Apakah anda yakin ingin menerima pengajuan CV taaruf ini?',
          [
            {
              text: 'Batalkan',
              onPress: () => console.log('cancel'),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: async () => {
                setIsLoading(true);
                await ACCEPT_TAARUF(user?.nomorwa, user)
                  .then(() => {
                    setIsLoading(false);
                    setAccepted(true);
                    Alert.alert(
                      'Sukses',
                      'Taaruf Diterima, silahkan hubungi admin untuk proses selanjutnya!',
                      [
                        {
                          text: 'OK',
                          onPress: () =>
                            scrollRef.current.scrollTo({
                              x: 0,
                              y: 0,
                              animated: true,
                            }),
                        },
                      ],
                    );
                  })
                  .catch(err => {
                    setIsLoading(false);
                    Alert.alert('Gagal', 'Ada kesalahan mohon coba lagi!');
                  });
              },
            },
          ],
        );
      } else {
        Alert.alert(
          'Gagal',
          'Kesempatan menerima taaruf anda telah habis, silahkan upgrade akun anda untuk menerima taaruf tanpa batas!',
        );
      }
    }
  };

  const onRejectTaarufPressed = async () => {
    if (!IS_PREMIUM) {
      navigation.navigate('Upgrade', {user: USER_DATA});
    } else {
      Alert.alert(
        'Konfirmasi',
        'Apakah anda yakin ingin menolak pengajuan CV ini?',
        [
          {
            text: 'Batalkan',
            onPress: () => console.log('cancel'),
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: async () => setRejectPressed(true),
          },
        ],
      );
    }
  };

  const rejectingTaaruf = async () => {
    setIsLoading(true);
    await REJECT_TAARUF(user?.nomorwa, user, rejectReason)
      .then(() => {
        setIsLoading(false);
        setRejected(true);
        Alert.alert('Berhasil', 'Taaruf berhasil ditolak!');
      })
      .catch(err => {
        setIsLoading(false);
        Alert.alert('Gagal', 'Ada kesalahan mohon coba lagi!');
      });
  };

  const onPokeButtonPressed = () => {
    navigation.navigate('KirimPoke', {data: user});
  };

  async function onChatAdmin() {
    setIsLoading(true);

    const adminData = await USER_GET_ADMIN_INFO();

    if (adminData?.waTaaruf) {
      Linking.openURL(
        `whatsapp://send?phone=${adminData?.waTaaruf}&text=${TAARUF_MESSAGES(
          user?.id,
        )}`,
      );
    }
    setIsLoading(false);
  }

  async function onCancelTaaruf() {
    Alert.alert('Konfirmasi', 'Apakah anda yakin ingin membatalkan nadzor?', [
      {
        text: 'Batalkan',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          setRejectPressed(true);
        },
      },
    ]);
  }

  const cancelNadzor = async () => {
    setIsLoading(true);
    await CANCEL_NADZOR(user?.nomorwa, user, rejectReason)
      .then(result => {
        setIsLoading(false);
        if (result == 'FAILED') {
          Alert.alert(
            'Gagal',
            'Silahkan sholat istikharah terlebih dahulu, untuk pembatalan taaruf atau nadzor bisa dilakukan setelah 8 jam',
            [
              {
                text: 'Ok',
                onPress: () => setRejectPressed(false),
              },
            ],
          );
        } else {
          Alert.alert(
            'Sukses',
            'Pembatalan Nadzor sukses dan daftar permintaan akan dihapus!',
            [
              {
                text: 'Ok',
                onPress: () => navigation.goBack(),
              },
            ],
          );
        }
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Gagal', 'Ada masalah, silahkan coba lagi!');
      });
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
    <View style={{flex: 1}}>
      <Modal visible={isLoading} type={'loading'} />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        nestedScrollEnabled
        contentContainerStyle={{paddingBottom: 100}}>
        <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
        <Image
          source={IMAGES_RES.wave_background}
          style={{width: '100%', height: 100}}
          resizeMode={'stretch'}
        />
        <View style={{paddingHorizontal: 14}}>
          {accepted && (
            <Card style={{marginBottom: 36, marginTop: -32}}>
              <View style={{paddingBottom: 14}}>
                <Text style={styles.textTopCard}>
                  Klik tombol chat admin. Antum akan terhubung melalui Whatsapp
                  untuk melakukan proses tanya jawab dengan calon dan menentukan
                  jadwal nadzor
                </Text>
              </View>
              <Button
                isLoading={isLoading}
                title="Chat Admin Taaruf"
                onPress={() => onChatAdmin()}
              />
            </Card>
          )}
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
                        <Touchable
                          onPress={() =>
                            KEY && !accepted
                              ? null
                              : navigation.navigate(
                                  route?.name == 'ProfileInit'
                                    ? 'Foto'
                                    : 'FotoDetail',
                                  {foto: IMAGE_PIC},
                                )
                          }>
                          <Image
                            style={{
                              height: 128,
                              width: 96,
                              backgroundColor: Colors.COLOR_LIGHT_GRAY,
                              borderRadius: 8,
                            }}
                            blurRadius={!KEY ? 0 : accepted ? 0 : 20}
                            source={{uri: `data:image/png;base64,${item}`}}
                          />
                        </Touchable>
                      );
                    }}
                    scrollAnimationDuration={1200}
                  />
                </GestureHandlerRootView>
                <Text style={styles.textName}>
                  {KEY ? (IS_PREMIUM ? user?.nama : user?.id) : user?.nama}
                </Text>
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
                  <Icon
                    name="idcard"
                    size={20}
                    color={Colors.COLOR_DARK_GRAY}
                  />
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
          {!KEY ? (
            //USER PROFILE
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
            // MENERIMA TAARUF
            <Card style={{marginTop: 14}}>
              <View>
                <Text style={styles.textQuestion}>Pertanyaan 1</Text>
                <Text style={styles.textCaption}>
                  {selfQuestion?.pertanyaansatu}
                </Text>
                <Text style={styles.textNormalValue}>{user?.answer?.q1}</Text>
              </View>
              <View>
                <Text style={styles.textQuestion}>Pertanyaan 2</Text>
                <Text style={styles.textCaption}>
                  {selfQuestion?.pertanyaandua}
                </Text>
                <Text style={styles.textNormalValue}>{user?.answer?.q2}</Text>
              </View>
              <View>
                <Text style={styles.textQuestion}>Pertanyaan 3</Text>
                <Text style={styles.textCaption}>
                  {selfQuestion?.pertanyaantiga}
                </Text>
                <Text style={styles.textNormalValue}>{user?.answer?.q3}</Text>
              </View>
            </Card>
          ) : (
            !taarufed &&
            //MENGAJUKAN TAARUF
            (KEY == 'favorite' ? null : (
              <Card style={{marginTop: 14}}>
                <View>
                  <Text style={styles.textQuestion}>Pertanyaan 1</Text>
                  <Text style={styles.textCaption}>{user?.pertanyaansatu}</Text>
                  <Input
                    containerStyle={{
                      height: 32,
                      marginBottom: 18,
                      marginTop: 8,
                    }}
                    placeholder={'Tulis Jawaban'}
                    onChangeText={text => setFirstQ(text)}
                    value={firstQ}
                  />
                </View>
                <View>
                  <Text style={styles.textQuestion}>Pertanyaan 2</Text>
                  <Text style={styles.textCaption}>{user?.pertanyaandua}</Text>
                  <Input
                    containerStyle={{
                      height: 32,
                      marginBottom: 18,
                      marginTop: 8,
                    }}
                    placeholder={'Tulis Jawaban'}
                    onChangeText={text => setSecondQ(text)}
                    value={secondQ}
                  />
                </View>
                <View>
                  <Text style={styles.textQuestion}>Pertanyaan 3</Text>
                  <Text style={styles.textCaption}>{user?.pertanyaantiga}</Text>
                  <Input
                    containerStyle={{
                      height: 32,
                      marginBottom: 18,
                      marginTop: 8,
                    }}
                    placeholder={'Tulis Jawaban'}
                    onChangeText={text => setThirdQ(text)}
                    value={thirdQ}
                  />
                </View>
              </Card>
            ))
          )}

          {KEY ? (
            //TERIMA / AJUKAN TAARUF
            <View style={{marginTop: 14}}>
              {KEY == 'favorite'
                ? null
                : KEY == 'terimataaruf'
                ? //TERIMA TAARUF
                  !accepted &&
                  //TIDAK DALAM TAARUF
                  (!rejected ? (
                    //TIDAK DI TOLAK
                    !rejectPressed ? (
                      <>
                        <Button
                          title="Terima Taaruf"
                          isLoading={isLoading}
                          buttonStyle={{flex: 1, marginBottom: 14}}
                          onPress={() => onAcceptTaarufPressed()}
                        />
                        <Button
                          isLoading={isLoading}
                          title="Tolak Taaruf"
                          invert
                          onPress={() => onRejectTaarufPressed()}
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          placeholder={'Masukan alasan menolak taaruf ini'}
                          onChangeText={text => setRejectReason(text)}
                          value={rejectReason}
                        />
                        <Button
                          title="Kirim Alasan Tolak Taaruf"
                          isLoading={isLoading}
                          buttonStyle={{flex: 1, marginVertical: 14}}
                          onPress={() => rejectingTaaruf()}
                        />
                        <Button
                          isLoading={isLoading}
                          title="Batalkan"
                          invert
                          onPress={() => setRejectPressed(false)}
                        />
                      </>
                    )
                  ) : (
                    <Button disabled title="Taaruf Ditolak" invert />
                  ))
                : !accepted &&
                  //AJUKAN TAARUF
                  //TIDAK DALAM TAARUF
                  (!rejected ? (
                    //TIDAK DITOLAK
                    <>
                      <Button
                        disabled={
                          taarufed ? false : !firstQ || !secondQ || !thirdQ
                        }
                        isLoading={buttonId == 'taaruf' ? isLoading : false}
                        title={
                          !taarufed
                            ? 'Ajukan Taaruf'
                            : 'Batalkan Pengajuan Taaruf'
                        }
                        buttonStyle={{flex: 1}}
                        onPress={() => onSendTaarufButtonPressed()}
                      />
                      {taarufed && (
                        //TIDAK DIRESPON
                        <Button
                          buttonStyle={{marginTop: 14}}
                          invert
                          title="Kirim Poke"
                          onPress={() => onPokeButtonPressed()}
                        />
                      )}
                    </>
                  ) : (
                    <Button disabled title="Taaruf Ditolak" invert />
                  ))}
            </View>
          ) : (
            //USER PROFILE
            <View style={{marginVertical: 24}}>
              <Button
                title="Keluar"
                onPress={async () => {
                  await navigation.jumpTo('Home');
                  signOut();
                }}
              />
              <View style={{marginTop: 14}} />
              <Button
                invert
                title="Edit CV"
                onPress={() =>
                  navigation.navigate('EditCV', {key: 'edit', user: user})
                }
              />
            </View>
          )}
          {accepted &&
            (rejectPressed ? (
              <>
                <Input
                  placeholder={'Masukan alasan membatalkan nadzor'}
                  onChangeText={text => setRejectReason(text)}
                  value={rejectReason}
                />
                <Button
                  title="Kirim Alasan Tolak Taaruf"
                  isLoading={isLoading}
                  buttonStyle={{flex: 1, marginVertical: 14}}
                  onPress={() => cancelNadzor()}
                />
                <Button
                  isLoading={isLoading}
                  title="Batalkan"
                  invert
                  onPress={() => setRejectPressed(false)}
                />
              </>
            ) : (
              <Button
                isLoading={isLoading}
                title="Batalkan Nadzor"
                onPress={() => onCancelTaaruf()}
              />
            ))}
        </View>
        <Modal type={'loading'} visible={modalVisible} />
      </ScrollView>
      {KEY && KEY !== 'favorite' && KEY !== 'ontaaruf' && (
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
          <Touchable
            style={{
              height: 54,
              width: 54,
              borderRadius: 27,
              borderWidth: 2,
              borderColor: Colors.COLOR_ACCENT,
              backgroundColor: Colors.COLOR_ACCENT,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}
            onPress={() => onFavoriteButtonPress()}>
            <Icon
              name="heart"
              color={favorited ? Colors.COLOR_RED : Colors.COLOR_WHITE}
              size={24}
            />
          </Touchable>
        </View>
      )}
    </View>
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

export default ProfileScreen;
