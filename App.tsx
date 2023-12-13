import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Routes } from "./src/routes";
import {  useFonts, Itim_400Regular} from '@expo-google-fonts/itim';

export default function App() {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return <Routes />;
}
