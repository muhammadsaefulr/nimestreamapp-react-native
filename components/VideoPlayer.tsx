"use client";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface CustomVideoPlayerProps {
  source: any;
  onBack?: () => void;
}

export default function CustomVideoPlayer({ source, onBack }: CustomVideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const togglePlayPause = async () => {
    if (!videoRef.current) return;
    if (isPlaying) await videoRef.current.pauseAsync();
    else await videoRef.current.playAsync();
    setIsPlaying(!isPlaying);
  };

  const seekBy = async (seconds: number) => {
    if (!videoRef.current || !status.positionMillis) return;
    const newPos = status.positionMillis + seconds * 1000;
    const duration = status.durationMillis || 0;
    await videoRef.current.setPositionAsync(Math.max(0, Math.min(newPos, duration)));
  };

  const onSliderValueChange = async (value: number) => {
    if (!videoRef.current) return;
    const duration = status.durationMillis || 0;
    await videoRef.current.setPositionAsync(value * duration);
  };

const toggleFullscreen = async () => {
  if (!videoRef.current) return;
  await videoRef.current.presentFullscreenPlayer();
};

  const showControls = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setControlsVisible(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    hideTimeout.current = setTimeout(() => {
      Animated.timing(controlsOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setControlsVisible(false));
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={showControls}>
      <View className="flex-1 bg-black justify-center items-center">
        <Video
          ref={videoRef}
          source={source}
          style={{ width: "100%", height: isLandscape ? "100%" : 225 }}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(s) => setStatus(s)}
        />

        {controlsVisible && (
          <Animated.View
            pointerEvents={controlsVisible ? "auto" : "none"}
            style={{
              opacity: controlsOpacity,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Backdrop */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />

            {/* Top overlay */}
            <View
              style={{
                position: "absolute",
                top: 20,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <TouchableOpacity onPress={onBack}>
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <TouchableOpacity onPress={() => console.log("Resolution")}>
                  <Ionicons name="speedometer" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Ionicons name="expand" size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Center controls */}
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                top: "40%",
                left: "25%",
                gap: 40,
              }}
            >
              <TouchableOpacity onPress={() => seekBy(-20)}>
                <Ionicons name="play-back" size={36} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause-circle" : "play-circle"}
                  size={48}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => seekBy(20)}>
                <Ionicons name="play-forward" size={36} color="white" />
              </TouchableOpacity>
            </View>

            {/* Bottom slider */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 3,
              }}
            >
              <Slider
                minimumValue={0}
                maximumValue={1}
                value={(status.positionMillis || 0) / (status.durationMillis || 1)}
                onValueChange={onSliderValueChange}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#888"
                thumbTintColor="#facc15"
                thumbStyle={{ width: 12, height: 12, borderRadius: 6 }}
                style={{ height: 20 }}
              />
            </View>
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
