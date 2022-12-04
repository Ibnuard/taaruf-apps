import * as React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {Button, Card} from '../../components';
import Touchable from '../../components/touchable';
import {GET_POKE_LIST} from '../../helpers/firebase';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';

const SendPokeScreen = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [poke, setPoke] = React.useState();
  const [selected, setSelected] = React.useState();

  React.useLayoutEffect(() => {
    getPokeList();
  }, []);

  async function getPokeList() {
    const list = await GET_POKE_LIST();

    if (list) {
      setPoke(list);
    }
  }

  const filter = [
    {
      key: 'all',
      title: 'Semua',
    },
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
  ];

  function renderFilterList(item) {
    return (
      <Touchable
        style={
          activeFilter == item?.key ? styles.cardActive : styles.cardNormal
        }
        onPress={() => setActiveFilter(item.key)}>
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
        <Text
          style={
            selected == index
              ? styles.textFilterActive
              : styles.textFilterNormal
          }>
          {setEmo()} {item?.text}
        </Text>
      </Touchable>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES_RES.wave_background}
        style={{width: '100%', height: 100}}
        resizeMode={'stretch'}
      />
      <Card style={{flex: 1, marginTop: -24, paddingHorizontal: 20}}>
        <View
          style={{
            backgroundColor: 'rgba(237, 200, 255, 0.5)',
            paddingVertical: 4,
            paddingHorizontal: 12,
            borderRadius: 4,
          }}>
          <Text style={styles.textSisaPoke}>
            Sisa poke kamu saat ini adalah 32
          </Text>
        </View>
        <Text style={styles.textSubtitle}>Filter Pesan</Text>
        <FlatList
          style={{flexGrow: 0}}
          contentContainerStyle={{paddingBottom: 14}}
          data={filter}
          renderItem={({item, index}) => renderFilterList(item)}
          horizontal
        />
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={poke}
          renderItem={({item, index}) => renderPokeList(item, index)}
        />
        <Button disabled={selected == null} title="Kirim Poke" />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  textFilterNormal: {
    ...Typo.TextNormalRegular,
  },

  textFilterActive: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_ACCENT,
  },

  textSisaPoke: {
    ...Typo.TextMediumBold,
    color: Colors.COLOR_ACCENT,
  },

  textSubtitle: {
    ...Typo.TextMediumBold,
    marginVertical: 8,
  },
});

export default SendPokeScreen;
