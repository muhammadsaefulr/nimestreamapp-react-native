import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function Index() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>(() => fetchMovies({ query: "" }));

  const [activeIndex, setActiveIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setActiveIndex(index);
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
      >
        <View>
          <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-5 pt-6">
            <Ionicons name="film-outline" size={32} color="#f97316" />
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Ionicons name="search-outline" size={26} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={movies?.slice(0, 6) ?? []}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            renderItem={({ item, index }) => {
              const isActive = index === activeIndex;
              const Wrapper = isActive ? Animated.View : View;

              return (
                <TouchableOpacity activeOpacity={0.8}>
                  <Wrapper style={isActive ? { opacity: fadeAnim } : {}}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w780${item.backdrop_path}`,
                      }}
                      style={{
                        width,
                        height: 450,
                        backgroundColor: "#333",
                      }}
                      resizeMode="cover"
                    />

                    {/* Gradient atas */}
                    <LinearGradient
                      colors={["rgba(0,0,0,0.6)", "transparent"]}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 100,
                      }}
                    />

                    {/* Gradient bawah */}
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 160,
                      }}
                    />

                    {/* Text Overlay */}
                    <View className="absolute bottom-0 left-0 right-0 p-4">
                      <Text
                        className="text-white font-bold text-lg"
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text className="text-gray-200 text-sm" numberOfLines={2}>
                        {item.overview.length > 100
                          ? item.overview.slice(0, 100) + "..."
                          : item.overview}
                      </Text>
                      <Text className="text-yellow-400 mt-1">
                        ⭐ {item.vote_average.toFixed(1)}
                      </Text>

                      <View className="flex-row mt-6 items-center gap-x-3">
                        <TouchableOpacity className="flex-[4] flex-row gap-x-12 items-center bg-yellow-400 px-4 py-3 rounded-lg">
                          <Ionicons name="play-circle-outline" size={22} color="black" />
                          <Text className="text-center font-semibold text-black">
                            Mulai Menonton
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="flex-[1] bg-yellow-400 py-3 rounded-lg items-center justify-center">
                          <Ionicons
                            name="bookmark-outline"
                            size={20}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Wrapper>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View className="px-5 mt-2">
          <Text className="text-lg text-white font-bold mt-5 mb-5">
            Latest Movies
          </Text>

          {moviesLoading ? (
            <View className="flex-row flex-wrap gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <MovieCard key={idx} loading />
              ))}
            </View>
          ) : (
            <FlatList
              data={movies ?? []}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 24,
              }}
              scrollEnabled={true}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
