import React from "react";
import { StatusBar } from "react-native";
import Registro from "../components/Registro";

export function RegistroScreen() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#2e4374"} />
      <Registro/>
    </>
  );
}

export default RegistroScreen;
