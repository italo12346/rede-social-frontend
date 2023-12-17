import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import React from "react";
import RegisterScreen from "../screens/RegisterScreen";
import TabRoutes from "./tab-routes";
import EditProfileScreen from "../screens/EditProfileScreen";
import CreatePublishScreen from "../screens/CreatePublishScreen";
import { OtherProfileScreen } from "../screens/OtherProfileScrean";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator>
      <Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="home"
        component={TabRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="registro"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="editprofile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="createpublish"
        component={CreatePublishScreen}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="OtherProfile"
        component={OtherProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
