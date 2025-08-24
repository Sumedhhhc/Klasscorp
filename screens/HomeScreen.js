import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Assessments from './Assessment.js';
import styles from './homestyles.js';
import LocationList from './LocationList.js';
import UserList from './UserList.js';

//Main function
export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [createProjectName, setcreateProjectName] = useState("");
  const [projectID, setProjectID] = useState("");
  const [projectType, setProjectType] = useState("");
  const [hovered, setHovered] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [MenuVisible, setMenuVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [mobile, setMobile] = useState('');
  const [updatename, setupdateName] = useState('');
  const [updateemail, setupdateEmail] = useState('');
  const [updatepassword, setupdatePassword] = useState('');
  const [updateconfirmPassword, setupdateconfirmPassword] = useState('');
  const [updaterole, setupdateRole] = useState('');
  const [updatemobile, setupdateMobile] = useState('');
  const [searchProject, setSearchProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [status, setStatus] = useState('active');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [locationdata, setLocationData] = useState([]);
  const [selectedlocationdata, setSelectedLocationData] = useState([]);
  const slide = useRef(new Animated.Value(-1560)).current; 
  const REG_URL = 'http://localhost:3000/api/users/register'; 
  const PROJ_URL = 'http://localhost:3000/api/project/searchProject';
  const API_BASE = "http://localhost:3000/api/project";

  useLayoutEffect(() => {
  navigation.setOptions({
      headerShown: false,
    });
  }, 
  [navigation]);

  useEffect(() => {
  const fetchLoggedInUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  };

  fetchLoggedInUser();
}, []);

  useEffect(() => {
    Animated.timing(slide, {
      toValue: MenuVisible ? -1260 : -1560,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, 
  [MenuVisible]);

  const clearupdateForm = () => {
  setupdateName('');
  setupdateEmail('');
  setupdateMobile('');
  setupdatePassword('');
  setupdateconfirmPassword('');
  setupdateRole('');
  setStatus('active');
  setSelectedUser(null);
};

const clearcreateForm = () => {
   setfullname('');
   setEmail('');
   setPassword('');
   setconfirmPassword('');
   setRole('');
   setMobile('');
  
};

  const handleCreateProject = async () => {
    if (!projectID || !projectName || !projectType) {
      alert("All fields are required!");
      return;
    }

    const token = await AsyncStorage.getItem("token");

    try {
      await axios.post(
        `${API_BASE}/createProject`,
        {
          project_code: projectID,
          name: projectName,
          project_type: projectType,
          description: "Default description",
          capacity_mw: 0,
          start_date: new Date().toISOString(),
          expected_completion: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Project created successfully!");
      setProjectID("");
      setProjectName("");
      setProjectType("");
      fetchProjects(); 
    } catch (error) {
      console.error(
        "Create project error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "❌ Failed to create project");
    }
  };

  const fetchProjects = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get(`${API_BASE}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data || []);
    } catch (err) {
      console.error(
        "Error fetching projects:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    if (activeButton === "create-project") {
      fetchProjects();
    }
  }, [activeButton]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await axios.delete(
                `http://localhost:3000/api/project/projects/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              console.log("Delete response:", res.data); // 👀 check response
              setProjects((prev) => prev.filter((p) => p._id !== id));
            } catch (err) {
              console.error(
                "Delete failed:",
                err.response?.data || err.message
              );
              Alert.alert(
                "Error",
                err.response?.data?.message || "Could not delete project"
              );
            }
          },
        },
      ]
    );
  };

const fetchProjectData = async () => { 
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/project/allProjects", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (response.data?.projects?.length) { 
      setProjects(response.data.projects); 
    } else {
      setProjects([]);
    }
  } catch (error) {
    console.error("Failed to fetch projects:", error.response?.data || error.message);
    setProjects([]);
  }
};


useEffect(() => {
  if (activeButton === 'create-locations') {
    fetchProjectData();
  }
}, [activeButton]);

