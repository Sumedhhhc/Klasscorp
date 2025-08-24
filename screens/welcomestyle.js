import { Dimensions, Platform, StyleSheet } from 'react-native';

const mobilestyles = {
 
   main: {
     flex: 1,
  },

 container: {
    padding: 0,
  },
  background: {
   ...StyleSheet.absoluteFillObject,
   width: '100%',
   height: '100%',
  },

  topbar: {
    backgroundColor: 'white',
    width: '100%',
    height: 110,
  },

  head1: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 0,
    marginTop: 65,
    textAlign: 'center',
    marginBottom: 155,
  },

  head2: {
    fontSize: 30,
    color: 'white',
    marginTop: 85,
    textAlign: 'center',
    width: 250,
    marginLeft: 50,
  },

  company_name: {
    width:200,
    fontWeight: 'bold',
    color: 'navyblue',
    fontSize: 30,
    height: 50,
    marginTop: 50,
    marginLeft: 20,
  },

  login: {
    backgroundColor: '#1A4A7F',
    fontWeight: 'bold',
    color: 'white',
    width: 100,
    height: 50,
    paddingTop: 10,
    paddingLeft: 25,
    fontSize: 20,
    borderRadius: 10,
    marginLeft: 240,
    marginTop: -55,
  },

};

const { width } = Dimensions.get('window');
const isWeb = width > 800;
const isMobile = width < 800;

const webstyles = {
  main: {
    flex: 1,
    width: isWeb ? '100vw' : '100%',
    height: isWeb ? '100vh' : '100%',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    width: isWeb ? '100vw' : '100%',
    height: isWeb ? '80vh' : '100%',
  },

  container: {
    width: isWeb ? '100vw' : '100%',
    height: isWeb ? '100vh' : '100%',
    zIndex: 0,
  },

  topbar: {
    backgroundColor: 'white',
    width: isWeb ? '93vw' : '93%',
    height: isWeb ? '12vh' : 60,
    marginTop: isWeb ? '4vh' : 20,
    marginLeft: isWeb ? '3.4vw' : '3.5%',
    borderRadius: isWeb ? 15 : 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWeb ? '2vw' : 15,
  },

  company_name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: isWeb ? '2.5vw' : 25,
  },

  loginbutton: {
    backgroundColor: '#1A4A7F',
    color: 'white',
    paddingVertical: isWeb ? '1.3vh' : 8,
    paddingHorizontal: isWeb ? '1.3vw' : 12,
    textAlign: 'center',
    borderRadius: 10,
  },

  login: {
    color: 'white',
    fontSize: isWeb ? '150%' : 20,
    fontWeight: 'bold',
    width: '100%',
  },

  head1: {
    fontSize: isWeb ? '5vw' : '15vw',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5vh',
    marginBottom: '3vh',
    lineHeight: isWeb ? '5vw' : '15vw',
    width: isWeb ? '50vw' : '100%',
    marginLeft: isWeb ? '25vw' : '0%',
  },

  head2: {
    fontSize: isWeb ? '3vw' : 30,
    color: 'white',
    textAlign: 'center',
    marginTop: isWeb ? '1vh': '1%',
    marginBottom: '3vh',
  },

  bottombar: {
        backgroundColor: 'white',
        width: isWeb ? '80vw' : '100vw',
        minHeight: '30vh',
        marginTop: isWeb ? '-30vh' : '-36vh',
        marginLeft: isWeb ? '10vw' : '0vw',
        borderRadius: isWeb ? 15 : 0,
        alignItems: 'center',
        zIndex: 1,
        height: 'auto',
  },

  company_info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },

  infoBox: {
    alignItems: 'center',
    width: isMobile ? '50%' : '20vw', // 2x2 on mobile, wide on desktop
    paddingVertical: 10,
  },

  highlight: {
    fontSize: isWeb ? '5vw' : 50,
    fontWeight: 'bold',
    color: '#1A4A7F',
    marginLeft: isWeb ? '1vw' : '-7vw',
  },

  label: {
    fontSize: isWeb ? '2.5vw' : 19,
    color: '#000',
    marginLeft: isWeb ? '0vw' : '-10vw',
    fontWeight: isWeb ? 'none' : 'bold',
  },

  infotexts: {
    textAlign: 'center',
  },
};


const styles = Platform.OS === 'web' ? webstyles : mobilestyles;

export default StyleSheet.create(styles);
