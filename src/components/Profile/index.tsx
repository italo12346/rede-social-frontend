import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { profile } from "../../service/api";
import {
  ProfileContainer,
  Header,
  Avatar,
  Name,
  Info,
  EditBottom,
} from "./styles";

export const Profile = () => {
  const [dados, setDados] = useState<any[] | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const carregarDados = useCallback(async () => {
    try {
      const dadosRecebidos = await profile("user");
      setDados([dadosRecebidos]);
    } catch (erro) {
      console.error("Erro ao carregar dados autenticados:", erro);
      Alert.alert("Erro", "Não foi possível carregar os dados autenticados.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    carregarDados();
  };

  const edit = () => {
    navigation.navigate("editprofile");
  };

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <View>
      <FlatList
        data={dados}
        keyExtractor={(post) => String(post._id)}
        renderItem={({ item }) => (
          <ProfileContainer>
            <Header>
              <Avatar
                source={{
                  uri: `data:image/jpeg;base64,${item.fotoPerfil}`,
                }}
              />
              <Info>
                <Name>{item.publicacoes}</Name>
                <Name>Publicações</Name>
              </Info>
            </Header>
            <Name>{item.usuario}</Name>
            <TouchableOpacity onPress={edit}>
              <EditBottom>Editar perfil</EditBottom>
            </TouchableOpacity>
          </ProfileContainer>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Profile;
