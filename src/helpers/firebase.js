import firestore from '@react-native-firebase/firestore';

//COLLECTIONS
const usersCollection = firestore().collection('Users');

//QUERY

//ADD USER
const USER_REGISTER = data => {
  return usersCollection.doc(data.phone).set(data);
};

export {USER_REGISTER};
