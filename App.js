import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
//import { Platform } from 'react-native';
import Assessments from './screens/Assessment.js';
import EditProjectScreen from './screens/EditProjectScreen.js';
import FormFillScreen from './screens/FormFillScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ViewProjectScreen from './screens/ViewProjectScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';

const Stack = createNativeStackNavigator();
//let linking

//manual linking the screens for website back and front
/*
Platform.OS === 'web'? (
 linking = {
  prefixes: [typeof window !== 'undefined' ? window.location.origin : ''],
  config: {
    screens: {
      Klasscorp: '',
      Login: 'login',
      Home: 'home',
    },
  },
}) : linking = undefined;   // for mobile linking is not required */

//Main function
export default function App() {
  useEffect(() => {
  async function prepare() {
    await SplashScreen.preventAutoHideAsync();
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }
  prepare();
}, []);


 //manual navigation
  return (
    <NavigationContainer /*linking={linking}*/>
      <Stack.Navigator initialRouteName="Klasscorp-Home">
        <Stack.Screen name="Klasscorp" component={WelcomeScreen}  />
        <Stack.Screen name="Klasscorp-Login" component={LoginScreen}  />
        <Stack.Screen name="Klasscorp-Home" component={HomeScreen}  />
        <Stack.Screen name="ViewProject" component={ViewProjectScreen} />
        <Stack.Screen name="EditProject" component={EditProjectScreen} />
        <Stack.Screen name="Project-Assessments" component={Assessments} />
        <Stack.Screen name="Assessment-Form" component={FormFillScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
