import React from "react";
import { Login } from "../components/Login";
import { StatusBar } from "react-native";
import SearchUsers from "../components/SeachUser";
import Header from "../components/Header";
//import { BottomTabNavigator } from "../components/BottomTab";

export function SearchUsersScreen() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2e4374"} />
      <Header title="Buscar Usuario" />
      <SearchUsers />
    </>
  );
}

export default SearchUsersScreen;
