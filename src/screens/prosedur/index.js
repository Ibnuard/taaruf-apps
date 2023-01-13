import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GET_PROCEDUR} from '../../helpers/firebase';
import {Typo} from '../../styles';

const ProsedurScreen = () => {
  const [steps, setSteps] = React.useState([]);

  React.useLayoutEffect(() => {
    getProsedur();
  }, []);

  async function getProsedur() {
    const data = await GET_PROCEDUR();
    if (data) {
      setSteps(data);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        4 Langkah mencari pasangan sesuai syariat islam :{' '}
      </Text>
      <View style={{marginTop: 14}}>
        {steps.map((item, index) => {
          return (
            <Text style={styles.item}>
              {index + 1}. {item}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    ...Typo.TextLargeBold,
  },

  item: {
    ...Typo.TextNormalRegular,
    marginTop: 14,
  },
});

export default ProsedurScreen;
