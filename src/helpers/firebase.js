import firestore from '@react-native-firebase/firestore';
import {CHECK_IS_VALID, GET_CURRENT_DATE} from '../utils/moment';
import {generateMonthData, generateUID, getRandomNumber} from '../utils/utils';
import {retrieveUserSession} from './storage';

//COLLECTIONS
const usersCollection = firestore().collection('Users');
const taarufCollection = firestore().collection('Taaruf');
const ticketCollection = firestore().collection('Ticket');

//QUERY

//ADD USER
const USER_REGISTER = data => {
  const user = {
    id: generateUID(),
    gender: data.gender ?? 'kosong',
    nama: data?.nama ?? 'kosong',
    ttl: data?.ttl ?? 'kosong',
    umur: CHECK_IS_VALID(data?.ttl) ?? 'kosong',
    kota: data?.kota ?? 'kosong',
    orangtuadom: data?.orangtuadom ?? 'kosong',
    alamatdom: data?.alamatdom ?? 'kosong',
    nomorwa: data?.nomorwa ?? 'kosong',
    email: data?.email ?? 'kosong',
    password: data?.password ?? 'kosong',
    fotowajah: data?.fotoWajah ?? 'kosong',
    fotofull: data?.fotoFull ?? 'kosong',
    fotoid: data?.fotoid ?? 'kosong',
    pekerjaan: data?.pekerjaan ?? 'kosong',
    pendidikanTerakhir: data?.pendidikanTerakhir ?? 'kosong',
    riwayatPendidikan: data?.riwayatPendidikan ?? 'kosong',
    status: data?.status ?? 'kosong',
    tinggi: data?.tinggi ?? 'kosong',
    berat: data?.berat ?? 'kosong',
    ibadah: data?.ibadah ?? 'kosong',
    kriteria: data?.kriteria ?? 'kosong',
    deskripsi: data?.deskripsi ?? 'kosong',
    hobi: data?.hobi ?? 'kosong',
    anak: data?.anak ?? 'kosong',
    suku: data?.suku ?? 'kosong',
    kulit: data?.kulit ?? 'kosong',
    penyakit: data?.penyakit ?? 'kosong',
    organisasi: data?.organisasi ?? 'kosong',
    kelebihan: data?.kelebihan ?? 'kosong',
    kekurangan: data?.kekurangan ?? 'kosong',
    aktivitas: data?.aktivitas ?? 'kosong',
    visimisi: data?.visimisi ?? 'kosong',
    pertanyaansatu: data?.pertanyaansatu ?? 'kosong',
    pertanyaandua: data?.pertanyaandua ?? 'kosong',
    pertanyaantiga: data?.pertanyaantiga ?? 'kosong',
    premium: false,
    favoritCount: 0,
  };
  return usersCollection.doc(data.nomorwa).set(user);
};

const USER_UPDATE = (id, data) => {
  const user = {
    id: generateUID(),
    gender: data.gender ?? 'kosong',
    nama: data?.nama ?? 'kosong',
    ttl: data?.ttl ?? 'kosong',
    umur: CHECK_IS_VALID(data?.ttl) ?? 'kosong',
    kota: data?.kota ?? 'kosong',
    orangtuadom: data?.orangtuadom ?? 'kosong',
    alamatdom: data?.alamatdom ?? 'kosong',
    nomorwa: data?.nomorwa ?? 'kosong',
    email: data?.email ?? 'kosong',
    password: data?.password ?? 'kosong',
    fotowajah: data?.fotoWajah ?? 'kosong',
    fotofull: data?.fotoFull ?? 'kosong',
    fotoid: data?.fotoid ?? 'kosong',
    pekerjaan: data?.pekerjaan ?? 'kosong',
    pendidikanTerakhir: data?.pendidikanTerakhir ?? 'kosong',
    riwayatPendidikan: data?.riwayatPendidikan ?? 'kosong',
    status: data?.status ?? 'kosong',
    tinggi: data?.tinggi ?? 'kosong',
    berat: data?.berat ?? 'kosong',
    ibadah: data?.ibadah ?? 'kosong',
    kriteria: data?.kriteria ?? 'kosong',
    deskripsi: data?.deskripsi ?? 'kosong',
    hobi: data?.hobi ?? 'kosong',
    anak: data?.anak ?? 'kosong',
    suku: data?.suku ?? 'kosong',
    kulit: data?.kulit ?? 'kosong',
    penyakit: data?.penyakit ?? 'kosong',
    organisasi: data?.organisasi ?? 'kosong',
    kelebihan: data?.kelebihan ?? 'kosong',
    kekurangan: data?.kekurangan ?? 'kosong',
    aktivitas: data?.aktivitas ?? 'kosong',
    visimisi: data?.visimisi ?? 'kosong',
    pertanyaansatu: data?.pertanyaansatu ?? 'kosong',
    pertanyaandua: data?.pertanyaandua ?? 'kosong',
    pertanyaantiga: data?.pertanyaantiga ?? 'kosong',
    premium: false,
    favoritCount: 0,
  };

  return usersCollection?.doc(id).update(user);
};

