import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

import { Body, Container } from "./styles";

export const EditProfile = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Body>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Editar Perfil</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark" style={{ fontSize: 35 }} />
        </TouchableOpacity>
      </Body>
    </Container>
  );
};

export default EditProfile;
