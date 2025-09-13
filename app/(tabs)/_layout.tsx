import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { Pressable, ViewStyle } from "react-native";

function TabBarButton(props: any) {
  const { style, onPress, to, ...rest } = props;

  return (
    <Pressable
      {...rest}
      onPress={() => {
        if (to) {
          router.push(to); 
        } else if (onPress) {
          onPress();
        }
      }}
      style={({ pressed }) => [
        (style as ViewStyle) ?? {},
        {
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    />
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        lazy: false, // mount semua screen dari awal biar nggak "reload"
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 6,
          height: 80,
        },
        tabBarActiveTintColor: "#ebd234",
        tabBarInactiveTintColor: "#e5e7eb",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
        tabBarButton: (props) => <TabBarButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
