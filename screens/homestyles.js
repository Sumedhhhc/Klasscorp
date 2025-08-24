import { Dimensions, Platform, StyleSheet } from 'react-native';

const mobilestyles = {};

const { width } = Dimensions.get('window');
const isWeb = width > 800;

const webstyles = {
    container: {
    flex: 1,
    width: isWeb ? '100vw' : '100%',
    height: isWeb ? '100vh' : '100%',
    backgroundColor: '#f4f4f4f4',
  },

   topbar: {
    backgroundColor: 'white',
    width: isWeb ? '100vw' : '100%',
    height: isWeb ? '12vh' : 60,
    borderRadius: isWeb ? 1 : 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWeb ? '2vw' : 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    zIndex: 1000,        
  },

  company_name: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: isWeb ? '2.5vw' : 25,
  },

  homebutton: {
    fontSize: '1.5vw',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: 'all 0.3s ease',
    marginRight: '2vw',
    fontWeight: 500,
  },

  hoverhome: {
     color: 'black',
     fontSize: '1.5vw',
     transition: 'all 0.3s ease',
  },

   logoutbutton: {
    backgroundColor: '#646464d4',
    color: 'white',
    paddingVertical: isWeb ? '1.3vh' : 8,
    paddingHorizontal: isWeb ? '1.3vw' : 12,
    textAlign: 'center',
    borderRadius: 10,
  },

  logout: {
    color: 'white',
    fontSize: isWeb ? '150%' : 20,
    fontWeight: 'bold',
    width: '100%',
  },

  username: {
  fontSize: isWeb ? '1.5vw' : 15,
  marginLeft: 'auto', 
  marginRight: '1.8vw',            
  color: 'white',
  textAlign: 'left',
  display: 'flex',          
  flexShrink: 1,
  fontWeight: 500,              
},


  menu: {
    width: '5vw',
    borderRadius: 5,
    marginTop: '0.3vw',
    marginLeft: '2vw',
  },

  menubutton: {
    fontSize: isWeb ? '1.6vw' : 15,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    fontWeight: 500,
  },

  hovermenu: {
   color: 'black',
   fontSize: '1.6vw',
   transition: 'all 0.3s ease',
},

 activemenu: {
  color: 'black',
 },

sidebarMenu: {
  position: 'absolute',
  right: 1,
  top: '5vw',
  width: 275,
  height: '100%',
  padding: 10,
  borderLeftWidth: 1,
  borderColor: '#ccc',
  zIndex: 999,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: -2, height: 2 },
  shadowRadius: 4,
  backgroundColor: 'white',
  borderRightColor: '#e2e2e2ee',
  borderRightWidth: 2,
},

menuSection: {
  marginBottom: 7,
  marginTop: 12,
},

menuHeader: {
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 7,
  marginLeft: 7,
},

menuItem: {
  paddingVertical: 10,
  marginLeft: 35,
},

menuItembutton : {
  color: '#757272ff',
  fontWeight: '600',
  fontFamily: 'Segoe UI',
  fontSize: 17,
  marginLeft: 25,
},

hovermenuItem:{
  backgroundColor: '#cfcfcf50',
  borderRadius: 5,
  width: '12vw',
},

activemenuItem: {
   backgroundColor: 'lightblue',
   borderRadius: 5,
   width: '12vw',
},

main: {
    marginLeft: '20vw',
    marginTop: '5vw',
    padding: '1vw',
  },

heading: {
  fontSize: '3vw',
  fontWeight: 'bold',
  marginBottom: '2.2vw',
  },

backimage: {
  width: '110vw',
  height: '110vh',
  position: 'absolute',
  marginLeft: '-25vw',
  marginTop: '-11vw',
  opacity: 0.3,
  zIndex: -1,
},

createuser: {
   position: 'relative',
   zIndex: 6,
},

createusermain: { 
  width: '50vw',
  marginTop: '-4.5vw',
  marginLeft: '7vw',
  padding: '2vw',
  borderColor: 'lightgrey',
  borderRadius: 10,
  borderWidth: 1,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  backgroundColor: 'white',
  borderColor: 'lightgrey',
  borderLeftWidth: 4,
  borderLeftColor: '#40d039ff',
  },

createuserheading: {
    fontSize: '3vw',
    fontWeight: 'bold',
    marginBottom: '2vw',
    marginLeft: '-0.5vw',
    marginTop: '-1vw',
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
    width: '46vw',
    paddingLeft: '1vw',
    paddingBottom: '1vw',
    color: '#3b82f6',
    borderBottomWidth: 3,
    borderBottomColor: '#40d039ff',
  },

