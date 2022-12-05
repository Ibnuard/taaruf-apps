import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

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
