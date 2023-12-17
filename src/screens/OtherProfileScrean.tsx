import React from "react";
import { Header } from "../components/Header";
import { StatusBar } from "react-native";
import Gallery from "../components/Gallery";
import OtherProfile from "../components/OtherPerfil";
import TabRoutes from "../routes/tab-routes";
//import { BottomTabNavigator } from "../components/BottomTab";

export function OtherProfileScreen() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2e4374"} />
      <OtherProfile />
      <TabRoutes/>
    </>
  );
}

export default OtherProfileScreen;
