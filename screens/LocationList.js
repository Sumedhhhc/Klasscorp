import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './locationliststyle.js';

const LocationList = ({ projectCode }) => {
  const [locations, setLocations] = useState([]);
  const [locId, setLocId] = useState('');
  const [locname, setLocName] = useState('');
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [editLocation, setEditLocation] = useState(null);
  const [editLocId, setEditLocId] = useState('');
  const [editLocName, setEditLocName] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [ViewLocId, setViewLocId] = useState('');
  const [ViewLocName, setViewLocName] = useState('');
  const [ViewAssignedTo, setViewAssignedTo] = useState('');
  const [ViewDescription, setViewDescription] = useState('');
  const [ViewPriority, setViewPriority] = useState('');
  

  useEffect(() => {
    if (projectCode) {
      setSearch('');
      fetchLocations();
    }
  }, [projectCode]);

  const fetchLocations = async () => {
  
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:3000/api/project/location/getLocation/?project_code=${projectCode}`, {
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
      setLocations(response.data.locations);
      setFiltered(response.data.locations);
    } catch (error) {
      console.error('Failed to fetch locations:', error.response?.data || error.message);
    }
  };

  const handleAddLocation = async () => {
    if (!locname || !locId) {
      alert('Error: Both Location name and Location ID are required');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:3000/api/project/location/createLocation?project_code=${projectCode}`,
      {
        loc_name: locname,
        loc_no: locId
      },
       {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Successfully added the location!');
      fetchLocations();
      setLocId('');
      setLocName('');
    } catch (error) {
      alert('Error: Unable to add the location!\n'+ error.response?.data?.msg || error.message);
    }
  };

  const handleDelete = async (locId) => {
   const token = await AsyncStorage.getItem('token');
    if (Platform.OS === 'web') {
          const confirm = window.confirm('Are you sure you want to delete this user?');
          if (confirm) {
            onDelete(locId);
          } 
    }
    else
    {
        Alert.alert('Confirm', 'Are you sure you want to delete this location?', [
        { text: 'No' },
        { text: 'Yes', onPress: async () => onDelete(locId) }],
        { cancelable: true }
      );
    }
  };

  const onDelete = async (locationId) => {
   const token = await AsyncStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:3000/api/project/location/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.alert('Location deleted successfully!');
    fetchLocations();
  } catch (error) {
    console.error('Failed to delete location:', error.response?.data || error.message);
    alert('Error'+ error.response?.data?.msg || 'Failed to delete location');
  }
};


  const handleSearch = () => {
    if(!search.trim) {
      window.alert('The search bar is empty, Enter something first!');
    }
  };
    const filteredList = locations.filter((loc) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return(
      loc.loc_no.toLowerCase().includes(q) ||
      loc.loc_name.toLowerCase().includes(q) ||
      loc.assigned_To.toLowerCase().includes(q)
    );
  });

  const clearForm = () => {
    setLocName('');
    setLocId('');
  };

const handleUpdateLocation = async () => {

  const token = await AsyncStorage.getItem('token');
  try {
    await axios.put(`http://localhost:3000/api/project/location/${editLocation._id}?project_code=${projectCode}`,
    {
      loc_no: editLocId,
      loc_name: editLocName,
      assigned_To: editAssignedTo,
      description: editDescription,
      priority: editPriority,
    },
    { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    alert("Location updated successfully!");
    fetchLocations();
    setViewMode('list');
    setEditLocation(null);
  } catch (error) {
    alert("Error: " + (error.response?.data?.msg || error.message));
  }
};


  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.colId}>{item.loc_no}</Text>
      <Text style={styles.colName}>{item.loc_name}</Text>
      <Text style={styles.colAssign}>{item.assigned_To}</Text>
      <View style={styles.colActions}>
        <TouchableOpacity onPress={() => {
            setEditLocation(item);
            setEditLocId(item.loc_no);
            setEditLocName(item.loc_name);
            setEditAssignedTo(item.assigned_To);
            setEditDescription(item.description);
            setEditPriority(item.priority);
            setViewMode('edit');
            }}>
           <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            setViewLocId(item.loc_no);
            setViewLocName(item.loc_name);
            setViewAssignedTo(item.assigned_To);
            setViewDescription(item.description);
            setViewPriority(item.priority);
            setViewMode('view');
            }}>
          <Text style={styles.view}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

