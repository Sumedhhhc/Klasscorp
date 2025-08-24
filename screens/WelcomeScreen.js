import { useLayoutEffect } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from './welcomestyle.js';

//Main function
export default function HomeScreen({ navigation }) {

  useLayoutEffect(() => {
  navigation.setOptions({
      headerShown: false,
    });
  }, 
  [navigation]);

  return (  
  <View style={styles.main}>
     <Image 
      source={Platform.OS === 'web'   // web and mobile image
    ? require('../assets/images/web_background.jpg') 
    : require('../assets/images/mobile_background.jpg')}
        style={styles.background}
        resizeMode="cover" />
    <View style={styles.container}>
    <View style={styles.topbar}>
       <Text style={styles.company_name}>KLASSCORP</Text>
       <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('Klasscorp-Login')} >
           <Text style={styles.login}               //takes to login screen
           >Login</Text> 
       </TouchableOpacity>
    </View>
     <Text style={styles.head1}>Harness the Power of Wind and Sun</Text>
     <Text style={styles.head2}>Innovating for a Greener Tomorrow</Text>
    </View>
    {Platform.OS === 'web' && (
    <View style={styles.bottombar}>
      <View style={styles.company_info}>
  <View style={styles.infoBox}>
    <Text style={styles.infotexts}>
      <Text style={styles.highlight}>50+</Text><br/>
      <Text style={styles.label}>Projects</Text>
    </Text>
  </View>
  <View style={styles.infoBox}>
    <Text style={styles.infotexts}>
      <Text style={styles.highlight}>2000+</Text><br/>
      <Text style={styles.label}>MW Installed Capacity</Text>
    </Text>
  </View>
  <View style={styles.infoBox}>
    <Text style={styles.infotexts}>
      <Text style={styles.highlight}> 100+</Text><br/>
      <Text style={styles.label}>  Satisfied Clients</Text>
    </Text>
  </View>
  <View style={styles.infoBox}>
    <Text style={styles.infotexts}>
      <Text style={styles.highlight}>18+</Text><br/>
      <Text style={styles.label}> Years Experience</Text>
    </Text>
  </View>
</View>
      </View>)}
  </View>
  );
}
 