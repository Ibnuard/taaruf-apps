import React from 'react';
import Main from './src';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
  return <Main />;
};

export default App;
