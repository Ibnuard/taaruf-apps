import * as React from 'react'
import { View } from 'react-native'
import styles from './styles'

const Row = ({ children, style }) => {
    return (
        <View style={[style, styles.container]}>
            {children}
        </View>
    )
}

export default Row