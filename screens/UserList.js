import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useState } from 'react';
import { Alert, FlatList, Image, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';
import styles from './userliststyles';

const UserList = ({ users, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [statusMap, setStatusMap] = useState(
    Object.fromEntries(users.map(user => [user._id, user.status]))
  );

  const handleSearch = () => {
    if(!search.trim) {
      window.alert('The search bar is empty, Enter something first!');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    const token = await AsyncStorage.getItem('token');

    try {
      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      setStatusMap(prev => ({
        ...prev,
        [userId]: newStatus,
      }));
    } catch (error) {
      console.error('Status update failed:', error.response?.data || error.message);
    }
  };

  const handleDeletePress = (userId) => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm('Are you sure you want to delete this user?');
      if (confirm) {
        onDelete(userId);
      }
    } else {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this user?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => onDelete(userId) }
        ],
        { cancelable: true }
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.mobile.toString().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.status.toLowerCase().includes(query)
    );
  });

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.row,
        index % 2 === 0 ? styles.rowEven : styles.rowOdd,
      ]}
    >
      <Text style={styles.colSerial}>{index + 1}.</Text>
      <Text style={styles.colName}>{item.name}</Text>
      <Text style={styles.colEmail}>{item.email}</Text>
      <Text style={styles.colNumber}>{item.mobile}</Text>
      <Text style={styles.colRole}>{item.role}</Text>

      <View style={styles.colStatus}>
        <Picker
          selectedValue={statusMap[item._id] || item.status}
          style={styles.picker}
          onValueChange={(value) => handleStatusChange(item._id, value)}
          dropdownIconColor="#000"
        >
          <Picker.Item label="🟢  Active" value="active" />
          <Picker.Item label="⚫  Inactive" value="inactive" />
          <Picker.Item label="🔴  Suspended" value="suspended" />
        </Picker>
      </View>

      <View style={styles.colActions}>
        <Pressable onPress={() => onEdit(item)}>
          <Image 
            source={require('../assets/icon/pencil_icon.png')}
            style={styles.actionicon}
            resizeMode='contain'
          />
        </Pressable>
        <Pressable onPress={() => handleDeletePress(item._id)}>
          <Image 
            source={require('../assets/icon/dustbin_icon.png')}
            style={styles.actionicon}
            resizeMode='contain'
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.search}>
        <Text style={styles.searchtext}>Search</Text>
         <TextInput
         placeholder='Search/Filter by Full name, Email, Number, Role or Status'
         value = {search}
         onChangeText= {setSearch}
         style={styles.input}
         />
         <TouchableOpacity style={styles.searchbutton} onPress={handleSearch}>
            <Image
            source = {require('../assets/icon/search_icon.png')}
            style={styles.searchicon}
            resizeMode='contain'
            />
         </TouchableOpacity>
         <TouchableOpacity style={styles.clearbutton} onPress={() => setSearch('')}>
           <Text style={styles.cleartext}>Clear</Text>
         </TouchableOpacity>
      </View>
    <View style={styles.scrollContainer}>
      <View style={[styles.row, styles.headerRow]}>
        <Text style={styles.headcolSerial}>Sl. No</Text>
        <Text style={styles.headcolName}>Name</Text>
        <Text style={styles.headcolEmail}>Email</Text>
        <Text style={styles.headcolNumber}>Number</Text>
        <Text style={styles.headcolRole}>Role</Text>
        <Text style={styles.headcolStatus}>Status</Text>
        <Text style={styles.headcolActions}>Actions</Text>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.table}
        showsVerticalScrollIndicator={false}
      />
    </View>
   </View>
  );
};

export default UserList;
