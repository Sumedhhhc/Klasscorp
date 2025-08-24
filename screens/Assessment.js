import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./assessmentsstyles.js";
import formFields from "./formFields.json";

export default function Assessments({ route }) {
  const navigation = useNavigation();
  const { locationObjectId } = route.params;

  const [tiles, setTiles] = useState(
    [
      {
        key: "GO & WRA Assessment",
        title: "GO & WRA Assessment",
        description: "Wind Resource Assessment and Government Order Compliance",
        buttons: [
          "WTG Details as per GO",
          "Actual (Shifting/Revised)",
          "Final FMB Coordinates",
          "Assessment Results",
        ],
      },
      {
        key: "Location & Farmer Details",
        title: "Location & Farmer Details",
        description: "Land and farmer information management",
        buttons: ["Location Information", "Farmer Details"],
      },
      {
        key: "Document Collection Details",
        title: "Document Collection Details",
        description: "Document management and collection tracking",
        buttons: ["Document Information", "Collection Status"],
      },
      {
        key: "TSR Tracker & Registration",
        title: "TSR Tracker & Registration",
        description: "Technical Service Request tracking and registration",
        buttons: ["TSR Information", "Registration Details"],
      },
      {
        key: "Post Registration",
        title: "Post Registration",
        description: "Post-registration activities and follow-up",
        buttons: ["Post Registration Activities", "Follow-up Details"],
      },
      {
        key: "PODI 11E Alignment",
        title: "PODI 11E Alignment",
        description: "PODI 11E alignment and coordination details",
        buttons: ["Alignment Information", "Technical Details"],
      },
      {
        key: "NA Tracker",
        title: "NA Tracker",
        description: "NA tracker description placeholder",
        buttons: ["Footprints Details", "Order & Payment Details"],
      },
    ].map((tile) => {
      const formfields = formFields.find(
        (a) => a.assessment === tile.title
      );

      // Count total number of inputs
      const totalInputs = formfields
        ? formfields.fields.reduce(
            (sum, section) => sum + (section.inputs ? section.inputs.length : 0),
            0
          )
        : 0;

      return { ...tile, totalFields: totalInputs, filled: 0 };
    })
  );

  const fetchProgress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const updatedTiles = await Promise.all(
        tiles.map(async (tile) => {
          try {
            const res = await axios.get(
              `http://localhost:3000/api/task/getByLocation?locationId=${locationObjectId}&type=${encodeURIComponent(tile.key)}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            const record = res.data.data;
            let filledCount = 0;

            if (record) {
              const formfields = formFields.find(
                (a) => a.assessment === tile.title
              );

              if (formfields) {
                const allInputs = formfields.fields.flatMap(
                  (section) => section.inputs
                );

                // Count how many inputs are filled
                filledCount = allInputs.reduce((count, input) => {
                  const keys = input.name.split(".");
                  let val = record;
                  for (const k of keys) {
                    if (val && typeof val === "object") {
                      val = val[k];
                    } else {
                      val = null;
                      break;
                    }
                  }
                  if (val !== null && val !== "") count++;
                  return count;
                }, 0);
              }
            }

            return { ...tile, filled: filledCount };
          } catch (err) {
            console.error(
              `Error fetching progress for ${tile.key}:`,
              err.response?.data || err.message
            );
            return tile;
          }
        })
      );

      setTiles(updatedTiles);
    } catch (err) {
      console.error("Error in fetchProgress:", err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (route.params?.updatedTile) {
        const { index, filledCount } = route.params.updatedTile;

        setTiles((prev) =>
          prev.map((tile, i) =>
            i === index ? { ...tile, filled: filledCount } : tile
          )
        );
        navigation.setParams({ updatedTile: undefined });
      }
    }, [route.params?.updatedTile])
  );

  const firstRow = tiles.slice(0, 4);
  const secondRow = tiles.slice(4);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.row}>
        {firstRow.map((tile, index) => {
          const pending = tile.totalFields - tile.filled;
          const progressPercent =
            tile.totalFields > 0 ? (tile.filled / tile.totalFields) * 100 : 0;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.tile, { flex: 1 }]}
              onPress={() =>
                navigation.navigate("Assessment-Form", {
                  assessment: tile.title,
                  index,
                  currentFilled: tile.filled,
                  totalFields: tile.totalFields,
                  locationObjectId,
                })
              }
            >
              <Text style={styles.tileTitle}>{tile.title}</Text>
              <Text style={styles.tileDescription}>{tile.description}</Text>
              <View style={styles.tileButtons}>
                {tile.buttons.map((btn, i) => (
                  <Text key={i} style={styles.tileButtonText}>
                    {btn}
                  </Text>
                ))}
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.progressHeading}>Progress</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progressPercent}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.tileProgress}>
                <Text style={styles.completed}>✅ {tile.filled} filled </Text>
                <Text style={styles.pending}>⏳ {pending} pending</Text>
              </View>
              <Text style={styles.tileTotal}>
                Total {tile.totalFields} fields
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.row}>
        {secondRow.map((tile, index) => {
          const pending = tile.totalFields - tile.filled;
          const progressPercent =
            tile.totalFields > 0 ? (tile.filled / tile.totalFields) * 100 : 0;
          const adjustedIndex = index + 4;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.tile, { flex: 1 }]}
              onPress={() =>
                navigation.navigate("Assessment-Form", {
                  assessment: tile.title,
                  index: adjustedIndex,
                  currentFilled: tile.filled,
                  totalFields: tile.totalFields,
                  locationObjectId,
                })
              }
            >
              <Text style={styles.tileTitle}>{tile.title}</Text>
              <Text style={styles.tileDescription}>{tile.description}</Text>
              <View style={styles.tileButtons}>
                {tile.buttons.map((btn, i) => (
                  <Text key={i} style={styles.tileButtonText}>
                    {btn}
                  </Text>
                ))}
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.progressHeading}>Progress</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progressPercent}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.tileProgress}>
                <Text style={styles.completed}>✅ {tile.filled} filled </Text>
                <Text style={styles.pending}>⏳ {pending} pending</Text>
              </View>
              <Text style={styles.tileTotal}>
                Total {tile.totalFields} fields
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
