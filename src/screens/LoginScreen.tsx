import React from "react";
import { Login } from "../components/Login";
import { StatusBar } from "react-native";
//import { BottomTabNavigator } from "../components/BottomTab";

export function LoginScreen() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#2e4374"} />
      <Login />
    </>
  );
}

export default LoginScreen;
