import * as React from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {Button} from '../../components';
import {AuthContext} from '../../context';
import {IMAGES_RES} from '../../helpers/images';
import {Colors, Typo} from '../../styles';

const AdminHomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
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
        <Button
          buttonStyle={{marginVertical: 14}}
          title="Semua User"
          onPress={() => navigation.navigate('AdminUsers')}
        />
        <Button
          buttonStyle={{marginVertical: 14}}
          title="Edit nomor admin taaruf"
        />
        <Button buttonStyle={{marginVertical: 14}} title="Permintaan Premium" />
        <Button buttonStyle={{marginVertical: 14}} title="Poke" />
        <Button
          onPress={() => signOut()}
          invert
          buttonStyle={{marginVertical: 14}}
          title="Keluar"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textTitle: {
    ...Typo.TextExtraLargeBold,
  },
});

export default AdminHomeScreen;
