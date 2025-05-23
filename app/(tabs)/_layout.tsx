import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Image",
          tabBarIcon: ({ color }) => <TabBarIcon name="image" color={color} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: "Video (Coming Soon)",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="video-camera" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
