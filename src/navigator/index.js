import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import LoginScreen from '../screens/login';
import SplashScreen from '../screens/splash';
import CreateCVScreen from '../screens/createcv';
import DetailCVScreen from '../screens/detailcv';
import DomisiliScreen from '../screens/domisli';
import DoneCVScreen from '../screens/donecv';

//create stack screen
const Stack = createNativeStackNavigator();

//create bottom tab
const Tab = createBottomTabNavigator();

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
          headerShown: false
        }} />
      <Stack.Screen
        name="CreateCV"
        component={CreateCVScreen}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="Domisili"
        component={DomisiliScreen}
        options={{
          title: 'Pilih Domisili'
        }} />
      <Stack.Screen
        name="DetailCV"
        component={DetailCVScreen}
        options={{
          title: 'Buat CV'
        }} />
      <Stack.Screen
        name="DoneCV"
        component={DoneCVScreen}
        options={{
          headerShown: false
        }} />
    </Stack.Navigator>
  );
};

//tab stack screen
export const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Stack.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen
        name="Pemberitahuan"
        component={ProfileScreen}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          headerShown: false
        }} />
    </Tab.Navigator>
  );
};
