import * as React from 'react'
import { TextInput, Text, View, Image } from 'react-native'
import Touchable from '../touchable'
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../styles';
import Row from '../row';


const Input = (props) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false)
    const [isFocus, setIsFocus] = React.useState(false)
    return (
        <View style={[props.containerStyle, { width: '100%' }]}>
            {props?.caption && <Text style={[props.captionStyle, styles.textCaption]}>{props?.caption ?? 'Caption'}</Text>}
            <View style={[isFocus ? styles.containerFocus : styles.container]}>
                <TextInput
                    {...props}
                    secureTextEntry={!isShowPassword && props.type == 'password'}
                    style={styles.input}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)} />
                {props?.showEye && <Touchable style={styles.eyeButton} onPress={() => setIsShowPassword(!isShowPassword)}>
                    <Icon name={isShowPassword ? 'eye' : 'eyeo'} size={20} color={Colors.COLOR_GRAY} />
                </Touchable>}
            </View>
        </View>

    )
}

export default Input