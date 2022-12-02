import firestore from '@react-native-firebase/firestore';
import {CHECK_IS_VALID, GET_CURRENT_DATE} from '../utils/moment';
import {generateMonthData, generateUID} from '../utils/utils';
import {retrieveUserSession} from './storage';

//COLLECTIONS
const usersCollection = firestore().collection('Users');
const taarufCollection = firestore().collection('Taaruf');

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
      .set(taarufDateData);
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

  const _removeUserTaaruf = async () => {
    console.log('save taaruf data');

    return taarufCollection
      .doc(parsed?.nomorwa)
      .collection('LIST')
      .doc(data?.nomorwa)
      .delete();
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
  GET_SENDED_CV,
  GET_FAVORITED_CV,
  GET_RECEIVED_CV,
  GET_CV_COUNT_BY_MONTH,
};
