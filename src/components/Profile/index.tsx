import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, RefreshControl } from "react-native";
import { profile } from "../../service/api";
import { ProfileContainer, Header, Avatar, Name, Info } from "./styles";

export const Profile = () => {
  const [dados, setDados] = useState<any[] | null>(null);

  const [refreshing, setRefreshing] = useState(false);

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
              <Info>{item.publicacoes} Publicações</Info>
            </Header>
            <Name>{item.usuario}</Name>
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