createusercontainer: {
   flexDirection: 'row',
   marginBottom: '1.7vw',
},

createusername: {
   fontSize: '1.5vw',
   marginRight: '7.3vw',
   marginLeft: '3vw'
  },

createuseremail: {
   fontSize: '1.5vw',
   marginRight: '10.4vw',
   marginLeft: '3vw'
  },

createusermobile: {
   fontSize: '1.5vw',
   marginRight: '3.9vw',
   marginLeft: '3vw'
  },

createuserpassword: {
   fontSize: '1.5vw',
   marginRight: '7.7vw',
   marginLeft: '3vw'
  },

createuserconfirmpassword: {
   fontSize: '1.5vw',
   marginRight: '2vw',
   marginLeft: '3vw'
  },

createuserrole: {
   fontSize: '1.5vw',
   marginRight: '7.7vw',
   marginLeft: '3vw'
  },

createbutton: {
    width: '10vw',
    marginLeft: '15vw',
    justifyContent: 'center',
    marginTop: '1.5vw',
},

createbuttontext: {
    fontSize: '1.3vw',
    backgroundColor: '#2563eb',
    color: 'white',
    textAlign: 'center',
    height: '2vw',
    borderRadius: 5, 
},

input: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 8,
    height: '2.5vw',
    fontSize: '1.3vw',
    width: '25vw',
    marginLeft: '2vw',
    borderWidth: 2,
    borderColor: 'lightgrey',
    color: 'black',
    placeholderTextColor: 'grey',
    width: '20vw',
  },

manageuserheading: {
    fontSize: '3vw',
    fontWeight: 'bold',
    marginBottom: '2vw',
    marginLeft: '-4vw',
    marginTop: '-4vw',
    borderColor: 'lightgrey',
    borderBottomWidth: 2,
    width: '100vw',
    paddingLeft: '2vw',
    paddingBottom: '1vw',
    color: '#3b82f6',
  },

updateuser: {
   position: 'relative',
   zIndex: 7,
},

updateusermain: { 
  width: '50vw',
  marginTop: '-4.5vw',
  marginLeft: '7vw',
  padding: '2vw',
  borderColor: 'lightgrey',
  borderRadius: 10,
  borderWidth: 1,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  backgroundColor: 'white',
  borderColor: 'lightgrey',
  borderLeftWidth: 4,
  borderLeftColor: '#5fd869f3',
  },

updateuserheading: {
    fontSize: '3vw',
    fontWeight: 'bold',
    marginBottom: '2vw',
    marginLeft: '-0.5vw',
    marginTop: '-1vw',
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
    width: '46vw',
    paddingLeft: '2vw',
    paddingBottom: '1vw',
    color: '#3b82f6',
    borderBottomWidth: 3,
    borderBottomColor: '#5fd869f3',
  },

updateusercontainer: {
   flexDirection: 'row',
   marginBottom: '1.7vw',
},

updateusername: {
   fontSize: '1.5vw',
   marginRight: '10vw',
   marginLeft: '3vw'
  },

updateuseremail: {
   fontSize: '1.5vw',
   marginRight: '10.4vw',
   marginLeft: '3vw'
  },

updateusermobile: {
   fontSize: '1.5vw',
   marginRight: '8.4vw',
   marginLeft: '3vw'
  },

updateuserpassword: {
   fontSize: '1.5vw',
   marginRight: '7.7vw',
   marginLeft: '3vw'
  },

updateuserconfirmpassword: {
   fontSize: '1.5vw',
   marginRight: '2vw',
   marginLeft: '3vw'
  },

updateuserrole: {
   fontSize: '1.5vw',
   marginRight: '11vw',
   marginLeft: '3vw'
  },

updatebutton: {
    width: '10vw',
    marginLeft: '9vw',
    justifyContent: 'center',
    marginTop: '1.5vw',
},

updatebuttontext: {
    fontSize: '1.2vw',
    backgroundColor: '#2563eb',
    color: 'white',
    textAlign: 'center',
    height: '2vw',
    borderRadius: 5, 
    paddingTop: '0.1vw',
},

cancelbutton: {
    width: '10vw',
    marginLeft: '22vw',
    justifyContent: 'center',
    marginTop: '-2.02vw',
},

cancelbuttontext: {
    fontSize: '1.3vw',
    backgroundColor: '#969696ff',
    color: 'black',
    textAlign: 'center',
    height: '2vw',
    borderRadius: 5, 
    paddingTop: '0.1vw',
},

