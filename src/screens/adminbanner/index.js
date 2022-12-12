import * as React from 'react';
import {View, Text, StyleSheet, Image, StatusBar, Alert} from 'react-native';
import {Button, Row} from '../../components';
import Touchable from '../../components/touchable';
import {GET_BANNER, UPDATE_BANNER} from '../../helpers/admin';
import {defaultBanner} from '../../helpers/constants';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import {LaunchGallery} from '../../utils/imagePicker';

const AdminBannerScreen = ({navigation}) => {
  const [banners, setBanners] = React.useState([
    defaultBanner,
    defaultBanner,
    defaultBanner,
  ]);
  const [selected, setSelected] = React.useState();

  const [isLoading, setIsLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    getBanner();
  }, []);

  async function getBanner() {
    const data = await GET_BANNER();

    if (data) {
      setBanners(data);
    }
  }

  const onUpdate = async index => {
    const selectedImage = await LaunchGallery();

    if (selectedImage) {
      const data = banners;

      data[index] = selectedImage;

      setBanners(data);
      setSelected();
    }
  };

  function onDelete(index) {
    const data = banners;

    data[index] = defaultBanner;

    setBanners(data);
    setSelected();
  }

  async function save() {
    setIsLoading(true);

    await UPDATE_BANNER(banners)
      .then(() => {
        setIsLoading(false);
        Alert.alert('Sukses!', 'Banner berhasil disimpan!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('err : ' + err.message);
        if (err.message.includes('firestore/invalid-argument')) {
          Alert.alert(
            'Gagal!',
            'Ukuran file terlalu besar, silahkan kompress atau pilih file lain!',
          );
        } else {
          Alert.alert('Gagal!', 'Banner gagal disimpan, mohon coba lagi!');
        }
      });
  }

  function banner(img, index) {
    return (
      <View style={{marginBottom: 20}}>
        <Touchable
          onPress={() => setSelected(selected == index ? null : index)}>
          <Image
            source={{uri: `data:image/png;base64,${img ?? defaultBanner}`}}
            style={{
              width: '100%',
              height: 125,
              marginBottom: 4,
              borderRadius: 14,
              backgroundColor: 'gray',
            }}
            resizeMode={'cover'}
          />
        </Touchable>
        {selected == index && (
          <Row>
            <Button
              title="Ganti"
              buttonStyle={{flex: 1, marginHorizontal: 4}}
              onPress={() => onUpdate(index)}
            />
            <Button
              title="Hapus"
              invert
              buttonStyle={{flex: 1, marginHorizontal: 4}}
              onPress={() => onDelete(index)}
            />
          </Row>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
      <View style={{padding: 24}}>
        <Text style={styles.textTitle}>Tekan gambar untuk update / hapus</Text>
        {banners.map((item, index) => {
          return banner(item, index);
        })}
        <Button title="Simpan" isLoading={isLoading} onPress={() => save()} />
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
    marginBottom: 14,
    alignSelf: 'center',
  },
});

export default AdminBannerScreen;
