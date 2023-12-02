import React from "react";
import { Header } from "../components/Header";
import { StatusBar } from "react-native";
import { Profile } from "../components/Profile";
import Gallery from "../components/Gallery";
//import { BottomTabNavigator } from "../components/BottomTab";

export function ProfileScreen() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#2e4374"} />
      <Header title="Perfil" />
      <Profile />
      <Gallery />
    </>
  );
}

export default ProfileScreen;
