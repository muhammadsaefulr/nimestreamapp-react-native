import { icons } from '@/constants/icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Image, Text, TouchableOpacity, View } from 'react-native'

type Props = Partial<Movie> & {
  loading?: boolean
}

// Skeleton shimmer
function SkeletonBox({ width, height, borderRadius = 6 }: { width: number; height: number; borderRadius?: number }) {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
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

const MovieCard = ({ id, title, poster_path, vote_average, release_date, loading }: Props) => {
  if (loading) {
    return (
      <View className="w-[30%]">
        <SkeletonBox width={100} height={160} borderRadius={12} />
        <View className="mt-2 space-y-2">
          <SkeletonBox width={90} height={14} />
          <SkeletonBox width={60} height={12} />
        </View>
      </View>
    )
  }

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%] rounded-xl overflow-hidden shadow-lg shadow-black/30">
        <View className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://placeholder.co/600x400/1a1a1a/ffffff'
            }}
            className="w-full h-40 rounded-xl"
            resizeMode="cover"
          />

          {/* Gradient overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            className="absolute bottom-0 left-0 right-0 h-20 rounded-b-xl"
          />

          {/* Rating badge */}
          <View className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full flex-row items-center">
            <Image source={icons.star} className="w-3 h-3 mr-1" />
            <Text className="text-white text-xs font-bold">{(vote_average ?? 0).toFixed(1)}</Text>
          </View>
        </View>

        <View className="mt-2 px-1">
          <Text className="text-white text-sm font-semibold" numberOfLines={1}>
            {title}
          </Text>
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-light-300 text-xs">
              {release_date?.split("-")[0] ?? "N/A"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
