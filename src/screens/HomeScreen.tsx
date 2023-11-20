import React from "react";
import { Header } from "../components/Header";
import { StatusBar } from "react-native";
//import { BottomTabNavigator } from "../components/BottomTab";

export function HomeScreen() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2e4374"} />
      <Header title = "LeansLink"/>
    </>
  );
}

export default HomeScreen;
