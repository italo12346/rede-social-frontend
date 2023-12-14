import React from "react";
import { Header } from "../components/Header";
import { StatusBar } from "react-native";
import Feed from "../components/Feed";
//import { BottomTabNavigator } from "../components/BottomTab";

export function HomeScreen() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2e4374"} />
      <Header title="LensLink" />
      <Feed />
    </>
  );
}

export default HomeScreen;