//CHECK IF USER EXIST
const CHECK_USER = phone => {
  return usersCollection
    .doc(phone)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        return true;
      } else {
        return false;
      }
    });
};

//USER LOGIN
const USER_LOGIN = async data => {
  const isUser = await CHECK_USER(data?.nomor);

  if (!isUser) {
    return 'NOT_USER';
  } else {
    const userData = await usersCollection.doc(data?.nomor).get();
    const user = userData.data();

    if (user?.password == data.password) {
      return user;
    } else {
      return 'PASSWORD_INVALID';
    }
  }
};

//USER PREMIUM
const USER_IS_PREMIUM = async () => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  const userData = await usersCollection.doc(parsed?.nomorwa).get();
  const userPremium = userData.data();

  return userPremium?.premium;
};

// ===================================
//
//
// ============= TAARUF ==============
//
// ===================================

const GET_USER_LIST = async () => {
  return await usersCollection.get().then(snapshot => {
    if (snapshot.size > 0) {
      console.log('ADA');
      let temp = [];

      snapshot.forEach(doc => {
        temp.push({id: doc.id, ...doc.data()});
      });

      return temp;
    } else {
      console.log('NO');
      return [];
    }
  });
};

const ADD_TO_FAVORITE = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);
  const path = usersCollection.doc(parsed?.nomorwa).collection('Favs');

  return firestore()
    .runTransaction(async transaction => {
      const userRef = usersCollection.doc(data?.nomorwa);
      // Get post data first
      const userSnapshot = await transaction.get(userRef);
      if (!userSnapshot.exists) {
        throw 'Post does not exist!';
      }
      transaction.update(userRef, {
        favoritCount: userSnapshot.data().favoritCount + 1,
      });
    })
    .then(() => {
      console.log(data?.nomorwa);
      return _addFavtoUser();
    })
    .catch(err => console.log('add count failed : ' + err));

  async function _addFavtoUser() {
    console.log('add own fav');
    return path.doc(data?.nomorwa).set(data);
  }
};

const REMOVE_FROM_FAVORITE = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);
  const path = usersCollection.doc(parsed?.nomorwa).collection('Favs');

  return firestore()
    .runTransaction(async transaction => {
      const userRef = usersCollection.doc(data?.nomorwa);
      // Get post data first
      const userSnapshot = await transaction.get(userRef);
      if (!userSnapshot.exists) {
        throw 'Post does not exist!';
      }
      transaction.update(userRef, {
        favoritCount: userSnapshot.data().favoritCount - 1,
      });
    })
    .then(() => {
      console.log(data?.nomorwa);
      return _removeFavfromUser();
    })
    .catch(err => console.log('add count failed : ' + err));

  async function _removeFavfromUser() {
    console.log('remove own fav');
    return path.doc(data?.nomorwa).delete();
  }
};

const IS_FAVORITED = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);
  const favData = await usersCollection
    .doc(parsed?.nomorwa)
    .collection('Favs')
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        let temp = [];

        snapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });

        return temp;
      } else {
        return [];
      }
    });

  if (favData.length > 0) {
    console.log('fav data exist');
    const selectedFav = favData.filter((item, index) => {
      return item?.nomorwa == data?.nomorwa;
    });

    return selectedFav?.length > 0 ? true : false;
  } else {
    return false;
  }
};

// ==========
// ==========
//SEND TAARUF

