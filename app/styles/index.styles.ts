// styles/index.styles.ts
// Styles for the HomeScreen (Mad Lads AI Forge)

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ─── Layout ────────────────────────────────────────────────
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
  },

  // ─── Input Fields ──────────────────────────────────────────
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  idInput: {
    flex: 0.6,
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    textAlign: "center",
  },
  promptInput: {
    flex: 4.4,
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
  },

  // ─── Media Display ─────────────────────────────────────────
  mediaWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
    position: "relative",
  },
  imageBase: {
    width: "100%",
    height: 300,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    tintColor: "#888",
  },
  realImage: {
    borderRadius: 0,
    opacity: 1,
  },
  realImageLoading: {
    borderRadius: 0,
    opacity: 0,
  },
  video: {
    width: "100%",
    height: 300,
  },

  // ─── Feedback / Status ─────────────────────────────────────
  loadingOverlay: {
    position: "absolute",
    paddingBottom: 100,
    zIndex: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default styles;
