import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typo} from '../styles';
import Card from './card';

const NotificationCard = data => {
  const DATA = data?.data;
  const generateData = () => {
    switch (DATA?.type) {
      case 'send':
        return {
          title: `Pengajuan CV Terkirim ke ${DATA?.senderId}`,
          desc: 'Bersabar dan berdoa menunggu respon yang berangkutan.',
        };
        break;
      case 'cancel':
        return {
          title: `Pengajuan CV dibatalkan ke ${DATA?.senderId}`,
          desc: 'Pengajuan CV Taaruf telah dibatalkan',
        };
        break;
      case 'canceled':
        return {
          title: `${DATA?.senderId} Membatalkan Pengajuan CV Taaruf`,
          desc: 'Pengajuan CV Taaruf telah dibatalkan',
        };
        break;
      case 'receive':
        return {
          title: `${DATA?.senderId} Mengajukan Taaruf ke Anda`,
          desc: 'Silahkan cek menu Menerima Taaruf untuk melihat detail',
        };
        break;

      default:
        return {
          title: `...`,
          desc: '...',
        };
        break;
    }
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.textTitle}>{generateData().title}</Text>
      <Text style={styles.textDesc}>{generateData().desc}</Text>
      <Text style={styles.textTime}>{DATA?.timestamp}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  textTitle: {
    ...Typo.TextMediumBold,
    fontWeight: 'bold',
  },

  textDesc: {
    ...Typo.TextNormalRegular,
    color: Colors.COLOR_DARK_GRAY,
    marginTop: 2,
    marginBottom: 4,
  },

  textTime: {
    ...Typo.TextSmallRegular,
    color: Colors.COLOR_DARK_GRAY,
  },
});

export default NotificationCard;
