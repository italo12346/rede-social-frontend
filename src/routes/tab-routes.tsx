import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import CreatePublish from "../screens/CreatePublish";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveBackgroundColor: "#E9E9E9",
        tabBarActiveBackgroundColor: "#E9E9E9",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Seach"
        component={CreatePublish}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CreatePublish"
        component={CreatePublish}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-square" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="camera"
        component={CreatePublish}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