input: {
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

  searchbutton: {
    width: '10vw',
    justifyContent: 'center',
    marginTop: '1vw',
},

searchbuttontext: {
    fontSize: '1.2vw',
    backgroundColor: '#2563eb',
    color: 'white',
    textAlign: 'center',
    height: '2vw',
    borderRadius: 5, 
    paddingTop: '0.1vw',
},

createlocations: {
   position: 'relative',
   zIndex: 10,
},

createlocationsmain: { 
  width: '46vw',
  marginLeft: '-2vw',
  padding: '2vw',
  borderColor: 'lightgrey',
  borderRadius: 10,
  borderWidth: 1,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3,
  backgroundColor: 'white',
  borderColor: 'lightgrey',
  borderLeftWidth: 4,
  borderLeftColor: '#5fd869f3',
  },

createlocationsheading: {
    fontSize: '3vw',
    fontWeight: 'bold',
    marginBottom: '2vw',
    marginLeft: '-3.2vw',
    marginTop: '-5vw',
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
    width: '100vw',
    paddingLeft: '2vw',
    paddingBottom: '1vw',
    color: '#3b82f6',
  },

  projectName: {
  fontWeight: 'bold',
  color: '#696969ff', 
  fontSize: '2.5vw',
  fontStyle: 'italic',
},

createlocationscontainer: {
   flexDirection: 'column',
   marginBottom: '1.7vw',
},

createlocationssearch: {
   fontSize: '1.5vw',
   fontWeight: '600',
   marginBottom: '1vw'
  },

 locationdata: {
  borderRadius: 10,
  backgroundColor: '#fff',
  margin: 20,
  marginLeft: '-1vw',
  marginTop: '-5.3vw',
  borderWidth: 2.34,
  borderColor: '#a2a2a2dd',
  overflow: 'hidden',
},

locationdataheading: {
  fontSize: '2.5vw',
  fontWeight: '700',
  color: '#000',
  marginVertical: '1vh',
  textAlign: 'center',
  height: '7vh',
},

tableHeader: {
  flexDirection: 'row',
  backgroundColor: '#76d6ffff',
  paddingVertical: 14,
  height: '8vh',
  borderColor: 'lightgrey',
  borderBottomColor: '#a2a2a2dd',
  borderBottomWidth: 2,
  borderTopColor: '#a2a2a2dd',
  borderTopWidth: 2,
},

tableCol: {
  fontSize: '1.4vw',
  flex: 1,
  fontWeight: '600',
  color: '#000',
  textAlign: 'center',
},

tableSlno: {
  fontSize: '1.4vw',
  flex: 0.5,
  fontWeight: '600',
  color: '#000',
  textAlign: 'center',
},

tableRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10.5,
  paddingHorizontal: 10,
},

tableCell: {
  fontSize: '1.2vw',
  flex: 1,
  fontWeight: '500',
  color: '#000',
  textAlign: 'center',
},

tableslno: {
  fontSize: '1.4vw',
  flex: 0.5,
  fontWeight: '500',
  color: '#000',
  textAlign: 'center',
},

actionButtons: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
},

addButton: {
  backgroundColor: '#4CAF50',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
},

addButtonText: {
  color: '#fff',
  fontSize: '1.1vw',
  fontWeight: '600',
  textAlign: 'center',
},

deleteButton: {
  backgroundColor: '#E53935',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 6,
},

deleteButtonText: {
  color: '#fff',
  fontSize: '1.1vw',
  fontWeight: '600',
  textAlign: 'center',
},

noData: {
  fontSize: '1.3vw',
  fontWeight: '500',
  color: '#555',
  textAlign: 'center',
  padding: 20,
 },

 addFieldScreen:{
  marginLeft: '-20vw',
  marginTop: '-5vw',
 },

 viewlocationdatabutton: {
  position: 'absolute',
  width: '13vw',
  marginLeft: '2.6vw',
  marginTop: '0.5vw',
},

viewlocationdatatext: {
  fontSize: '1.3vw',
  backgroundColor: '#bbbbbbff',
  color: 'black',
  height: '2vw',
  borderRadius: 5, 
  paddingLeft: '1.3vw',
 },

assessmentmain: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: '2vw',
  position: 'relative',
},

assessmentheading: {
  position: 'absolute', 
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: '2.5vw',
  fontWeight: '650',
  marginRight: '4vw',
},

assessmentIDs: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 'auto',   
  gap: 5,
  marginRight: '1vw',
  marginTop: '0.4vw',
},

