import * as React from 'react';
import {View, Image} from 'react-native';
import {AuthContext} from '../../context';
import {retrieveUserSession} from '../../helpers/storage';
import {retrieveData, storeData} from '../../utils/store';
import {wait} from '../../utils/utils';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
import {IMAGES_RES} from '../../helpers/images';
import {UPDATE_LAST_ONLINE} from '../../helpers/firebase';

const SplashScreen = () => {
  const {restoreToken, admin} = React.useContext(AuthContext);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      const token = await messaging().getToken();
      await storeData('fcmToken', token, false);

      try {
        userToken = await retrieveUserSession();
        await UPDATE_LAST_ONLINE();
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away

      // const parseToken = JSON.parse(userToken);

      // admin();

      // if (parseToken.token == 'ADMIN') {
      //   admin();
      // } else {
      //   restoreToken(userToken);
      // }
      const isAdmin = await retrieveData('isAdmin', false);

      if (isAdmin) {
        return admin(token);
      }

      restoreToken(userToken);
    };
    wait(2500).then(() => bootstrapAsync());
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES_RES.logo}
        style={{width: 100, height: 100}}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default SplashScreen;
