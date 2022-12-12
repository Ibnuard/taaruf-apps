import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
const adminCollection = firestore().collection('ADMIN');
const pokeCollection = firestore().collection('Poke');

export const ADMIN_USER_LIST = async () => {
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

export const ADMIN_USER_PREMIUM = async () => {
  return await adminCollection
    .doc('PREMIUM')
    .collection('Users')
    .where('premiumStatus', '==', 'pending')
    .get()
    .then(snapshot => {
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

export const GET_ADMIN_NUMBER = async () => {
  const data = await adminCollection.doc('DATA').get();
  const adminData = data.data();

  if (adminData) {
    return adminData?.wa;
  }
};

export const SAVE_ADMIN_NUMBER = async data => {
  return await adminCollection.doc('DATA').update(data);
};

export const ADD_POKE = async data => {
  return await pokeCollection.add(data);
};

export const DELETE_POKE = async id => {
  return await pokeCollection.doc(id).delete();
};

export const ADMIN_UPGRADE_PREMIUM = async id => {
  return await usersCollection
    .doc(id)
    .update({
      premium: true,
    })
    .then(() => {
      return _updateStatus();
    });

  async function _updateStatus() {
    return await adminCollection
      .doc('PREMIUM')
      .collection('Users')
      .doc(id)
      .update({
        premiumStatus: 'success',
      });
  }
};

export const ADMIN_REJECT_PREMIUM = async id => {
  return await adminCollection
    .doc('PREMIUM')
    .collection('Users')
    .doc(id)
    .update({
      premiumStatus: 'reject',
    });
};

export const GET_BANNER = async () => {
  const pd = await adminCollection.doc('BANNERS').get();
  const data = pd.data();

  return data?.banners ?? [];
};

export const UPDATE_BANNER = async banners => {
  return await adminCollection.doc('BANNERS').update({banners: banners});
};

export const UPDATE_PROCEDUR = async data => {
  return await adminCollection.doc('PROSEDUR').update({steps: data});
};
