import { Dimensions, Platform, StyleSheet } from 'react-native';

const mobilestyles = {};

const { width } = Dimensions.get('window');
const isWeb = width > 800;

const webstyles = {
  createlocations: {
    position: 'relative',
    zIndex: 15,
  },
  container: {
    padding: '2vh',
    position: 'relative',
  },

  scrollContainer: {
    maxHeight: '20vh', 
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 20,
    overflow: 'hidden',
    marginLeft: '-2vw',
    marginTop: '0.5vw',
    borderWidth: 2,
    borderColor: 'lightgrey',
  },

  title: {
    fontSize: '1.5vw',
    fontWeight: 'bold',
    marginBottom: '2vh',
    marginTop: '-2vw',
  },

  formRow: {
    flexDirection: 'row',
    gap: '1vw',
    marginBottom: '2vh',
    flexWrap: 'wrap',
  },
  input: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: '1vh',
    borderRadius: '0.5vw',
    fontSize: '1.1vw',
    minWidth: '20vw',
    backgroundColor: 'white',
    placeholderTextColor: 'grey',
    fontWeight: 600,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: '1vw',
    marginBottom: '3vh',
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: '1vh',
    paddingHorizontal: '2vw',
    borderRadius: '0.5vw',
  },
  addButtonText: {
    color: '#fff',
    fontSize: '1vw',
    fontWeight: 600,
  },
  clearButton: {
    backgroundColor: '#b3b3b3ff',
    paddingVertical: '1vh',
    paddingHorizontal: '2vw',
    borderRadius: '0.5vw',
  },
  clearButtonText: {
    color: '#111',
    fontSize: '1vw',
    fontWeight: 600,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1vh',
    justifyContent: 'space-between',
    marginTop: '1vw',
    flexWrap: 'wrap',
    gap: '1vw',
  },
  searchInput: {
    flexGrow: 1,
    marginLeft: '-3vw',
    paddingVertical: '1vh',
    paddingHorizontal: '1vw',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '0.5vw',
    minWidth: '30vw',
    fontSize: '1vw',
    backgroundColor: 'white',
    placeholderTextColor: 'grey',
    fontWeight: 600,
    
  },
  searchButton: {
    backgroundColor: '#2563eb',
    paddingVertical: '1vh',
    paddingHorizontal: '2vw',
    borderRadius: '0.5vw',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: '1vw',  
    fontWeight: 600,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#56db58e8',
    padding: '1vh',
    borderTopLeftRadius: '0.5vw',
    borderTopRightRadius: '0.5vw',
  },
  headId: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: '1vw',
    textAlign: 'center',
  },
  headName: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: '1vw',
    textAlign: 'center',
  },
  headAssign: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: '1vw',
    textAlign: 'center',
  },
  headActions: {
    flex: 1.3,
    fontWeight: 'bold',
    fontSize: '1vw',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: '1vh',
    paddingHorizontal: '1vw',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1.5,
    borderBottomColor: 'lightgrey',
  },
  colId: {
    flex: 1,
    fontSize: '1vw',
    textAlign: 'center',
  },
  colName: {
    flex: 1,
    fontSize: '1vw',
    textAlign: 'center',
  },
   colAssign: {
    flex: 1,
    fontSize: '1vw',
    textAlign: 'center',
  },
  colActions: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  edit: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: '1vw',
  },
  view: {
    color: '#10b981',
    fontWeight: '600',
    fontSize: '1vw',
  },
  delete: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: '1vw',
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '0vw',
    marginLeft: '1vw',
    gap: '3vw',
  },
  summaryBox: {
    borderWidth: 1,
    borderLeftWidth: 5,
    padding: '1vw',
    borderRadius: '1vw',
    borderColor: 'lightgrey',
    fontSize: '1.5vw',
    minWidth: '15vw',
    textAlign: 'center',
    backgroundColor: 'white',
    borderLeftColor: '#3b82f6',
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    minheight: '7.5vw',
  },
  createlocationcontainer:{
    marginLeft: '-3vw',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  },
  value: {
     color: '#3b82f6',
     fontSize: '2.5vw',
     fontWeight: 'bold',
  },
updatelocation: {
  position: 'relative',
  zIndex: 7,
},
updatelocationmain: { 
  width: '50vw',
  marginLeft: '7vw',
  marginTop: '-1.5vw',
  padding: '2vw',
  borderColor: 'lightgrey',
  borderRadius: 10,
  borderWidth: 1,
  borderLeftWidth: 4,
  borderLeftColor: '#5fd869f3',
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  backgroundColor: 'white',
  borderColor: 'lightgrey',
},

