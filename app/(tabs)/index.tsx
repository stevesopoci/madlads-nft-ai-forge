import React, { useState, useEffect } from "react";
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const placeholderUri =
    "https://cdn-icons-png.flaticon.com/512/11573/11573069.png";

  useEffect(() => {
    Image.prefetch(placeholderUri);
  }, []);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      setImageUrl("");
      setImageLoaded(false);
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

  const isMadLadImage = imageUrl !== "" && imageLoaded;
  const showUri = imageUrl !== "" ? imageUrl : placeholderUri;

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

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: showUri }}
            style={[
              styles.imageBase,
              !imageUrl
                ? styles.placeholderImage
                : isMadLadImage
                ? styles.realImage
                : styles.realImageLoading,
            ]}
            resizeMode="contain"
            onLoadEnd={() => {
              setLoading(false);
              setImageLoaded(true);
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
  input: {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 24,
  },
  loading: {
    marginTop: 20,
  },
  error: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
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
    borderRadius: 12,
    opacity: 1,
  },
  realImageLoading: {
    borderRadius: 12,
    opacity: 0,
  },
});
