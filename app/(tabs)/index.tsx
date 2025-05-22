import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function HomeScreen() {
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const defaultImage =
    "https://madlads.s3.us-west-2.amazonaws.com/images/1.png";
  const imageToShow = imageUrl !== "" ? imageUrl : defaultImage;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      setImageUrl("");
      return;
    }

    setLoading(true);
    setError("");
    setImageLoaded(false);

    const timeout = setTimeout(() => {
      const url = `https://madlads.s3.us-west-2.amazonaws.com/images/${id}.png`;
      setImageUrl(url);
    }, 400);

    return () => clearTimeout(timeout);
  }, [id]);

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

        {loading && <ActivityIndicator size="large" style={styles.loading} />}

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <Image
          source={{ uri: imageToShow }}
          style={styles.image}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
        />
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
