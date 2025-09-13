import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";

// This component uses nativewind (Tailwind for React Native). Install with:
// npm i nativewind
// and configure babel plugin as documented in nativewind docs.

// Example usage:
// <WatchlistScreen />

type Item = {
  id: string;
  title: string;
  poster: string;
  rating: number;
  type: string; 
  year: string;
  progress?: string;
};

const DATA: Item[] = [
  {
    id: "1",
    title: "Pokemon (2023)",
    poster: "https://www.themoviedb.org/t/p/w92/6vcDalR50RWa309vBH1NLmG2rjQ.jpg",
    rating: 7.4,
    type: "TV",
    year: "Apr 2023",
    progress: "Hingga episode 110",
  },
  // add more items if needed
];

export default function WatchlistScreen() {
  const [tab, setTab] = useState<"Semua" | "Action" | "Comedy" | "OVA">("Semua");

  const tabs = ["Semua", "Action", "Comedy", "OVA"] as const;

  const filtered = DATA.filter((d) => tab === "Semua" || d.type === tab);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity activeOpacity={0.8} className="flex-row items-start p-4">
      <Image source={{ uri: item.poster }} className="w-14 h-20 rounded-lg mr-4" />
      <View className="flex-1">
        <Text className="text-white text-lg font-semibold">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <View className="flex-row items-center mr-3">
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text className="text-gray-300 ml-1">{item.rating.toFixed(1).replace('.', ',')}</Text>
          </View>
          <Text className="text-gray-400 mr-2">•</Text>
          <Text className="text-gray-300 mr-2">{item.type}</Text>
          <Text className="text-gray-400">•</Text>
          <Text className="text-gray-300 ml-2">{item.year}</Text>
        </View>
        {item.progress ? (
          <Text className="text-gray-400 mt-2">{item.progress}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialIcons name="emoji-events" size={22} className="text-yellow-400" />
          <Text className="text-xl text-white font-bold ml-2">My <Text className="text-yellow-400">WatchList</Text></Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 mr-2 rounded-full bg-transparent">
            <Ionicons name="search" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-4 py-2 flex-row space-x-3">
        {tabs.map((t) => {
          const active = t === tab;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              className={`px-4 py-2 rounded-full ${active ? "bg-gray-800" : "bg-gray-900"}`}
            >
              <Text className={`text-sm ${active ? "text-white" : "text-gray-400"}`}>{t}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={() => (
          <View className="items-center mt-8">
            <Text className="text-gray-400">Tidak ada item di daftar</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
