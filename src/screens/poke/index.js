import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Row} from '../../components';
import NoItemScreen from '../../components/NoItem';
import {GET_POKE_NOTIF} from '../../helpers/firebase';
import {Colors, Typo} from '../../styles';

const PokeScreen = ({navigation}) => {
  const [poke, setPoke] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPokeList();
    });

    return unsubscribe;
  }, []);

  async function getPokeList() {
    setIsLoading(true);
    const list = await GET_POKE_NOTIF();

    if (list) {
      setPoke(list);
    }
    setIsLoading(false);
  }

  function renderItem(item, index) {
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
      <View
        style={{
          borderBottomWidth: 0.5,
          paddingVertical: 14,
          paddingHorizontal: 8,
          borderBottomColor: Colors.COLOR_LIGHT_GRAY,
        }}>
        <Text style={styles.textSender}>{item?.senderId}</Text>
        <Text style={styles.textPokeTitle}>
          {setEmo()} {item?.text}
        </Text>
        <Row style={{alignItems: 'center', marginTop: 8}}>
          <Text style={styles.textTime}>{item?.timestamp}</Text>
        </Row>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {poke?.length ? (
        <FlatList
          contentContainerStyle={{paddingBottom: 60}}
          data={poke}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      ) : (
        <NoItemScreen isLoading={isLoading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  textPokeTitle: {
    ...Typo.TextNormalRegular,
  },

  textSender: {
    ...Typo.TextSmallBold,
    marginBottom: 2,
  },

  textTime: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_GRAY,
  },
});

export default PokeScreen;