const SEND_TAARUF = async (data, answers) => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  const _addUserTaaruf = async () => {
    console.log('save taaruf data');
    const monthId = generateMonthData();

    const taarufDateData = {
      monthId: monthId,
      ...data,
    };

    return taarufCollection
      .doc(parsed?.nomorwa)
      .collection('LIST')
      .doc(data?.nomorwa)
      .set(taarufDateData)
      .then(() => {
        return createNotification();
      });

    async function createNotification() {
      console.log('creating notification');

      async function _notifSelf() {
        console.log('notif self');
        return await CREATE_NOTIFICATION(data?.id, 'send');
      }

      async function _notifOther() {
        console.log('notif other');
        return await CREATE_NOTIFICATION(parsed?.id, 'receive', data?.nomorwa);
      }

      return Promise.all([_notifSelf(), _notifOther()]);
    }
  };

  const taarufData = {
    answer: answers,
    ...parsed,
  };

  return usersCollection
    .doc(data?.nomorwa)
    .collection('Taaruf')
    .doc(parsed.nomorwa)
    .set(taarufData)
    .then(() => {
      console.log('received taaruf');
      return _addUserTaaruf();
    });
};

//CANCEL TAARUF
const CANCEL_TAARUF = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  async function _updateNotification() {
    console.log('updating notification');

    async function _updateNotifSelf() {
      return await UPDATE_NOTIFICATION(
        data?.id,
        'send',
        parsed?.nomorwa,
        'cancel',
      );
    }

    async function _updateNotifOther() {
      return await UPDATE_NOTIFICATION(
        parsed?.id,
        'receive',
        data?.nomorwa,
        'canceled',
      );
    }

    return Promise.all([_updateNotifSelf(), _updateNotifOther()]);
  }

  const _removeUserTaaruf = async () => {
    console.log('save taaruf data');

    return taarufCollection
      .doc(parsed?.nomorwa)
      .collection('LIST')
      .doc(data?.nomorwa)
      .delete()
      .then(() => {
        return _updateNotification();
      });
  };

  return usersCollection
    .doc(data?.nomorwa)
    .collection('Taaruf')
    .doc(parsed.nomorwa)
    .delete()
    .then(() => {
      return _removeUserTaaruf();
    });
};

//CHECK IF TAARUFED
const CHECK_IS_TAARUFED = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await taarufCollection
    .doc(parsed.nomorwa)
    .collection('LIST')
    .doc(data?.nomorwa)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        return true;
      } else {
        return false;
      }
    });
};

//CHECK IF OTHER SEND REQUEST
const CHECK_IS_MATCH = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await usersCollection
    .doc(parsed.nomorwa)
    .collection('Taaruf')
    .doc(data?.nomorwa)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        return true;
      } else {
        return false;
      }
    });
};

//CHECK IS ACCEPTED
const CHECK_TAARUF_STATUS = async id => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await taarufCollection
    .doc(parsed.nomorwa)
    .collection('LIST')
    .doc(id)
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();

        if (data.taaruf) {
          return 'ACCEPTED';
        } else if (data.rejected) {
          return 'REJECTED';
        } else {
          return 'IDLE';
        }
      } else {
        return 'NO TAARUFED';
      }
    });

  // return await usersCollection
  //   .doc(parsed.nomorwa)
  //   .collection('Taaruf')
  //   .doc(id)
  //   .get()
  //   .then(snapshot => {
  //     if (snapshot.exists) {
  //       const data = snapshot.data();

  //       if (data.taaruf) {
  //         return 'ACCEPTED';
  //       } else if (data.rejected) {
  //         return 'REJECTED';
  //       } else {
  //         return 'IDLE';
  //       }
  //     } else {
  //       return 'NO TAARUFED';
  //     }
  //   });
};

//GET SENDED CV
const GET_SENDED_CV = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await taarufCollection
    .doc(parsed.nomorwa)
    .collection('LIST')
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        let temp = [];

        snapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });

        return temp;
      } else {
        return [];
      }
    });
};

//GET FAVORITED CV
const GET_FAVORITED_CV = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await usersCollection
    .doc(parsed.nomorwa)
    .collection('Favs')
    .get()
    .then(snapshot => {
      console.log('fav count : ' + snapshot.size);
      if (snapshot.size > 0) {
        let temp = [];

        snapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });

        return temp;
      } else {
        return [];
      }
    });
};

//GET TERIMA CV
const GET_RECEIVED_CV = async data => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await usersCollection
    .doc(parsed.nomorwa)
    .collection('Taaruf')
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        let temp = [];

        snapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });

        return temp;
      } else {
        return [];
      }
    });
};

