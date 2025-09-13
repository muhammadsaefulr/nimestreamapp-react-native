// app/movies/[id].tsx
import { fetchMovieById } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Skeleton shimmer
function SkeletonBox({
  width,
  height,
  borderRadius = 6,
}: {
  width: number;
  height: number;
  borderRadius?: number;
}) {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#2a2a40",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.15)",
          transform: [{ translateX }],
        }}
      />
    </View>
  );
}

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: movie_detail,
    loading,
    error,
  } = useFetch<MovieDetails>(() => fetchMovieById(Number(id)));

  const dummyEpisodes = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Episode ${i + 1}`,
    description: "Episode deskripsi singkat lorem ipsum dolor sit amet.",
    thumbnail: "https://placehold.co/600x400/1a1a1a/ffffff?text=Episode",
  }));

  if (loading) {
    return (
      <ScrollView className="flex-1 bg-primary">
        <SkeletonBox width={width} height={450} borderRadius={0} />
        <View className="px-5 mt-5 space-y-4">
          <SkeletonBox width={200} height={24} />
          <SkeletonBox width={120} height={16} />
          <SkeletonBox width={width - 40} height={80} borderRadius={12} />
          <SkeletonBox width={width - 40} height={40} borderRadius={8} />
        </View>
      </ScrollView>
    );
  }

  if (error || !movie_detail) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Gagal memuat data film.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Poster */}
      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${movie_detail.backdrop_path}`,
          }}
          style={{ width, height: 450 }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
          }}
        />

        {/* Back button */}
        <TouchableOpacity
          className="absolute top-8 left-4 bg-black/50 p-2 rounded-full"
          onPress={() => router.push("/")}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Detail */}
      <View className="px-5 mt-[-40]">
        <Text className="text-2xl font-bold text-white">
          {movie_detail.title}
        </Text>
        <View className="flex-row items-center gap-x-3 mt-2">
          <Ionicons name="star" size={18} color="#facc15" />
          <Text className="text-yellow-400 font-semibold">
            {movie_detail.vote_average.toFixed(1)}
          </Text>
          <Text className="text-light-300">
            {movie_detail.release_date?.split("-")[0]}
          </Text>
        </View>

        {/* Genre */}
        <View className="flex-row flex-wrap gap-2 mt-3">
          {movie_detail.genres?.map((genre) => (
            <View
              key={genre.id}
              className="bg-light-200/20 px-3 py-1 rounded-full"
            >
              <Text className="text-light-200 text-xs">{genre.name}</Text>
            </View>
          ))}
        </View>

        {/* Overview */}
        <Text className="text-light-200 mt-4 leading-6">
          {movie_detail.overview}
        </Text>

        {/* Actions */}
        <View className="flex-row mt-6 items-center gap-x-3">
          <TouchableOpacity className="flex-[4] flex-row gap-x-2 items-center bg-yellow-400 px-4 py-3 rounded-lg justify-center">
            <Ionicons name="play-circle-outline" size={22} color="black" />
            <Text className="font-semibold text-black">Mulai Menonton</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-[1] bg-yellow-400 py-3 rounded-lg items-center justify-center">
            <Ionicons name="bookmark-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-white text-xl font-bold mb-3">Episodes</Text>
        <FlatList
          data={dummyEpisodes}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="flex-row mb-4 bg-neutral-900 rounded-lg overflow-hidden">
              <Link href={`/movies/play/${id}`} asChild>
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-32 h-20"
                  resizeMode="cover"
                />
              </Link>
              <View className="flex-1 p-3">
                <Text className="text-white font-semibold">{item.title}</Text>
                <Text className="text-gray-400 text-xs mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
