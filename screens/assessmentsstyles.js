import { Dimensions, Platform, StyleSheet } from 'react-native';

const mobilestyles = {};

const { width } = Dimensions.get('window');
const isWeb = width > 800;

const webstyles = {
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center',
  },
  row: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: -7,
  },
  tile: {
    width: isWeb? '23vw' : '10vw',
    minHeight: '17vw',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderLeftWidth: 3.5,
    borderLeftColor: '#47c747ff',
    padding: 14,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    margin: 5,
    flex: 1,
  },
  tileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  tileDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  tileButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  tileButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0866f4',
    borderWidth: 1,
    borderColor: '#0866f4',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  tileProgress: {
    fontSize: 14,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  completed:{
    color: 'green',
  },
  pending:{
    color: '#ff5025ff',
  },
  tileTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    marginTop: 9,
  },
  progressContainer: {
  marginTop: 10,
},

progressHeading: {
  fontSize: 14,
  fontWeight: '600',
  marginBottom: 5,
  color: '#333',
},

progressBarBackground: {
  height: 8,
  backgroundColor: '#e0e0e0',
  borderRadius: 4,
  overflow: 'hidden',
  marginBottom: 5,
},

progressBarFill: {
  height: 8,
  backgroundColor: '#4cafef',
  borderRadius: 4,
},
};

const styles = Platform.OS === 'web' ? webstyles : mobilestyles;

export default StyleSheet.create(styles);
