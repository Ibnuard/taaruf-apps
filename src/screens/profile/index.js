import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { Button, Card, Modal, Input, Row } from '../../components';
import Touchable from '../../components/touchable';
import { AuthContext } from '../../context';
import { IMAGES_RES } from '../../helpers/images';
import { Colors, Typo } from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.COLOR_STATUSBAR} />
            <Image
                source={IMAGES_RES.wave_background}
                style={{ width: '100%', height: 100 }}
                resizeMode={'stretch'} />
            <Card style={{ marginTop: -32, marginHorizontal: 14 }}>
                <Row>
                    <Image style={{ backgroundColor: 'red', height: 128, width: 92, borderRadius: 8 }} />
                    <View>
                        <Row style={{ paddingVertical: 14 }}>
                            <Icon name='idcard' size={20} />
                            <Text>Lorem ipsum lorem ipsum lorem ipsum</Text>
                        </Row>
                        <View style={{ height: .5, width: '100%', backgroundColor: Colors.COLOR_DARK_GRAY }} />
                    </View>
                </Row>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default ProfileScreen