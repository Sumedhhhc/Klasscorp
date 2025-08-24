import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

const API_BASE = "http://localhost:3000";

const makeProjectUrl = (id) => `${API_BASE}/api/project/projects/${id}`;


const formatDate = (d) => {
  if (!d) return "N/A";
  const dt = new Date(d);
  if (isNaN(dt)) return "N/A";
  return dt.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusStyles = {
  planning: { bg: "#E9F4FF", fg: "#135D9E", border: "#BBD9F2" },
  active: { bg: "#E9FBEA", fg: "#176B3A", border: "#BFE8C8" },
  completed: { bg: "#F3F0FF", fg: "#4E37B9", border: "#D8D1FF" },
};

const ViewProjectScreen = ({ route, navigation }) => {
  const { projectId } = route.params;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchProject = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      setError("");
      const url = makeProjectUrl(projectId);

      const res = await axios.get((url),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
      setProject(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch project:",
        err?.response?.data || err?.message
      );
      setError("Failed to load project. Pull to refresh to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProject();
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!project) {
    return (
      <ScrollView
        contentContainerStyle={styles.centerContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ color: "#B00020", marginBottom: 12 }}>
          {error || "Project not found"}
        </Text>
      </ScrollView>
    );
  }

  const statusTokens = statusStyles[project.status] || statusStyles.planning;

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.outer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.card}>
          <Text style={styles.title}>Project Details</Text>

          {error ? (
            <View style={styles.errorBanner}>
              <Ionicons name="warning-outline" size={18} color="#B00020" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* STATUS PILL */}
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: statusTokens.bg,
                borderColor: statusTokens.border,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="progress-check"
              size={16}
              color={statusTokens.fg}
            />
            <Text style={[styles.statusText, { color: statusTokens.fg }]}>
              {project.status?.charAt(0).toUpperCase() +
                project.status?.slice(1)}
            </Text>
          </View>

          {/* CORE DETAILS */}
          <Text style={styles.sectionHeading}>Core</Text>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Ionicons name="barcode-outline" size={18} color="#1A4A7F" />
              <Text style={styles.label}>Project Code</Text>
            </View>
            <Text selectable style={styles.value}>
              {project.project_code || "N/A"}
            </Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Ionicons name="business-outline" size={18} color="#1A4A7F" />
              <Text style={styles.label}>Project Name</Text>
            </View>
            <Text selectable style={styles.value}>
              {project.name || "N/A"}
            </Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <MaterialCommunityIcons
                name="folder-cog-outline"
                size={18}
                color="#1A4A7F"
              />
              <Text style={styles.label}>Project Type</Text>
            </View>
            <Text selectable style={styles.value}>
              {project.project_type || "N/A"}
            </Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#1A4A7F"
              />
              <Text style={styles.label}>Description</Text>
            </View>
            <Text selectable style={styles.value}>
              {project.description || "—"}
            </Text>
          </View>

          {/* SCHEDULE */}
          <Text style={styles.sectionHeading}>Schedule</Text>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Ionicons name="calendar-outline" size={18} color="#1A4A7F" />
              <Text style={styles.label}>Start Date</Text>
            </View>
            <Text style={styles.value}>
              {project.start_date
                ? new Date(project.start_date).toDateString()
                : "N/A"}
            </Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <Ionicons name="calendar-sharp" size={18} color="#1A4A7F" />
              <Text style={styles.label}>Expected Completion</Text>
            </View>
            <Text style={styles.value}>
              {project.expected_completion
                ? new Date(project.expected_completion).toDateString()
                : "N/A"}
            </Text>
          </View>

          {/* TECHNICAL */}
          <Text style={styles.sectionHeading}>Technical</Text>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <MaterialCommunityIcons
                name="flash-outline"
                size={18}
                color="#1A4A7F"
              />
              <Text style={styles.label}>Capacity</Text>
            </View>
            <Text style={styles.value}>
              {project.capacity_mw != null
                ? `${project.capacity_mw} MW`
                : "N/A"}
            </Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={18}
                color="#1A4A7F"
              />
              <Text style={styles.label}>Status</Text>
            </View>
            <Text style={styles.value}>
              {project.status ? project.status : "N/A"}
            </Text>
          </View>

          {/* META */}
          <Text style={styles.sectionHeading}>Meta</Text>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={18}
                color="#1A4A7F"
              />
              <Text style={styles.label}>Created</Text>
            </View>
            <Text style={styles.value}>{formatDate(project.created_at)}</Text>
          </View>

          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <MaterialCommunityIcons
                name="clock-check-outline"
                size={18}
                color="#1A4A7F"
              />
              <Text style={styles.label}>Last Updated</Text>
            </View>
            <Text style={styles.value}>{formatDate(project.updated_at)}</Text>
          </View>

        </View>
      </ScrollView>

      {/* FAB: Edit */}
      <Pressable
        onPress={() => navigation.navigate("EditProject", { projectId })}
        style={({ pressed }) => [
          styles.fabedit,
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
        ]}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <Ionicons name="pencil" size={24} color="#fff" />
        <Text style={styles.fabeditText}>Edit</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Klasscorp-Home", { projectId })}
        style={({ pressed }) => [
          styles.fabhome,
          pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
        ]}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <Ionicons name="home" size={24} color="#fff" />
        <Text style={styles.fabhomeText}>Home</Text>
      </Pressable>
    </>
  );
};

export default ViewProjectScreen;

const styles = StyleSheet.create({
  outer: {
    minHeight: "100%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#E9F1F7",
  },
  centerContainer: {
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#E9F1F7",
  },
  card: {
    width: "100%",
    maxWidth: 760, 
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A4A7F",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  errorBanner: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#FFE9EB",
    borderColor: "#FFC0C6",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: { color: "#B00020", marginLeft: 8 },

  sectionHeading: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6A7A8B",
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  item: {
    borderWidth: 1,
    borderColor: "#E3ECF5",
    backgroundColor: "#FAFCFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    columnGap: 8,
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
    color: "#244B74",
    marginLeft: 6,
  },
  value: {
    fontSize: 16,
    color: "#374B63",
    lineHeight: 22,
  },

  statusPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  fabedit: {
    position: "absolute",
    right: 30,
    bottom: 24,
    backgroundColor: "#1A4A7F",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      default: {}, // web
    }),
  },

  fabhome: {
    position: "absolute",
    right: 140,
    bottom: 24,
    backgroundColor: "#1A4A7F",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      default: {}, // web
    }),
  },

  fabeditText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16.2,
  },

    fabhomeText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 15,
  },
});
