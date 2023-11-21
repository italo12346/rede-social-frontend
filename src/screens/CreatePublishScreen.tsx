import React from "react";
import { Header } from "../components/Header";
import { StatusBar, View } from "react-native";
import CreatePublish from "../components/CreatePublish"

export function CreatePublishScreen() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2e4374"} />
      <View>
        <Header title="Criar nova publicação" />
        <CreatePublish />
      </View>
    </>
  );
}

export default CreatePublish;
