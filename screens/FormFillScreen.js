import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import formFields from "./formFields.json";
import styles from "./formfillstyles";

export default function FormFillScreen({ route, navigation }) {
  const { assessment, locationObjectId } = route.params;
  const [sections, setSections] = useState([]); // sections with subHeading + inputs
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      const form = formFields.find((f) => f.assessment === assessment);
      if (form) {
        setSections(form.fields);

        const initialData = {};
        form.fields.forEach((section) => {
          section.inputs.forEach((input) => {
            initialData[input.name] = "";
          });
        });
        setFormData(initialData);

        try {
          const token = await AsyncStorage.getItem("token");

          const url = `http://localhost:3000/api/task/getByLocation?locationId=${encodeURIComponent(
            locationObjectId
          )}&type=${encodeURIComponent(assessment)}`;

          const res = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          console.log("Response:", res.data);
          const record = res.data.data;
          if (record) {
            const flattened = flattenRecord(record);
            setFormData({ ...initialData, ...flattened });
          }
        } catch (err) {
          console.log("Error fetching form data:", err.response?.data || err.message);
        }
      } else {
        console.log("Form not found in formFields.json for this assessment");
      }
    };

    fetchFormData();
  }, [assessment, locationObjectId]);

  const flattenRecord = (record, parentKey = "", result = {}) => {
    for (const [key, value] of Object.entries(record)) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      ) {
        flattenRecord(value, fullKey, result);
      } else {
        result[fullKey] = value ?? "";
      }
    }
    return result;
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const cleanedData = {};
      sections.forEach((section) => {
        section.inputs.forEach((input) => {
          const value = formData[input.name];
          if (value === "") {
            cleanedData[input.name] = null;
          } else if (input.type === "decimal" || input.type === "number") {
            const num = parseFloat(value);
            cleanedData[input.name] = isNaN(num) ? null : num;
          } else {
            cleanedData[input.name] = value;
          }
        });
      });

      await axios.post(
        "http://localhost:3000/api/task/createassessment",
        {
          locationObjectId,
          assessmentType: assessment,
          ...cleanedData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigation.goBack();
    } catch (err) {
      console.error("Error saving form:", err.response?.data || err.message);
    }
  };

  const handleClear = () => {
    const clearedData = {};
    sections.forEach((section) => {
      section.inputs.forEach((input) => {
        clearedData[input.name] = "";
      });
    });
    setFormData(clearedData);
  };

  const renderInput = (input, idx) => {
    const { name, label, type } = input;

    // Dropdowns
    if (type.includes("/")) {
  const options = type.split("/").map((opt) => opt.trim());
  return (
    <View key={idx} style={styles.inputWrapper}>
      <Text style={styles.label}>{label}:</Text>
       <Picker
         selectedValue={formData[name] || ""}
         onValueChange={(value) => handleChange(name, value)}
         style={[styles.input, { color: formData[name] ? "black" : "grey" }]}
       >
         <Picker.Item label={`-- Select ${label} --`} value="" />
         {options.map((opt, i) => (
           <Picker.Item
             key={i}
             label={opt.charAt(0).toUpperCase() + opt.slice(1)}
             value={opt}
           />
         ))}
       </Picker>
     </View>
    );
   }

    // Numbers
    if (type === "number" || type === "decimal") {
      return (
        <View key={idx} style={styles.inputWrapper}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            placeholder={label}
            value={formData[name] || ""}
            onChangeText={(value) => handleChange(name, value)}
            keyboardType="numeric"
          />
        </View>
      );
    }

    // Dates
    if (type === "date") {
      return (
        <View key={idx} style={styles.inputWrapper}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData[name] || ""}
            onChangeText={(value) => handleChange(name, value)}
          />
        </View>
      );
    }

    // text input
    return (
      <View key={idx} style={styles.inputWrapper}>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
          style={styles.input}
          placeholder={label}
          value={formData[name] || ""}
          onChangeText={(value) => handleChange(name, value)}
        />
      </View>
    );
  };

  return (
    <>
      <Image
        source={require('../assets/images/home-user-background.jpg')}
        style={styles.backimage}
        resizeMode="cover"
      />
    <ScrollView 
       contentContainerStyle={styles.container}>
      <Text style={styles.title}>{assessment}</Text>

      {sections.map((section, sIdx) => (
        <View key={sIdx} style={styles.sectionBox}>
          <Text style={styles.subHeading}>{section.subHeading}</Text>
          <View style={styles.sectionContent}>
            {section.inputs.map((input, idx) => renderInput(input, idx))}
          </View>
        </View>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={handleClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
   </>
  );
}
