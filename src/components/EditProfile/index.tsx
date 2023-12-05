import React, { useEffect, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import { editProfile, profile } from "../../service/api";
import { useColorScheme } from "react-native";
import * as ImagePicker from "expo-image-picker";
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
      };

      await editProfile("user", dadosAtualizados);

      navigation.goBack();
    } catch (error) {
      console.error("Erro ao editar perfil:", error);
    }
  };

  const handlePickerImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        const filename = assets[0].uri.substring(
          assets[0].uri.lastIndexOf("/") + 1,
          assets[0].uri.length
        );
        const extend = filename.split(".")[1];
        const formData = new FormData();
        formData.append(
          "fotoPerfil",
          JSON.parse(
            JSON.stringify({
              name: filename,
              uri: assets[0].uri,
              type: `image/${extend}`,
            })
          )
        );

        await editProfile("user", formData);
      }
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

        <TouchableOpacity onPress={handlePickerImage}>
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
