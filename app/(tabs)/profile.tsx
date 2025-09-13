import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ProfileScreen() {
  const [notifEnabled, setNotifEnabled] = useState(false);
  const toggleNotif = () => setNotifEnabled((v) => !v);

  const pill = (left: React.ReactNode, right?: React.ReactNode, onPress?: () => void) => (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      className="w-full px-4 py-4 rounded-2xl bg-blue-900/50 flex-row items-center justify-between mb-4"
    >
      <View className="flex-row items-center space-x-4">
        {left}
      </View>
      {right && <View>{right}</View>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-4 flex-row items-center justify-between">
        <MaterialIcons name="account-circle" size={28} className="text-yellow-400" />
        <Text className="text-white text-xl font-semibold">Account</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile header pill */}
        <View className="mb-6">
          <TouchableOpacity className="flex-row items-center bg-blue-900/50 rounded-2xl px-4 py-4">
            <Image
              source={{
                uri: "https://i.pravatar.cc/120?img=12",
              }}
              className="w-14 h-14 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-white font-bold text-lg">Muhammad Saeful</Text>
              <Text className="text-gray-300">saepull.id@gmail.com</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Notifikasi */}
        <Text className="text-gray-300 text-lg font-semibold mt-2 mb-3">Notifikasi</Text>
        <View className="mb-4">
          <View className="w-full rounded-2xl bg-blue-900/50 px-4 py-4 flex-row items-center justify-between">
            <Text className="text-white text-base">Dapatkan Notifikasi</Text>
            <Switch
              value={notifEnabled}
              onValueChange={toggleNotif}
              trackColor={{ false: "#6b6b6b", true: "#9e8aa3" }}
              thumbColor={notifEnabled ? "#efe6f0" : "#e9e5ea"}
            />
          </View>
        </View>

        {/* Tentang */}
        <Text className="text-gray-300 text-lg font-semibold mt-2 mb-3">Tentang</Text>
        {pill(<Text className="text-white">Kebijakan Privasi</Text>)}
        {pill(<Text className="text-white">Ketentuan Layanan</Text>)}

        {/* Logout */}
        <View className="mt-8 items-center">
          <TouchableOpacity
            onPress={() => { /* logout action */ }}
            className="w-2/3 bg-[#a56f2a] rounded-full py-3 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">Keluar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}
