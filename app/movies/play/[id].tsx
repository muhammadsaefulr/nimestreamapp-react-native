import CustomVideoPlayer from "@/components/VideoPlayer";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MoviePlayer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const videoRef = useRef<Video>(null);

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>({
    title: "Judul Dummy",
    overview:
      "Ini adalah deskripsi singkat dari film dummy yang kita tampilkan di player. Bisa diganti dengan API asli nanti.",
  });
  const [error, setError] = useState<string | null>(null);

  const episodes = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx + 1,
    title: `Episode ${idx + 1}`,
  }));

  const toggleBackToDetails = () => router.push(`/movies/${id}`);

  return (
    <>
      <View className="bg-primary">
        <Stack.Screen options={{ headerShown: false }} />

        <CustomVideoPlayer
        onBack={toggleBackToDetails}
          source={{
            uri: "https://dev.msaepul.my.id/minio/drama/testing/testing.mp4",
          }}
        />

        <View className="px-2">
          {error && <Text className="text-red-500 p-3">Error: {error}</Text>}

          {movie && (
            <>
              <Text className="text-white text-xl font-bold mt-3 px-3">
                {movie.title}
              </Text>
              <Text className="text-neutral-300 text-sm mt-2 px-3">
                {movie.overview || "Tidak ada deskripsi"}
              </Text>
            </>
          )}
        </View>
        <View className="px-2">
          <Text className="text-lg text-white font-semibold mt-6 mb-2 px-3">
            Episode
          </Text>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <View className="mt-3 px-3">
              {episodes.map((ep) => (
                <TouchableOpacity
                  key={ep.id}
                  className="bg-blue-900/20 flex-row justify-between px-4 py-3 rounded-lg mb-3"
                  onPress={() => router.push(`/movies/play/${ep.id}`)}
                >
                  <Text className="text-white font-medium">{ep.title}</Text>
                  <Ionicons name="play-circle-outline" size={22} color="white" />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
