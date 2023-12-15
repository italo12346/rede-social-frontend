import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons ,FontAwesome5} from "@expo/vector-icons";
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
  InfoName,
  NameUser,
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
              <TouchableOpacity>
                <Name>@{item.usuario}</Name>
              </TouchableOpacity>
              <TouchableOpacity onPress={edit}>
                <Ionicons name="create-outline" style={{ fontSize: 30 }} />
              </TouchableOpacity>
            </Header>
            <Avatar
              source={{
                uri: `data:image/jpeg;base64,${item.fotoPerfil}`,
              }}
            />

            <NameUser>
              <Name>{item.nome}</Name>
            </NameUser>
            <Info>
              <InfoName>{item.publicacoes}</InfoName>
              <InfoName>Publicações</InfoName>
            </Info>
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
