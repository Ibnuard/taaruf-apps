import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typo} from '../styles';
import Card from './card';

const NotificationCard = ({data, onPress}) => {
  const DATA = data;
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
      case 'read':
        return {
          title: `${DATA?.senderId} Telah Membaca CV Taaruf Anda`,
          desc: 'Alhamdulillah CV anda telah dibaca.',
        };
        break;
      case 'accept':
        return {
          title: `${DATA?.senderId} Telah Menerima CV Taaruf Anda`,
          desc: 'Alhamdulillah CV anda telah diterima. Silahkan cek di bagian CV Terkirim untuk melanjutkan proses taaruf.',
        };
        break;
      case 'reject':
        return {
          title: `${DATA?.senderId} Telah Menolak CV Taaruf Anda`,
          desc: DATA?.opt
            ? `Alasan menolak : ${DATA?.opt}`
            : 'Mohon bersabar, mungkin belum jodohnya.',
        };
        break;
      case 'favorite':
        return {
          title: `${DATA?.senderId} Telah Memfavoritkan Anda`,
          desc: 'Anda telah di favoritkan.',
        };
        break;
      case 'fail':
        return {
          title: `Nadzor dengan ${DATA?.senderId} telah berhasil dibatalkan`,
          desc: 'Nadzor Taaruf telah dibatalkan',
        };
        break;
      case 'failed':
        return {
          title: `${DATA?.senderId} telah membatalkan nadzor`,
          desc: DATA?.opt
            ? `Nadzor telah dibatalkan dengan alasan ${DATA?.opt}`
            : 'Nadzor telah dibatalkan',
        };
        break;

      default:
        return {
          title: `... ${DATA?.type}`,
          desc: '...',
        };
        break;
    }
  };

  return (
    <Card style={styles.container} onPress={onPress}>
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
