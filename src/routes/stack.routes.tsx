import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Screen, Navigator } = createNativeStackNavigator();

import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";
import React from "react";
import RegisterScreen from "../screens/RegisterScreen";
import TabRoutes from "./tab-routes";

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

    </Navigator>
  );
}