//GET SEND CV CHANCE
const GET_CV_COUNT_BY_MONTH = async () => {
  const monthId = generateMonthData();

  const sendedCVList = await GET_SENDED_CV();

  if (sendedCVList.length) {
    const filtered = sendedCVList.filter((item, index) => {
      return item?.monthId == monthId;
    });

    if (filtered.length < 5) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

//ACCEPT TAARUF
const ACCEPT_TAARUF = async id => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await usersCollection
    .doc(parsed.nomorwa)
    .collection('Taaruf')
    .doc(id)
    .update({
      taaruf: true,
    })
    .then(() => {
      return _updateStatusOther();
    });

  async function _updateStatusOther() {
    console.log('updating other...');
    return await taarufCollection
      .doc(id)
      .collection('LIST')
      .doc(parsed?.nomorwa)
      .update({
        taaruf: true,
      });
  }
};

//TOLAK TAARUF
const REJECT_TAARUF = async id => {
  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await usersCollection
    .doc(parsed.nomorwa)
    .collection('Taaruf')
    .doc(id)
    .update({
      rejected: true,
    })
    .then(() => {
      return _updateStatusOther();
    });

  async function _updateStatusOther() {
    console.log('updating other...');
    return await taarufCollection
      .doc(id)
      .collection('LIST')
      .doc(parsed?.nomorwa)
      .update({
        rejected: true,
      });
  }
};

//GET SEND CV CHANCE
const GET_ACCEPT_TAARUF_COUNT = async () => {
  const receivedCVList = await GET_RECEIVED_CV();

  const isPremium = await USER_IS_PREMIUM();

  if (isPremium) {
    console.log('user premium');
    return true;
  } else {
    if (receivedCVList.length) {
      const filtered = receivedCVList.filter((item, index) => {
        return item?.taaruf == true;
      });

      if (filtered.length < 5) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
};

// ====================================
//
//
//
//
// ============ NOTIFICATION GAP /==================
//
//
//
//
//
// ===================================

const CREATE_NOTIFICATION = async (id, type, senderId) => {
  // Terkirim -> 'sended'
  // Dibaca -> 'read'
  // Mengajukan -> 'receive'
  // Ditolak -> 'reject'
  // Diterima -> 'accept'
  // Favorite -> 'favorite'

  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  const notificationId = `NOTIF${getRandomNumber(1000, 9999)}`;

  const timestamp = GET_CURRENT_DATE('LLL');

  return await usersCollection
    .doc(senderId?.length ? senderId : parsed?.nomorwa)
    .collection('Notification')
    .doc(notificationId)
    .set({
      id: notificationId,
      type: type,
      senderId: id,
      timestamp: timestamp,
    })
    .then(() => {
      return notificationId;
    });
};

const UPDATE_NOTIFICATION = async (senderId, type, target, typeTarget) => {
  const list = await GET_NOTIFICATION(target);
  const timestamp = GET_CURRENT_DATE('LLL');

  const filtered = list?.filter((item, index) => {
    return item.senderId == senderId && item.type == type;
  });

  const dataId = filtered[0]?.id;

  console.log(target, list);

  return await usersCollection
    .doc(target)
    .collection('Notification')
    .doc(dataId)
    .update({
      type: typeTarget,
      timestamp: timestamp,
    });
};

const GET_NOTIFICATION = async id => {
  console.log('target : ' + id);

  const user = await retrieveUserSession();
  const parsed = JSON.parse(user);

  return await usersCollection
    .doc(id?.length ? id : parsed?.nomorwa)
    .collection('Notification')
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        let temp = [];

        snapshot.forEach(doc => {
          temp.push({id: doc.id, ...doc.data()});
        });

        return temp;
      } else {
        return [];
      }
    });
};

export {
  USER_REGISTER,
  USER_UPDATE,
  USER_IS_PREMIUM,
  CHECK_USER,
  USER_LOGIN,
  GET_USER_LIST,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  IS_FAVORITED,
  SEND_TAARUF,
  CANCEL_TAARUF,
  CHECK_IS_TAARUFED,
  CHECK_IS_MATCH,
  GET_SENDED_CV,
  GET_FAVORITED_CV,
  GET_RECEIVED_CV,
  GET_CV_COUNT_BY_MONTH,
  ACCEPT_TAARUF,
  GET_ACCEPT_TAARUF_COUNT,
  REJECT_TAARUF,
  CHECK_TAARUF_STATUS,
  CREATE_NOTIFICATION,
  GET_NOTIFICATION,
  UPDATE_NOTIFICATION,
};
