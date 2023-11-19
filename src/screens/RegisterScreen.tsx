import React from "react";
import { StatusBar } from "react-native";
import Registro from "../components/Register";

export function RegisterScreen() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2e4374"} />
      <Registro/>
    </>
  );
}

export default RegisterScreen;
