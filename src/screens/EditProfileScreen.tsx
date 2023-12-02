import React from "react";
import { Header } from "../components/Header";
import { StatusBar } from "react-native";
import EditProfile from "../components/EditProfile";

export function EditProfileScreen() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#2e4374"} />
      <EditProfile />
    </>
  );
}

export default EditProfileScreen;
