import * as React from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screen
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import LoginScreen from '../screens/login';
import SplashScreen from '../screens/splash';
import CreateCVScreen from '../screens/createcv';
import DetailCVScreen from '../screens/detailcv';
import DomisiliScreen from '../screens/domisli';
import DoneCVScreen from '../screens/donecv';
import ProsesNotifScreen from '../screens/prosesnotif';
import {IMAGES_RES} from '../helpers/images';
import {Colors} from '../styles';
import KirimTaarufScreen from '../screens/kirimtaaruf';
import TerimaTaarufScreen from '../screens/terimataaruf';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import FavoriteScreen from '../screens/cvfavorit';
import UpgradeScreen from '../screens/upgrade';
import CVTerkirimScreen from '../screens/cvterkirim';
import FilterScreen from '../screens/filter';
import TaarufScreen from '../screens/taaruf';
import FavoritNotifScreen from '../screens/favoritnotif';
import SendPokeScreen from '../screens/sendpoke';
import PokeScreen from '../screens/poke';
import ForgotScreen from '../screens/forgot';

//create stack screen
const Stack = createNativeStackNavigator();

//create bottom tab
const Tab = createBottomTabNavigator();

//top bar
const TopBar = createMaterialTopTabNavigator();

//===================================
// ========== GAP ===================
// ==================================

export const SplashStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//auth stack screen
export const AuthStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{
          headerShown: true,
          title: 'Lupa Password',
        }}
      />
      <Stack.Screen
        name="CreateCV"
        component={CreateCVScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Domisili"
        component={DomisiliScreen}
        options={{
          title: 'Pilih Domisili',
        }}
      />
      <Stack.Screen
        name="DetailCV"
        component={DetailCVScreen}
        options={{
          title: 'Buat CV',
        }}
      />
      <Stack.Screen
        name="DoneCV"
        component={DoneCVScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//tab stack screen
export const MainScreen = () => {
  const _hideTabBar = route => {
    console.log('route : ' + route);
    if (route == 'Home') {
      return 'flex';
    } else if (route == 'Notif') {
      return 'flex';
    } else if (route == 'Profile') {
      return 'flex';
    } else {
      return 'none';
    }
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Notif') {
            iconName = 'inbox';
          } else {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.COLOR_ACCENT,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          title: 'Beranda',
          headerShown: false,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'HomeInit' || !routeName) {
              return {display: 'flex'};
            } else {
              return {display: 'none'};
            }
          })(route),
        })}
      />
      <Tab.Screen
        name="Notif"
        component={NotifBarStack}
        options={{
          title: 'Pemberitahuan',
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'left',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({route}) => ({
          title: 'Profile',
          headerShown: false,
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'ProfileInit' || !routeName) {
              return {display: 'flex'};
            } else {
              return {display: 'none'};
            }
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

const NotifBarStack = () => {
  return (
    <TopBar.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Colors.COLOR_WHITE,
          height: 4,
        },
        tabBarLabelStyle: {
          color: Colors.COLOR_WHITE,
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: Colors.COLOR_STATUSBAR,
        },
      }}>
      <Stack.Screen
        name="Process"
        component={ProsesNotifScreen}
        options={{
          title: 'Proses',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="General"
        component={FavoritNotifScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Poke"
        component={PokeScreen}
        options={{
          headerShown: false,
        }}
      />
    </TopBar.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeInit"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KirimTaaruf"
        component={KirimTaarufScreen}
        options={{
          title: 'Pengajuan Taaruf',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="CVTerkirim"
        component={CVTerkirimScreen}
        options={{
          title: 'CV Terkirim',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="Upgrade"
        component={UpgradeScreen}
        options={{
          title: 'Tingkatkan Akun',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: 'Favorit',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          title: 'Filter',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileScreen}
        options={{
          title: 'Detail Biodata',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="KirimPoke"
        component={SendPokeScreen}
        options={{
          title: 'Poke',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="TerimaTaaruf"
        component={TerimaTaarufScreen}
        options={{
          title: 'Menerima CV',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
      <Stack.Screen
        name="Taaruf"
        component={TaarufScreen}
        options={{
          title: 'Memulai Taaruf',
          headerTitleStyle: {
            color: Colors.COLOR_WHITE,
          },
          headerStyle: {
            backgroundColor: Colors.COLOR_STATUSBAR,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileInit"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Domisili"
        component={DomisiliScreen}
        options={{
          title: 'Pilih Domisili',
        }}
      />
      <Stack.Screen
        name="EditCV"
        component={DetailCVScreen}
        options={{
          title: 'Edit CV',
        }}
      />
    </Stack.Navigator>
  );
};
