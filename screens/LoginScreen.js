import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react';
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './loginstyles.js';

//Alert function for web and mobile
const showAlert = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    import('react-native').then(({ Alert }) => {
      Alert.alert(title, message);
    });
  }
};


//Main function
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const POST_URL = 'http://localhost:3000/api/auth/login';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Login Error', 'Please enter your Username/Email and Password');
      return;
    }

  try {
    const response = await axios.post(POST_URL, {
    email,
    password,
    });

    if (response.data.user) 
    {
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('token', response.data.token);
      if (response.data.user.status === 'active')
      { 
        alert('login Successful!');
        navigation.navigate('Klasscorp-Home');
      }
      else
      {
        alert('Account is not active! Please contact your admin!');
      }
    } 
    else 
    {
      alert('Login Failed', 'User data not received');
    }
  } catch (error) 
  {
    console.error('Login error:', error.response?.data || error.message);
    alert('Login Failed:\n' + error.response?.data?.msg || 'Something went wrong');
  }

};

  return (
    <View style={styles.main}>
      {Platform.OS === 'web' && (
        <View style={styles.blurback}></View>
      )}

      <Image
        source={
          Platform.OS === 'web'       // web and mobile image
            ? require('../assets/images/web_background.jpg')
            : require('../assets/images/mobile_background.jpg')
        }
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.container}>
        <Image
          source={require('../assets/icon/Klasscorp_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heading}> Login to Your Account </Text>

        <TextInput
          placeholder="Username or Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginbutton}> 
          <Text style={styles.login} onPress={handleLogin} >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
