import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, RefreshControl } from "react-native";
import { profile } from "../../service/api";
import { ProfileContainer, Header, Avatar, Name } from "./styles";

export const Profile = () => {
  const [dados, setDados] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      const dadosRecebidos = await profile("user");
      setDados(dadosRecebidos);
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

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        onEndReachedThreshold={0.1}
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
              <Name>{item.usuario}</Name>
              <Name>{item.nome}</Name>
            </Header>
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
