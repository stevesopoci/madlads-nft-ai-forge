import { View, Text, StyleSheet } from "react-native";

export default function VideoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎥 AI Video Generation Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#888",
    fontSize: 18,
  },
});
