import firestore from '@react-native-firebase/firestore';
import {CHECK_IS_VALID} from '../utils/moment';
import {generateUID} from '../utils/utils';
import {retrieveUserSession} from './storage';

//COLLECTIONS
const usersCollection = firestore().collection('Users');

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
  const path = usersCollection.doc(parsed?.nomorwa).collection('Favorites');

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
  const path = usersCollection.doc(parsed?.nomorwa).collection('Favorites');

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
  const path = usersCollection
    .doc(parsed?.nomorwa)
    .collection('Favorites')
    .doc(data?.nomorwa);

  const favorite = await path.get();

  const favDetail = favorite.data();

  if (favDetail) {
    console.log('ada');
  } else {
    console.log('ga ada');
  }
};

export {
  USER_REGISTER,
  CHECK_USER,
  USER_LOGIN,
  GET_USER_LIST,
  ADD_TO_FAVORITE,
  REMOVE_FROM_FAVORITE,
  IS_FAVORITED,
};
