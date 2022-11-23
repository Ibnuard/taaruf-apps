import * as React from 'react';
import {View, Text} from 'react-native';
import Touchable from '../touchable';
import styles from './styles';

const Card = ({children, style, useShadow = true, onPress}) => {
  return onPress ? (
    <Touchable
      onPress={onPress}
      style={[style, useShadow ? styles.container : styles.containerNoShadow]}>
      {children}
    </Touchable>
  ) : (
    <View
      style={[style, useShadow ? styles.container : styles.containerNoShadow]}>
      {children}
    </View>
  );
};

export default Card;
