import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function HomeScreen() {
  const [id, setId] = useState("1");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMadLad = async () => {
    try {
      setLoading(true);
      setError("");
      // TODO: Upgrade to fetch on-chain metadata via Helium API
      const url = `https://madlads.s3.us-west-2.amazonaws.com/images/${id}.png`;
      setImageUrl(url);
    } catch (err) {
      setError("Failed to fetch NFT.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Mad Lads AI Forge</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mad Lads ID"
          keyboardType="numeric"
          value={id}
          onChangeText={setId}
        />
        <Button title="Fetch Mad Lad" onPress={fetchMadLad} />

        {loading && <ActivityIndicator size="large" style={styles.loading} />}

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        {imageUrl !== "" && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#000", // basic dark theme
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  image: {
    marginTop: 20,
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  loading: {
    marginTop: 20,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
