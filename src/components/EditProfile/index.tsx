import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, Image, TextInput, View } from "react-native";
import { editProfile, profile } from "../../service/api";
import { useColorScheme } from "react-native";

import { Header, Body, Container, Avatar, Input } from "./styles";

export const EditProfile = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const colorScheme = useColorScheme();
  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const dadosPerfil = await profile("user");

      setNome(dadosPerfil.nome);
      setUsuario(dadosPerfil.usuario);
      setFotoPerfil(dadosPerfil.fotoPerfil);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  const handleEditarPerfil = async () => {
    try {
      const dadosAtualizados = {
        nome,
        usuario,
        fotoPerfil,
      };

      await editProfile("user", "PUT", dadosAtualizados);

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
    }
  };

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Editar Perfil</Text>
        <TouchableOpacity onPress={handleEditarPerfil}>
          <Ionicons name="checkmark" style={{ fontSize: 35 }} />
        </TouchableOpacity>
      </Header>
      <Body>
        {fotoPerfil ? (
          <Avatar
            source={{ uri: `data:image/jpeg;base64,${fotoPerfil}` }}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Text>Selecione uma foto de perfil</Text>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#2e4374" }}>Escolher Foto</Text>
        </TouchableOpacity>

        <Input
          theme={{ mode: colorScheme }}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <Input
          theme={{ mode: colorScheme }}
          placeholder="Usuário"
          value={usuario}
          onChangeText={(text) => setUsuario(text)}
        />
      </Body>
    </Container>
  );
};

export default EditProfile;
