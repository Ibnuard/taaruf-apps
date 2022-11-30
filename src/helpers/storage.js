import EncryptedStorage from 'react-native-encrypted-storage';

async function storeUserSession(data) {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.log('erro store user session');
  }
}

async function retrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== undefined) {
      // Congrats! You've just retrieved your first value!
      return session;
    }
  } catch (error) {
    // There was an error on the native side
    console.log('error retrive user session');
  }
}

async function updateUserSession(data) {
  try {
    const session = await EncryptedStorage.getItem('user_session');

    if (session !== undefined) {
      const parsedJSON = JSON.parse(session);
      const update = {...parsedJSON, ...data};

      return await storeUserSession(update);
    }
  } catch (error) {
    // There was an error on the native side
    console.log('error update user session');
  }
}

async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem('user_session');
    // Congrats! You've just removed your first value!
  } catch (error) {
    // There was an error on the native side
    console.log('failed to logout');
  }
}

export {
  storeUserSession,
  retrieveUserSession,
  removeUserSession,
  updateUserSession,
};
