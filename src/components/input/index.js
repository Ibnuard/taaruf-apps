import * as React from 'react';
import {TextInput, Text, View, Image} from 'react-native';
import Touchable from '../touchable';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../styles';

const Input = props => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <View style={[props.containerStyle, {width: '100%'}]}>
      {props?.caption && (
        <Text style={[props.captionStyle, styles.textCaption]}>
          {props?.caption ?? 'Caption'}
        </Text>
      )}
      <View style={[isFocus ? styles.containerFocus : styles.container]}>
        <TextInput
          {...props}
          secureTextEntry={!isShowPassword && props.type == 'password'}
          placeholderTextColor={Colors.COLOR_GRAY}
          style={[props?.inputStyle, styles.input]}
          onFocus={() => {
            setIsFocus(true);
            props?.onFocus ? props?.onFocus() : null;
          }}
          onBlur={() => {
            setIsFocus(false);
            props?.onBlur ? props?.onBlur() : null;
          }}
        />
        {props?.showEye && (
          <Touchable
            style={styles.eyeButton}
            onPress={() => setIsShowPassword(!isShowPassword)}>
            <Icon
              name={isShowPassword ? 'eye' : 'eyeo'}
              size={20}
              color={Colors.COLOR_GRAY}
            />
          </Touchable>
        )}
        {props.showClearButton ? (
          <Touchable onPress={() => props?.onClear()}>
            <Icon name="closecircleo" size={18} color={Colors.COLOR_GRAY} />
          </Touchable>
        ) : null}
      </View>
      {props?.errorMessage && (
        <Text style={styles.textErrorMessage}>
          {props?.errorMessage ?? 'Error message'}
        </Text>
      )}
    </View>
  );
};

export default Input;
