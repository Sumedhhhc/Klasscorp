import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-root-toast";

const EditProjectScreen = ({ route, navigation }) => {
  const { projectId } = route.params;

  const [loading, setLoading] = useState(true);

  // Fields
  const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState(""); // dropdown: solar/wind
  const [description, setDescription] = useState("");
  const [capacityMw, setCapacityMw] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(""); // <-- string
  const [expectedCompletion, setExpectedCompletion] = useState(""); // <-- string

  // API base
  const API_BASE = "http://localhost:3000";

  const toInputDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`; // "YYYY-MM-DD"
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get(
        `${API_BASE}/api/project/projects/${projectId}`,
        {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         }    
       });
      const data = res.data;

      // Autofill first 3 fields, others editable
      setProjectCode(data.project_code || "");
      setProjectName(data.name || "");
      setProjectType(data.project_type || ""); // directly use the string
      setDescription(data.description || "");
      setCapacityMw(data.capacity_mw?.toString() || "");
      setStartDate(toInputDate(data.start_date));
      setExpectedCompletion(toInputDate(data.expected_completion));
    } catch (err) {
      console.error("Failed to fetch project:", err);
      Toast.show({
        type: "error",
        text1: "Failed to fetch project",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async () => {
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.put(
        `${API_BASE}/api/project/projects/${projectId}`,
        {
          project_code: projectCode,
          name: projectName,
          project_type: projectType,
          description: description,
          capacity_mw: Number(capacityMw),
          start_date: startDate || null,
          expected_completion: expectedCompletion || null,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Toast.show({ 
        type: "success", 
        text1: "Project updated successfully ✅",
       }); 
       fetchProject(); // refresh 
       setTimeout(() => {
        navigation.navigate("Klasscorp-Home", { projectId }); 
       }, 2000); 
       } catch (err) 
       { console.error("Update error:", err);
        Toast.show({ 
       type: "error", 
       text1: "Failed to update project ❌", });
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Edit Project</Text>

      <View style={styles.card}>
        {/* Project Code */}
        <Text style={styles.label}>Project Code</Text>
        <TextInput
          style={styles.input}
          value={projectCode}
          onChangeText={setProjectCode}
        />

        {/* Project Name */}
        <Text style={styles.label}>Project Name</Text>
        <TextInput
          style={styles.input}
          value={projectName}
          onChangeText={setProjectName}
        />

        {/* Project Type */}
        <Text style={styles.label}>Project Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={projectType}
            onValueChange={(val) => setProjectType(val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Solar" value="Solar" />
            <Picker.Item label="Wind" value="Wind" />
          </Picker>
        </View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
          multiline
        />

        {/* Capacity */}
        <Text style={styles.label}>Capacity (MW)</Text>
        <TextInput
          style={styles.input}
          value={capacityMw}
          onChangeText={setCapacityMw}
          keyboardType="numeric"
          placeholder="Enter Capacity"
        />

        {/* Start Date */}
        <Text style={styles.label}>Start Date</Text>
        {Platform.OS === "web" ? (
          <TextInput
            style={styles.input}
            type="date"
            placeholder="YYYY-MM-DD"
            value={startDate} //"YYYY-MM-DD"
            onChangeText={setStartDate}
          />
        ) : (
          <DateTimePicker
            value={startDate ? new Date(startDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) setStartDate(toInputDate(date));
            }}
          />
        )}

        {/* Expected Completion */}
        <Text style={styles.label}>Expected Completion</Text>
        {Platform.OS === "web" ? (
          <TextInput
            style={styles.input}
            type="date"
            placeholder="YYYY-MM-DD"
            value={expectedCompletion} // <-- string
            onChangeText={setExpectedCompletion}
          />
        ) : (
          <DateTimePicker
            value={
              expectedCompletion ? new Date(expectedCompletion) : new Date()
            }
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) setExpectedCompletion(toInputDate(date));
            }}
          />
        )}

        {/* Status */}
        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select status" value="" />
            <Picker.Item label="Planning" value="planning" />
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProject}>
          <Text style={styles.buttonText}>Update Project</Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
};

export default EditProjectScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e5ec",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A4A7F",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: "95%", 
    maxWidth: 600, 
    backgroundColor: "rgba(194, 128, 115, 0.39)",
    borderRadius: 25,
    padding: 30,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderRadius: 15,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    fontSize: 16,
  },
  pickerWrapper: {
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 1,
    borderColor: "rgba(170, 162, 162, 0.63)",
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 2 : 0,
  },
  picker: {
    width: "100%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1A4A7F",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#1A4A7F",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
