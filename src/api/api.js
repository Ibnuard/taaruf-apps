export async function sendNotification(token, type, multiple) {
  console.log('sending push notification to : ' + token);
  const getData = () => {
    switch (type) {
      case 'receivetaaruf':
        return {
          title: 'Anda menerima pengajuan CV taaruf',
          desc: 'Anda telah menerima pengajuan CV taaruf dari seseorang.',
        };
        break;
      case 'cvcanceled':
        return {
          title: 'Pengajuan CV taaruf dibatalkan oleh seseorang',
          desc: 'Seseorang telah membatalkan pengajuan CV taaruf kepada anda.',
        };
        break;
      case 'nadzorcanceled':
        return {
          title: 'Nadzor taaruf dibatalkan oleh seseorang',
          desc: 'Seseorang telah membatalkan nadzor taaruf kepada anda.',
        };
        break;
      case 'taarufaccepted':
        return {
          title: 'Pengajuan CV taaruf diterima',
          desc: 'Alhamdulillah pengajuan CV taaruf anda telah diterima.',
        };
        break;
      case 'taarufrejected':
        return {
          title: 'Pengajuan CV taaruf ditolak',
          desc: 'Maaf pengajuan CV taaruf anda telah ditolak.',
        };
        break;
      case 'favorited':
        return {
          title: 'CV anda telah difavoritkan',
          desc: 'Ada seseorang yang telah memfavoritkan CV anda.',
        };
        break;
      case 'upgradereject':
        return {
          title: 'Permintaan Upgrade Premium Ditolak',
          desc: 'Permintaan upgrade premium anda telah ditolak oleh admin',
        };
        break;
      case 'upgradeaccept':
        return {
          title: 'Permintaan Upgrade Premium Diterima',
          desc: 'Permintaan upgrade premium anda telah diterima oleh admin',
        };
        break;
      case 'adminregister':
        return {
          title: 'Ada pengguna baru',
          desc: 'Ada pengguna baru telah melakukan registrasi!',
        };
        break;
      case 'adminpremium':
        return {
          title: 'Ada pengajuan premium',
          desc: 'Ada pengguna telah mengajukan premium!',
        };
        break;
      case 'sendpoke':
        return {
          title: 'Anda menerima Poke',
          desc: 'Seseorang telah mengirimkan poke kepada anda!',
        };
        break;

      default:
        break;
    }
  };

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization:
        'key=AAAAlj3ZnYg:APA91bG9TLa1LC3PWM1xhWfk3uYsKsjWXk38sLv-oU_AbgbbHip2oVD4X9TvgNTYxTlPbisoHn9Xju03X5Hp4L9c4Pka5noeJyO88Gp-8usFwDVwdtp5wjRT66vjbto_853zZobIJerK',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      registration_ids: multiple ? token : [token],
      notification: {
        title: getData().title,
        body: getData().desc,
        image: '',
      },
      data: {},
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log('Sukses : ' + JSON.stringify(responseJson));
    })
    .catch(err => {
      console.log('Gagal : ' + err);
    });
}