updatelocationheading: {
  fontSize: '3vw',
  fontWeight: 'bold',
  marginBottom: '2vw',
  marginTop: '-1vw',
  marginLeft: '-1vw',
  borderBottomWidth: 3,
  borderBottomColor: '#5fd869f3',
  borderColor: 'lightgrey',
  width: '48vw',
  paddingLeft: '1vw',
  paddingBottom: '1vw',
  color: '#3b82f6',
},

updatelocationcontainer: {
  flexDirection: 'row',
  marginBottom: '1.7vw',
},

updatelocationid: {
  fontSize: '1.5vw',
  marginRight: '5.5vw',
  marginLeft: '1vw'
},

updatelocationname: {
  fontSize: '1.5vw',
  marginRight: '3vw',
  marginLeft: '1vw'
},

updatelocationassignedto: {
  fontSize: '1.5vw',
  marginRight: '4vw',
  marginLeft: '1vw'
},

updatelocationdescription: {
  fontSize: '1.5vw',
  marginRight: '5.5vw',
  marginLeft: '1vw'
},

updatelocationpriority: {
  fontSize: '1.5vw',
  marginRight: '8vw',
  marginLeft: '1vw'
},

updatelocationbutton: {
  width: '10vw',
  marginLeft: '9vw',
  justifyContent: 'center',
  marginTop: '1.5vw',
},

updatelocationbuttontext: {
  fontSize: '1.2vw',
  backgroundColor: '#2563eb',
  color: 'white',
  textAlign: 'center',
  height: '2vw',
  borderRadius: 5, 
  paddingTop: '0.1vw',
},

updatelocationcancel: {
  width: '10vw',
  marginLeft: '22vw',
  justifyContent: 'center',
  marginTop: '-2.02vw',
},

updatelocationcanceltext: {
  fontSize: '1.3vw',
  backgroundColor: '#969696ff',
  color: 'black',
  textAlign: 'center',
  height: '2vw',
  borderRadius: 5, 
  paddingTop: '0.1vw',
},

updatelocationinput: {
  backgroundColor: 'white',
  padding: 7,
  paddingBottom: 5,
  borderRadius: 8,
  height: '2.5vw',
  fontSize: '1.3vw',
  width: '25vw',
  borderWidth: 2,
  borderColor: 'lightgrey',
  color: 'black',
  placeholderTextColor: 'grey',
 },
viewlocation: {
  position: 'relative',
  zIndex: 9,
},
viewlocationmain: { 
  width: '50vw',
  marginLeft: '7vw',
  padding: '2vw',
  borderColor: 'lightgrey',
  borderRadius: 10,
  borderWidth: 1,
  borderLeftWidth: 4,
  borderLeftColor: '#5fd869f3',
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  backgroundColor: 'white',
  borderColor: 'lightgrey',
},

viewlocationheading: {
  fontSize: '3vw',
  fontWeight: 'bold',
  marginBottom: '2vw',
  marginTop: '-1vw',
  marginLeft: '-1vw',
  borderBottomWidth: 3,
  borderBottomColor: '#5fd869f3',
  borderColor: 'lightgrey',
  width: '48vw',
  paddingLeft: '1vw',
  paddingBottom: '1vw',
  color: '#3b82f6',
},

viewlocationcontainer: {
  flexDirection: 'row',
  marginBottom: '1.7vw',
},

viewlocationid: {
  fontSize: '1.5vw',
  marginRight: '5.5vw',
  marginLeft: '1vw'
},

viewlocationname: {
  fontSize: '1.5vw',
  marginRight: '3vw',
  marginLeft: '1vw'
},

viewlocationassignedto: {
  fontSize: '1.5vw',
  marginRight: '4vw',
  marginLeft: '1vw'
},

viewlocationdescription: {
  fontSize: '1.5vw',
  marginRight: '4vw',
  marginLeft: '1vw'
},

viewlocationpriority: {
  fontSize: '1.5vw',
  marginRight: '4vw',
  marginLeft: '1vw'
},

viewlocationreturnbutton: {
  width: '10vw',
  justifyContent: 'center',
},

viewlocationreturntext: {
  fontSize: '1.3vw',
  backgroundColor: '#cccccccc',
  color: 'black',
  height: '2vw',
  borderRadius: 5, 
  paddingTop: '0.1vw',
  paddingLeft: '1.5vw',
 },
};

const styles = Platform.OS === 'web' ? webstyles : mobilestyles;

export default StyleSheet.create(styles);
