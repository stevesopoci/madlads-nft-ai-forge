/**
 * HomeScreen Component
 * ---------------------
 * This screen allows users to:
 * - Enter a MadLad NFT ID and optional prompt
 * - View the corresponding image fetched from S3
 * - Trigger video generation using the selected AI model
 * - View the returned video once complete
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import styles from "../styles/index.styles";
import generateVideo from "../utils/generateVideo";

export default function HomeScreen() {
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const placeholderUri =
    "https://cdn-icons-png.flaticon.com/512/11573/11573069.png";

  const isMadLadImage = imageUrl !== "" && imageLoaded;
  const showUri = imageUrl !== "" ? imageUrl : placeholderUri;

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
    setVideoUrl("");

    const timeout = setTimeout(() => {
      const url = `https://madlads.s3.us-west-2.amazonaws.com/images/${id}.png`;
      setImageUrl(url);
    }, 400);

    return () => clearTimeout(timeout);
  }, [id]);

  const handleGenerateVideo = () => {
    generateVideo({
      id,
      prompt,
      setLoading,
      setError,
      setVideoUrl,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Mad Lads AI Forge</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.idInput}
            placeholder="ID"
            keyboardType="numeric"
            value={id}
            onChangeText={setId}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.promptInput}
            placeholder="Forge your lad (e.g., laser eyes, pepe hat)"
            placeholderTextColor="#888"
            value={prompt}
            onChangeText={setPrompt}
            onSubmitEditing={handleGenerateVideo}
            returnKeyType="done"
          />
        </View>

        <View style={styles.mediaWrapper}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loadingOverlay}
            />
          )}

          {error !== "" && <Text style={styles.error}>{error}</Text>}

          {videoUrl ? (
            <Video
              source={{ uri: videoUrl }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping={true}
              useNativeControls
              style={styles.video}
            />
          ) : (
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
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
