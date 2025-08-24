import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const isWeb = width > 800;

const mobilestyles = {};

const webstyles = {
  container: {
    flex: 1,
    padding: "2vh",
    alignItems: "center",
  },

  backimage: {
    width: '110vw',
    height: '110vh',
    position: 'absolute',
    marginLeft: '-4vw',
    marginTop: '-3.5vw',
    opacity: 0.3,
},

  title: {
    fontSize: isWeb ? "2vw" : "5vw",
    fontWeight: "bold",
    marginBottom: "3vh",
    textAlign: "center",
    color: "#1d3c9bff",
  },

  sectionBox: {
    width: "70vw",
    marginBottom: "3vh",
    paddingHorizontal: '1.4vw',
    paddingVertical: "1vw",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#42b839f3',
  },

  subHeading: {
    fontSize: "1.4vw",
    fontWeight: "600",
    width: '66.6vw',
    paddingBottom: '2vh',
    paddingVertical: "1vh",
    paddingHorizontal: "1.5vw",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    color: "#173f9dff",
    borderBottomWidth: 3,
    borderBottomColor: '#42b839f3',
  },

  sectionContent: {
    marginTop: "2vw",
    marginLeft: "2vw",
    padding: "1vh",
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "flex-start", 
  },

  inputWrapper: {
    marginBottom: "3vh",
    marginRight: "5vw",
  },
  label: {
    fontWeight: "600",
    fontSize: "1.1vw",
    marginBottom: "0.8vh",
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: "1vh",
    fontSize: "1.1vw",
    width: "16.3vw",
    backgroundColor: "#f8f8f8ff",
    placeholderTextColor: 'grey',
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "3vh",
    marginBottom: "4vh",
    gap: "1vw",
    width: "65vw",
    maxWidth: "80vw",
  },
  button: {
    paddingVertical: "1vh",
    paddingHorizontal: "2vw",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    marginBottom: '4vw',
  },
  clearButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    color: "#fff",
    fontSize: "1vw",
    fontWeight: "600",
  },
};

const styles = Platform.OS === "web" ? webstyles : mobilestyles;

export default StyleSheet.create(styles);
