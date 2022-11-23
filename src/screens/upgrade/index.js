import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Card} from '../../components';
import {Colors, Typo} from '../../styles';

const UpgradeScreen = ({navigation, route}) => {
  const STATUS = route?.params?.status;

  return (
    <View style={styles.container}>
      <Card style={{alignItems: 'center'}}>
        <Text style={styles.textAccNo}>72012341234</Text>
        <Image />
        <Text style={styles.textBankDesc}>BCA a/n Ibnu Putra</Text>
      </Card>
      <Text style={styles.textDesc}>
        Silahkan lakukan tranfer ke rekening berikut untuk dapat meningkatkan
        akun anda, sehingga anda dapat menggunakan semua fitur aplikasi ini.
      </Text>
      <View style={{marginTop: 24}}>
        <Button
          disabled={STATUS == 'pending'}
          title={STATUS == 'pending' ? 'Akun Sedang Ditinjau' : 'Sudah Tranfer'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  textAccNo: {
    ...Typo.TextLargeBold,
    color: Colors.COLOR_BLACK,
  },

  textBankDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY,
    marginTop: 4,
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_GRAY,
    marginTop: 8,
  },
});

export default UpgradeScreen;