return (
  viewMode === 'list' ? (
     <View style={styles.createlocations}>
      <View style={styles.container}>
        <View style={styles.createlocationcontainer} >
        <Text style={styles.title}>Add New Location</Text>
        <View style={styles.formRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter Location ID"
            value={locId}
            onChangeText={setLocId}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Location Name"
            value={locname}
            onChangeText={setLocName}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
            <Text style={styles.clearButtonText}>Clear Form</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddLocation}>
            <Text style={styles.addButtonText}>Add Location</Text>
          </TouchableOpacity>
        </View>
       </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search by Location ID or Name"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSearch('');
            setFiltered(locations);
          }} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContainer}>
          <View style={[styles.row, styles.tableHeader]}>
            <Text style={styles.headId}>Location ID</Text>
            <Text style={styles.headName}>Location Name</Text>
            <Text style={styles.headAssign}>Assigned To</Text>
            <Text style={styles.headActions}>Actions</Text>
          </View>

          {filteredList.length === 0 ? (
             <View style={{ padding: 15, alignItems: 'center' }}>
               <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#888' }}>
                 Add locations to view here for this project!
               </Text>
             </View>
           ) : (
             <FlatList
               data={filteredList}
               renderItem={renderItem}
               keyExtractor={item => item._id}
               showsVerticalScrollIndicator={false}
             />
            )}
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryBox}>Total Locations<br/><Text style={styles.value}>{locations.length}</Text></Text>
          <Text style={styles.summaryBox}>High Priority (P1)<br/><Text style={styles.value}>N/A</Text></Text>
          <Text style={styles.summaryBox}>In Progress<br/><Text style={styles.value}>N/A</Text></Text>
          <Text style={styles.summaryBox}>Completed<br/><Text style={styles.value}>N/A</Text></Text>
        </View>
      </View>
    </View>
  ) : viewMode === 'edit' ? (
    <View style={styles.updatelocation}>
  <View style={styles.updatelocationmain}>
    <Text style={styles.updatelocationheading}>Update Location</Text>

    <View style={styles.updatelocationcontainer}>
      <Text style={styles.updatelocationid}>New Location ID</Text>
      <TextInput
        placeholder="Location ID"
        value={editLocId}
        onChangeText={setEditLocId}
        style={styles.input}
      />
    </View>

    <View style={styles.updatelocationcontainer}>
      <Text style={styles.updatelocationname}>New Location Name</Text>
      <TextInput
        placeholder="Location Name"
        value={editLocName}
        onChangeText={setEditLocName}
        style={styles.input}
      />
    </View>
    <View style={styles.updatelocationcontainer}>
      <Text style={styles.updatelocationassignedto}>New Site Manager</Text>
      <TextInput
        placeholder="New Site Manager"
        value={editAssignedTo}
        onChangeText={setEditAssignedTo}
        style={styles.input}
      />
    </View>
    <View style={styles.updatelocationcontainer}>
      <Text style={styles.updatelocationdescription}>New description</Text>
      <TextInput
        placeholder="New description"
        value={editDescription}
        onChangeText={setEditDescription}
        style={styles.input}
      />
    </View>
    <View style={styles.updatelocationcontainer}>
      <Text style={styles.updatelocationpriority}>New Priority</Text>
      <TextInput
        placeholder="New Priority"
        value={editPriority}
        onChangeText={setEditPriority}
        style={styles.input}
      />
    </View>
    <TouchableOpacity style={styles.updatelocationbutton} onPress={handleUpdateLocation}>
      <Text style={styles.updatelocationbuttontext}>Save Changes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.updatelocationcancel} onPress={() => setViewMode('list')}>
      <Text style={styles.updatelocationcanceltext}>Cancel</Text>
    </TouchableOpacity>
   </View>
  </View>
  ) : (
    <View style={styles.viewlocation}>
   <View style={styles.viewlocationmain}>
    <Text style={styles.viewlocationheading}>Location Info</Text>
    <View style={styles.viewlocationcontainer}>
      <Text style={styles.viewlocationid}>Location ID : {ViewLocId}</Text>
    </View>
    <View style={styles.viewlocationcontainer}>
      <Text style={styles.viewlocationname}>Location Name : {ViewLocName}</Text>
    </View>
    <View style={styles.viewlocationcontainer}>
      <Text style={styles.viewlocationassignedto}>Site Manager : {ViewAssignedTo}</Text>
    </View>
    <View style={styles.viewlocationcontainer}>
      <Text style={styles.viewlocationdescription}>Description : {ViewDescription}</Text>
    </View>
    <View style={styles.viewlocationcontainer}>
      <Text style={styles.viewlocationpriority}>Priority : {ViewPriority}</Text>
    </View>
    <TouchableOpacity style={styles.viewlocationreturnbutton} onPress={() => setViewMode('list')}>
      <Text style={styles.viewlocationreturntext}>⬅  Return</Text>
    </TouchableOpacity>
   </View>
  </View>
  )
)};
export default LocationList;
