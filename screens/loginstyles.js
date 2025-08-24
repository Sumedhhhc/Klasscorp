import { Dimensions, Platform, StyleSheet } from 'react-native';

const mobilestyles = {
 main: {
     flex: 1,
  },
  container: {
    padding: 30,
  },
  heading: {
    fontSize: 28,
    marginBottom: 35,
    marginTop: 60,
    textAlign: 'center',
    paddingTop: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: -1,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    height: 55,
    fontSize: 17,
  },
  login: {
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#1A4A7F',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10,
    height: 55,
  },
  background: {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
  width: '100%',
  height: '100%',
},
  logo: {
     width:250,
     top:50,
     left: 25,
  },

};

const { width } = Dimensions.get('window');
const isWeb = width > 800;

const webstyles = {
  main: {
    flex: 1,
  },

  container: {
    padding: '1vw',
  },

  heading: {
    fontSize: isWeb ? '2.5vw' : '7vw',
    marginBottom: isWeb ? '3.5vw' : '8vw', 
    textAlign: 'center',
    paddingTop: '2.5vw',    
    color: 'black',       
  },

  input: {
    backgroundColor: 'white',
    padding: isWeb ? '1vw' : '2vw',        
    marginBottom: isWeb ? '1vw' : '5vw',     
    borderRadius: isWeb ? 10 : 6,     
    height: isWeb ? '8vh' : '13vw',           
    fontSize: isWeb ? '1.5vw' : '4vw',         
    width: isWeb ? '25vw' : '80%',
    marginLeft: isWeb ? '36.5vw' : '10vw',    
  },

  login: {
    textAlign: 'center',
    color: 'white',
    borderRadius: isWeb ? 10 : 6,
    backgroundColor: '#1A4A7F',
    padding: isWeb ? '0.5vw' : '3vw',
    height: isWeb ? '8vh' : '14vw',
    fontSize: isWeb ? '2vw': '7vw',
    width: isWeb ? '25vw' : '80%',
    marginTop: isWeb ? '2vh' : '2vw',
    fontWeight: isWeb ? 'none' : 'bold',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },

  logo: {
    width: isWeb ? '20vw' : '55%',          
    top: isWeb ? '5vh' : '5vw',              
    left: isWeb ? '39vw' :'22.5vw',            
    marginTop: isWeb ? '-79vh' : '-63vh',    
  },

  blurback: {
    borderRadius: isWeb ? '1vw' : '3vw',
    width: isWeb ? '30vw' : '90%',
    height: isWeb ? '70vh' : '60%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(15px)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: isWeb ? '15vh' : '15vh',     
    marginLeft: isWeb ? '35vw' : '5vw',      
  },

  loginbutton : {
    width: isWeb ? '25vw' : '100%',
    marginLeft: isWeb ? '36.5vw' : '10vw',
  },
};


const styles = Platform.OS === 'web' ? webstyles : mobilestyles;

export default StyleSheet.create(styles);
