import * as React from 'react';
import { View, Text } from 'react-native';
import Card from '../../../card';
import styles from './styles';
import Touchable from '../../../touchable';
import Button from '../../../button';

const ModalPopUpThreeButton = ({ onButtonPress, onOptionButtonPress }) => {
  return (
    <Card style={styles.container}>
      <Button buttonStyle={{ marginBottom: 16 }} title={'Pilih Dari galeri'} onPress={() => onOptionButtonPress('first')} />
      <Button invert title='Ambil dari camera' onPress={() => onOptionButtonPress('second')} />
      <Touchable
        style={styles.buttonOk}
        onPress={onButtonPress ? onButtonPress : null}>
        <Text style={styles.textButton}>Batal</Text>
      </Touchable>
    </Card>
  );
};

export default ModalPopUpThreeButton;
