import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import {Button, Input, Row} from '../../components';
import Touchable from '../../components/touchable';
import {AuthContext} from '../../context';
import {GET_POKE_LIST} from '../../helpers/firebase';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {ADD_POKE, DELETE_POKE} from '../../helpers/admin';

const AdminPokeScreen = ({navigation}) => {
  const [word, setWord] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('bijak');
  const [selected, setSelected] = React.useState();
  const [poke, setPoke] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getPokeList();
  }, [isLoading]);

  async function getPokeList() {
    const list = await GET_POKE_LIST();

    if (list) {
      setPoke(list);
    }
  }

  const filter = [
    {
      key: 'bijak',
      title: '😃 Bijaksana',
    },
    {
      key: 'menuntut',
      title: '😔 Menuntut',
    },
    {
      key: 'santuy',
      title: '😄 Santuy',
    },
    {
      key: 'julid',
      title: '🤭 Julid',
    },
  ];

  async function onDeletePress(id) {
    setSelected();
    setIsLoading(true);
    console.log('id : ' + id);
    await DELETE_POKE(id)
      .then(() => {
        setIsLoading(false);
        Alert.alert('Sukses', 'Poke berhasil dihapus!');
      })
      .catch(() => {
        setIsLoading(false);
        'Gagal', 'Ada kesalahan mohon coba lagi';
      });
  }

  async function onAddPress() {
    setIsLoading(true);
    const data = {
      text: word,
      type: activeFilter,
    };

    await ADD_POKE(data)
      .then(() => {
        setWord('');
        setIsLoading(false);
        Alert.alert('Sukses', 'Poke berhasil ditambahkan');
      })
      .catch(() => {
        setWord('');
        setIsLoading(false);
        Alert.alert('Gagal', 'Ada kesalahan mohon coba lagi');
      });
  }

  function renderFilterList(item) {
    return (
      <Touchable
        style={
          activeFilter == item?.key ? styles.cardActive : styles.cardNormal
        }
        onPress={() => {
          setActiveFilter(item.key);
          setSelected();
        }}>
        <Text
          style={
            activeFilter == item?.key
              ? styles.textFilterActive
              : styles.textFilterNormal
          }>
          {item?.title}
        </Text>
      </Touchable>
    );
  }

  function renderPokeList(item, index) {
    function setEmo() {
      switch (item?.type) {
        case 'bijak':
          return '😃';
          break;
        case 'menuntut':
          return '😔';
          break;
        case 'santuy':
          return '😄';
          break;
        case 'julid':
          return '🤭';
          break;
        default:
          break;
      }
    }

    return (
      <Touchable
        style={{
          paddingVertical: 14,
          borderTopWidth: 0.25,
          borderBottomWidth: 0.25,
        }}
        onPress={() =>
          selected == index ? setSelected() : setSelected(index)
        }>
        <Row>
          <Text
            style={[
              selected == index
                ? styles.textFilterActive
                : styles.textFilterNormal,
              {flex: 1},
            ]}>
            {setEmo()} {item?.text}
          </Text>
          {selected == index && (
            <Touchable
              style={{
                backgroundColor: Colors.COLOR_LIGHT_GRAY,
                padding: 8,
                borderRadius: 18,
              }}
              onPress={() => onDeletePress(item?.id)}>
              <Icon name="delete" size={14} color={'red'} />
            </Touchable>
          )}
        </Row>
      </Touchable>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
      <Image
        source={IMAGES_RES.wave_background}
        style={{width: '100%', height: 100, marginBottom: 24}}
        resizeMode={'stretch'}
      />
      <View style={{padding: 24}}>
        <Text style={styles.textTitle}>Halo Admin</Text>
        <Input
          containerStyle={{marginVertical: 14}}
          placeholder={'Masukan kata kata'}
          onChangeText={text => setWord(text)}
          value={word}
        />
        <FlatList
          style={{flexGrow: 0}}
          contentContainerStyle={{paddingBottom: 14}}
          data={filter}
          renderItem={({item, index}) => renderFilterList(item)}
          horizontal
        />
        <Button
          isLoading={isLoading}
          buttonStyle={{marginBottom: 24}}
          disabled={!word}
          title="Tambah Poke"
          onPress={() => onAddPress()}
        />
        <Text style={styles.textTitle}>List Poke</Text>
        <FlatList
          contentContainerStyle={{paddingBottom: 60, marginTop: 24}}
          data={poke}
          renderItem={({item, index}) => renderPokeList(item, index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  cardNormal: {
    borderRadius: 14,
    marginHorizontal: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  cardActive: {
    borderWidth: 1,
    borderColor: Colors.COLOR_ACCENT,
    borderRadius: 14,
    marginHorizontal: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(237, 200, 255, 0.5)',
  },

  textTitle: {
    ...Typo.TextExtraLargeBold,
  },

  textFilterNormal: {
    ...Typo.TextNormalRegular,
  },

  textFilterActive: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_ACCENT,
  },
});

export default AdminPokeScreen;