assessmentproject: {
  fontSize: '1.25vw',
  borderColor: 'grey',
  borderRadius: 7,
  borderWidth: 2,
  paddingHorizontal: 5,
  paddingVertical: 2,
  backgroundColor: '#f5f5f5ff',
  textAlign: 'center',
  maxWidth: '45vw',
  flexShrink: 1,
},

assessmentlocation: {
  fontSize: '1.25vw',
  borderColor: 'grey',
  borderRadius: 7,
  borderWidth: 2,
  paddingHorizontal: 5,
  paddingVertical: 2,
  backgroundColor: '#f5f5f5ff',
  textAlign: 'center',
  maxWidth: '45vw',
  flexShrink: 1,
 },

createProjectid: {
    fontSize: "1.5vw",
    marginLeft: "1vw",
    width: "9.6vw",
    marginRight: '1vw',
  },
  createprojectname: {
    fontSize: "1.5vw",
    marginRight: "1.1vw",
    marginLeft: "1vw",
    width: "9.6vw",
  },
  createprojecttype: {
    fontSize: "1.5vw",
    marginRight: "1vw",
    marginLeft: "1vw",
    width: "9.6vw",
  },
  existprojectheader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: "1vw",
    marginBottom: "1vw",
    marginLeft:"-2.2vw",
  },
  existprojectheaderpcode: {
    fontWeight: "bold",
    width: "8vw",
    fontSize: "1.3vw",
    marginLeft: "2vw",
    textAlign: "center",
  },
  existprojectheaderpname: {
    fontWeight: "bold",
    width: "15vw",
    fontSize: "1.3vw",
    marginLeft: "2vw",
    textAlign: "center",
  },
  existprojectheaderptype: {
    fontWeight: "bold",
    width: "10vw",
    fontSize: "1.3vw",
    marginLeft: "2vw",
    textAlign:"center",
  },
  existprojectheaderaction: {
    fontWeight: "bold",
    fontSize: "1.3vw",
    width: "13vw",
    marginLeft: "2vw",
    textAlign: "center",
  },
  existprojectdetails: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: "0.7vw",
    borderWidth: 2,
    borderColor: "thistle",
    borderRadius: 10,
    marginTop: "1vw",
    marginBottom: "1vw",
    padding: "0.3vw",
    marginLeft:"-2.3vw",
  },
  existprojectid: {
    width: "20vw",
    fontSize: "1.2vw",
    textAlign: "center",
  },
  existprojectname: {
    width: "20vw",
    fontSize: "1.2vw",
    textAlign: "center",
  },
   existprojecttype: {
    width: "20vw",
    fontSize: "1.2vw",
    textAlign: "center",
  },
  existprojectactionview: {
    color: "#1A4A7F",
    fontSize: "1.2vw",
    border: "0.1vw grey solid",
    borderRadius: "0.3vw",
    padding: "0.1vw",
  },
  existprojectactionedit: {
    color: "#1A4A7F",
    fontSize: "1.2vw",
    border: "0.1vw grey solid",
    borderRadius: "0.3vw",
    padding: "0.1vw",
  },
  existprojectactiondelete: {
    color: "red",
    fontSize: "1.2vw",
    border: "0.1vw grey solid",
    borderRadius: "0.3vw",
    padding: "0.1vw",
  },

  projectinput: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 8,
    height: '2.5vw',
    fontSize: '1.3vw',
    width: '31vw',
    marginLeft: '2vw',
    borderWidth: 2,
    borderColor: 'lightgrey',
    color: 'black',
    placeholderTextColor: 'grey',
  },

  toastContainer: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  toastText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  manageprojectheading: {
    fontSize: '3vw',
    fontWeight: 'bold',
    marginBottom: '2vw',
    marginLeft: '-4vw',
    marginTop: '-4vw',
    borderColor: 'lightgrey',
    borderBottomWidth: 2,
    width: '100vw',
    paddingLeft: '2vw',
    paddingBottom: '1vw',
    color: '#3b82f6',
    borderTopWidth: 2,
    borderTopColor: 'lightgrey',
  },

createprojectbutton: {
    width: '11vw',
    marginLeft: '15vw',
    justifyContent: 'center',
    marginTop: '0.5vw',
    height: '2vw',
},

createprojectbuttontext: {
    fontSize: '1.4vw',
    backgroundColor: '#2563eb',
    color: 'white',
    textAlign: 'center',
    height: '2vw',
    borderRadius: 5, 
},
    
  
};

const styles = Platform.OS === 'web' ? webstyles : mobilestyles;

export default StyleSheet.create(styles);