const handleSearchProject = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!searchProject.trim()) {
    alert('Please enter a valid code first!');
    return;
  }

  try {
    const response = await axios.get(PROJ_URL, {
      params: { project_code: searchProject }, 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    const project = response.data.projectmasters;

    if (project?.project_code) {
      alert('Locations fetched successfully');
      setProjectName(project.name);
      setViewMode('list');
    } else {
      alert('Project not found!');
      setProjectName('');
    }
  } catch (error) {
    console.error('Failed to fetch project details:', error.response?.data || error.message);
    alert('Failed to find the project details, please check the project code');
    setProjectName('');
  }
};


  const handleCreateUser = async () => {
  const token = await AsyncStorage.getItem("token");

   try {
    const response = await axios.post(REG_URL, {
      name: fullname,
      email,
      mobile,
      password,
      confirmPassword,
      role,
    },{
      headers: 
      {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`,
      },
      withCredentials: true
    });

    if (response.status === 201) {
      alert('User created successfully!');
      clearcreateForm();
    }
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Failed to create user');
  }
 };

 const fetchUsers = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const res = await axios.get('http://localhost:3000/api/users/getUsers', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    setUsers(res.data);
  } catch (err) {
    console.error('Error fetching users:', err.response?.data || err.message);
    alert('Failed to fetch users');
  }
};

useEffect(() => {
  if (activeButton === 'user-list') {
    fetchUsers();
  }
}, [activeButton]);

const handleUpdateUser = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!selectedUser) return;

  try {
    const response = await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, {
      name: updatename,
      email: updateemail,
      mobile: updatemobile,
      password: updatepassword,
      confirmPassword: updateconfirmPassword,
      role: updaterole,
      status
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    alert('User updated successfully!');
    setViewMode('list');
    fetchUsers();
  } catch (error) {
    console.error('Update Error:', error.response?.data || error.message);
    alert('Failed to update user');
  }
};

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get("http://localhost:3000/api/project/allProjects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };
  fetchProjects();
}, []);


const handleDeleteUser = async (id) => {
  const token = await AsyncStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:3000/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    alert('User deleted successfully!');
    fetchUsers(); // refresh list
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    alert('Failed to delete user');
  }
};

const fetchLocationData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${API_BASE}/location/getLocationData`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (Array.isArray(res.data)) {
      setLocationData(res.data);
    } else if (res.data.locations) {
      setLocationData(res.data.locations);
    } else {
      setLocationData([]);
    }
  } catch (err) {
    console.error("Error fetching location data:", err);
  }
};

useEffect(() => {
  if (activeButton === "location-data") {
    fetchLocationData();
  }
}, [activeButton]);

const handleDeleteLocation = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this location?");
  if (!confirmed) return;

  try {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_BASE}/location/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // refresh after delete
    fetchLocationData(searchProject);
  } catch (err) {
    console.error("Error deleting location:", err);
  }
};

  return (
     <View style={styles.container}>
        <LinearGradient
             colors={['#378cfbf0', '#32da32e6']}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 0 }}
             style={styles.topbar}>
             <Text style={styles.company_name}>KLASSCORP</Text>
                <Pressable
                     disabled={activeButton === 'add-field'}
                     onMouseEnter={() => setHovered('menu')}
                     onMouseLeave={() => setHovered(null)}
                     onPress={() => {
                     if (activeMenu === 'menu') 
                        {
                         setActiveMenu(null);
                         setMenuVisible(prev => !prev);
                        } 
                        else 
                        {
                         setActiveMenu('menu');
                         setMenuVisible(prev => !prev);
                        }
                     }}
                     style={styles.menu}
                     >
                     <Text style={[styles.menubutton,
                     activeButton === 'add-field' && { color : 'lightgrey' },
                     activeButton !== 'add-field' && hovered === 'menu' && styles.hovermenu,
                     activeMenu === 'menu' && styles.activemenu
                    ]}>Menu</Text> 
               </Pressable>
               <Text style={styles.username}>👤 {loggedInUser ? loggedInUser.name : 'User'}</Text>
               <Pressable
                 onMouseEnter={() => setHovered('home-button')}
                 onMouseLeave={() => setHovered(null)}
                 onPress={() => [setActiveButton('home-button'), 
                                 setMenuVisible(false), 
                                 setActiveMenu({ color: 'white' })]}
                 style={[
                 styles.home,
                 activeButton === 'home-button' && styles.activehome
                 ]}
                >
                <Text style={[styles.homebutton, hovered === 'home-button' && styles.hoverhome]}
                >
                Home</Text>
                </Pressable>
               <TouchableOpacity style={styles.logoutbutton} onPress={() => navigation.navigate('Klasscorp-Login')} >
                   <Text style={styles.logout}               //takes to login screen
                   >Log Out</Text> 
               </TouchableOpacity>
          </LinearGradient>
        <Animated.View style={[
           styles.sidebarMenu,
           { transform: [{ translateX: slide }] },
           { pointerEvents: MenuVisible ? 'auto' : 'none' }
        ]}>
        {/*user menu*/}
         <View style={styles.menuSection}>
            <Pressable onPress={() => setUserMenuOpen(prev => !prev)}>
              <Text style={styles.menuHeader}>  
              {userMenuOpen ? '▴' : '▾'} User Management
              </Text>
            </Pressable>
         {userMenuOpen && (
         <>
          <Pressable
                 onMouseEnter={() => setHovered('create-user')}
                 onMouseLeave={() => setHovered(null)}
                 onPress={()=> {
                  if (activeButton === 'create-user') 
                        {
                         setActiveButton(null);
                        } 
                        else 
                        {
                         clearcreateForm(); 
                         setActiveButton('create-user');
                        }
                 }}
                 style={[
                 styles.menuItem,
                 hovered === 'create-user' && styles.hovermenuItem,
                 activeButton === 'create-user' && styles.activemenuItem,
                 ]}>
                <Text style={[styles.menuItembutton, activeButton === 'create-user' && { color: '#0866f4ff', }]}>Create User</Text>
          </Pressable>
          <Pressable
               onMouseEnter={() => setHovered('update-user')}
               onMouseLeave={() => setHovered(null)}
               onPress={()=> {
                  if (activeButton === 'update-user') 
                        {
                         setActiveButton(null);
                        } 
                        else 
                        {
                         setActiveButton('update-user');
                         setViewMode('list');
                         fetchUsers();
                        }
                  }}
                 style={[
                 styles.menuItem,
                 hovered === 'update-user' && styles.hovermenuItem,
                 activeButton === 'update-user' && styles.activemenuItem,
                 ]}>
                <Text style={[styles.menuItembutton, activeButton === 'update-user' && { color: '#0866f4ff', }]}>Manage Users</Text>
          </Pressable>
         </>
          )}
        </View>
        {/*project menu*/}
        <View style={styles.menuSection}>
        <Pressable onPress={() => setProjectMenuOpen(prev => !prev)}>
          <Text style={styles.menuHeader}>
          {projectMenuOpen ? '▴' : '▾'} Project Management
          </Text>
        </Pressable>
        {projectMenuOpen && (
          <>
          <Pressable
                 onMouseEnter={() => setHovered('create-project')}
                 onMouseLeave={() => setHovered(null)}
                 onPress={()=> {
                  if (activeButton === 'create-project') 
                        {
                         setActiveButton(null);
                        } 
                        else 
                        {
                         setActiveButton('create-project');
                        }
                 }}
                 style={[
                 styles.menuItem,
                 hovered === 'create-project' && styles.hovermenuItem,
                 activeButton === 'create-project' && styles.activemenuItem,
                 ]}>
                <Text style={[styles.menuItembutton, activeButton === 'create-project' && { color: '#0866f4ff', }]}>Create Project</Text>
          </Pressable>
          <Pressable
               onMouseEnter={() => setHovered('create-locations')}
               onMouseLeave={() => setHovered(null)}
               onPress={()=> {
                  if (activeButton === 'create-locations') 
                        {
                         setActiveButton(null);
                        } 
                        else 
                        {
                         setActiveButton('create-locations');
                         setViewMode('form');
                        }
                  }}
                 style={[
                 styles.menuItem,
                 hovered === 'create-locations' && styles.hovermenuItem,
                 activeButton === 'create-locations' && styles.activemenuItem,
                 ]}>
                <Text style={[styles.menuItembutton, activeButton === 'create-locations' && { color: '#0866f4ff', }]}>Create Locations</Text>
          </Pressable>
          <Pressable
               onMouseEnter={() => setHovered('location-data')}
               onMouseLeave={() => setHovered(null)}
               onPress={()=> {
                  if (activeButton === 'location-data') 
                        {
                         setActiveButton(null);
                        } 
                        else 
                        {
                         setActiveButton('location-data');
                        }
                  }}
                 style={[
                 styles.menuItem,
                 hovered === 'location-data' && styles.hovermenuItem,
                 activeButton === 'location-data' && styles.activemenuItem,
                 ]}>
                <Text style={[styles.menuItembutton, activeButton === 'location-data' && { color: '#0866f4ff', }]}>Loaction Data</Text>
          </Pressable>
          </>
         )}
        </View>
    </Animated.View>
    <View style={styles.main}>
       <Image
          source={require('../assets/images/home-user-background.jpg')}
          style={styles.backimage}
          resizeMode="cover"
       />
      {activeButton === 'create-user' && (
      <View style={styles.createuser}>
       <View style={styles.createusermain}>
        <Text style={styles.createuserheading}>Create User</Text>
          <View style={styles.createusercontainer}>
            <Text style={styles.createusername}>Full Name<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
            placeholder='Full Name'
            value={fullname}
            onChangeText={setfullname}
            style={styles.input}
            autoCapitalize="words"
            />
          </View>
          <View style={styles.createusercontainer}>
            <Text  style={styles.createuseremail}>Email<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            />
          </View>
          <View style={styles.createusercontainer}>
            <Text style={styles.createusermobile}>Phone Number<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
            placeholder='Phone Number'
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
            autoCapitalize="none"
            />
          </View>
          <View style={styles.createusercontainer}>
            <Text style={styles.createuserpassword}>Password<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
            placeholder='*******'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            />
          </View>
          <View style={styles.createusercontainer}>
            <Text style={styles.createuserconfirmpassword}>Confirm Password<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
            placeholder='*******'
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            />
          </View>
          <View style={styles.createusercontainer}>
            <Text style={styles.createuserrole}>User Role<Text style={{ color: 'red' }}>*</Text></Text>
            <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
              style={[
              styles.input,
               {
                color: role === '' ? 'grey' : 'black' 
               }
             ]}
            >
              <Picker.Item label="Select Role" value="" enabled={false} />
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Site Manager" value="site manager" />
              <Picker.Item label="Engineer" value="engineer" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.createbutton} onPress={handleCreateUser}>
              <Text style={styles.createbuttontext}>Create User</Text>
          </TouchableOpacity>
        </View>
      </View>
     )}
     {activeButton === 'update-user' && (
    <View style={styles.updateuser}>
    
        {viewMode === 'list' ? (
      <View style={styles.manageusermain}>
       <Text style={styles.manageuserheading}>User Management</Text>
      <UserList
        users={users}
        onEdit={user => {
          setSelectedUser(user);
          setupdateName(user.name);
          setupdateEmail(user.email);
          setupdateMobile(user.mobile);
          setupdatePassword('');
          setupdateconfirmPassword('');
          setupdateRole(user.role);
          setStatus(user.status);
          setViewMode('form');
        }}
        onDelete={handleDeleteUser}
      />
     </View>
    ):(
        <View style={styles.updateusermain}>
         <Text style={styles.updateuserheading}>Update User</Text>
          <View style={styles.updateusercontainer}>
            <Text style={styles.updateusername}>New Name</Text>
            <TextInput
            placeholder='Full Name'
            value={updatename}
            onChangeText={setupdateName}
            style={styles.input}
            autoCapitalize="words"
            />
          </View>
          <View style={styles.updateusercontainer}>
            <Text  style={styles.updateuseremail}>New Email</Text>
            <TextInput
            placeholder='Email'
            value={updateemail}
            onChangeText={setupdateEmail}
            style={styles.input}
            autoCapitalize="none"
            />
          </View>
          <View style={styles.updateusercontainer}>
            <Text style={styles.updateusermobile}>New Number</Text>
            <TextInput
            placeholder='Phone Number'
            value={updatemobile}
            onChangeText={setupdateMobile}
            style={styles.input}
            autoCapitalize="none"
            />
          </View>
          <View style={styles.updateusercontainer}>
            <Text style={styles.updateuserpassword}>New Password</Text>
            <TextInput
            placeholder='*******'
            value={updatepassword}
            onChangeText={setupdatePassword}
            style={styles.input}
            autoCapitalize="none"
            />
          </View>
          <View style={styles.updateusercontainer}>
            <Text style={styles.updateuserconfirmpassword}>Confirm New Password</Text>
            <TextInput
            placeholder='*******'
            value={updateconfirmPassword}
            onChangeText={setupdateconfirmPassword}
            style={styles.input}
            autoCapitalize="none"
            />
          </View>
          <View style={styles.updateusercontainer}>
            <Text style={styles.updateuserrole}>New Role</Text>
            <Picker
            selectedValue={updaterole}
            onValueChange={(itemValue) => setupdateRole(itemValue)}
             style={styles.input}  
            >
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Site Manager" value="site manager" />
              <Picker.Item label="Engineer" value="engineer" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.updatebutton} onPress={handleUpdateUser}>
              <Text style={styles.updatebuttontext}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelbutton} onPress={() => {setViewMode('list'); clearupdateForm();}}>
              <Text style={styles.cancelbuttontext}>Cancel</Text>
          </TouchableOpacity>
       </View> 
      )}
    </View>
     )}
      {activeButton === "create-project" && (
         <View style={styles.createuser}>
            <View style={styles.createusermain}>
              <ScrollView
                style={{ maxHeight: "70vh" }}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.createuserheading}>Create Project</Text>
                <View style={styles.createusercontainer}>
                  <Text style={styles.createProjectid}>
                    Project code<Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="Project Code"
                    value={projectID}
                    onChangeText={setProjectID}
                    style={styles.projectinput}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.createusercontainer}>
                  <Text style={styles.createprojectname}>
                    Project Name<Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="Project Name"
                    value={createProjectName}
                    onChangeText={setcreateProjectName}
                    style={styles.projectinput}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.createusercontainer}>
                  <Text style={styles.createprojecttype}>
                    Project Type<Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <Picker
                    selectedValue={projectType}
                    onValueChange={(val) => setProjectType(val)}
                    style={[
                      styles.projectinput,
                      { color: projectType === "" ? "grey" : "black" },
                    ]}
                  >
                    <Picker.Item label="Select Type" value="" enabled={false} />
                    <Picker.Item label="Solar" value="Solar" />
                    <Picker.Item label="Wind" value="Wind" />
                  </Picker>
                </View>

                <TouchableOpacity
                  style={styles.createprojectbutton}
                  onPress={handleCreateProject}
                >
                  <Text style={styles.createprojectbuttontext}>Create Project</Text>
                </TouchableOpacity>
                <View style={{ marginTop: "6vw", marginLeft: "2vw" }}>
                  <Text style={styles.manageprojectheading}>
                    Existing Project{" "}
                  </Text>

                  {projects.length === 0 ? (
                    <Text
                      style={{
                        fontSize: "1.5vw",
                        textAlign: "center",
                        marginTop: "2vw",
                      }}
                    >
                      ❗ No Project Created Yet!
                    </Text>
                  ) : (
                    <View style={{ paddingHorizontal: "1vw" }}>
                      <View style={styles.existprojectheader}>
                        <Text style={styles.existprojectheaderpcode}>
                          Project Code
                        </Text>
                        <Text style={styles.existprojectheaderpname}>
                          Project Name
                        </Text>
                        <Text style={styles.existprojectheaderptype}>
                          Project Type
                        </Text>
                        <Text style={styles.existprojectheaderaction}>
                          Actions
                        </Text>
                      </View>

                      {projects.map((proj) => (
                        <View key={proj._id} style={styles.existprojectdetails}>
                          <Text style={styles.existprojectid}>
                            {proj.project_code}
                          </Text>
                          <Text style={styles.existprojectname}>
                            {proj.name}
                          </Text>
                          <Text style={styles.existprojecttype}>
                            {proj.project_type}
                          </Text>

                          <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("ViewProject", {
                                  projectId: proj._id,
                                })
                              }
                            >
                              <Text style={styles.existprojectactionview}>
                                View
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("EditProject", {
                                  projectId: proj._id,
                                })
                              }
                            >
                              <Text style={styles.existprojectactionedit}>
                                Edit
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => handleDelete(proj._id)}
                            >
                              <Text style={styles.existprojectactiondelete}>
                                Delete
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
     {activeButton === 'create-locations' && (
      viewMode === 'form'? (
    <View style={styles.createlocations}>
      <Text style={styles.createlocationsheading}>Create Locations</Text>
       <View style={styles.createlocationsmain}>
          <View style={styles.createlocationscontainer}>
            <Text style={styles.createlocationssearch}>Select Project code here:</Text>
             <Picker
                selectedValue={searchProject}
                onValueChange={(value) => setSearchProject(value)}
                style={[
                  styles.input,
                  {
                    color: searchProject === '' ? 'grey' : 'black' 
                  }
                ]}  
              >
               <Picker.Item label="-- Select a Project --" value=""enabled={false} />
                 {projects.map((proj) => (
               <Picker.Item key={proj._id} label={`${proj.project_code} - ${proj.name}`} value={proj.project_code} />
              ))}
             </Picker>
          </View>
          <TouchableOpacity style={styles.searchbutton} onPress={handleSearchProject}>
              <Text style={styles.searchbuttontext}>Search Project</Text>
          </TouchableOpacity>
        </View>
      </View>
      ):(
       <View>
        <View style={styles.createlocations}>
          <Text style={styles.createlocationsheading}>Create Locations{projectName ? ( 
            <Text style={styles.projectName}>  -  {projectName}</Text>) : null}
          </Text>
          <LocationList projectCode={searchProject} />
        </View>
       </View>
      )
     )}
     {activeButton === 'location-data' && (
      <View style={styles.locationdata}>
       <Text style={styles.locationdataheading}>Location Data</Text>
        <View style={styles.tableHeader}>
         <Text style={styles.tableSlno}>Sl. No</Text>
         <Text style={styles.tableCol}>Project Code</Text>
         <Text style={styles.tableCol}>Location ID</Text>
         <Text style={styles.tableCol}>Location Name</Text>
         <Text style={styles.tableCol}>Actions</Text>
       </View>
      <ScrollView 
        style={{ height: "68vh" }}
        showsVerticalScrollIndicator={false}
      > 
        {locationdata.length > 0 ? (
          locationdata.map((loc, index) => (
            <View key={loc._id} style={[
            styles.tableRow,
            { backgroundColor: index % 2 === 0 ? "#d5d5d555" : "#ffffff" },
             ]}>
             <Text style={styles.tableslno}>{index + 1}.</Text>
             <Text style={styles.tableCell}>{loc.project_code}</Text>
             <Text style={styles.tableCell}>{loc.loc_no}</Text>
             <Text style={styles.tableCell}>{loc.loc_name}</Text>
              <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  setMenuVisible(false);
                  setActiveMenu({ color: 'white' });
                  setActiveButton("add-field"); 
                  setSelectedLocationData(loc);
                }}
              >
               <Text style={styles.addButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteLocation(loc._id)}
              >
               <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View> 
          ))
         ) : (
        <Text style={styles.noData}>No Locations Found</Text>
         )}
        </ScrollView>
      </View>
    )}
    {activeButton === "add-field" && (
      <View style={styles.addFieldScreen}>
        <View style={styles.assessmentmain}>
  <Text style={styles.assessmentheading} numberOfLines={1} ellipsizeMode="tail">
    Select Assessment Sheet
  </Text>
  <View style={styles.assessmentIDs}>
    <Text
      style={styles.assessmentproject}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      Project ID: {selectedlocationdata.project_code}
    </Text>
    <Text
      style={styles.assessmentlocation}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      Location ID: {selectedlocationdata.loc_no}
    </Text>
  </View>
</View>
  <Assessments route={{ params: { locationObjectId: selectedlocationdata._id } }} />
    <TouchableOpacity style={styles.viewlocationdatabutton} 
        onPress={() => {
                setActiveMenu('menu');
                setMenuVisible(true);
                setActiveButton('location-data');
          }}>
            <Text style={styles.viewlocationdatatext}>⬅  Location Data</Text>
         </TouchableOpacity>
      </View>
     )}
     {(!activeButton || activeButton === 'home-button') && (
    <Text style={styles.heading}>DashBoard!</Text>
     )}
    </View>
  </View>
  );
}
