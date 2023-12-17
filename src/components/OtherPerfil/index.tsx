import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Alert, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { otherProfile } from "../../service/api";
import { ProfileContainer, Header, Avatar, Name, Info, InfoName, NameUser } from "./styles";

interface UsuarioItem {
  _id: string;
  usuario: string;
  nome: string;
  fotoPerfil: string;
  publicacoes: number;
  // Outras propriedades do usuário, se houver
}

type RootStackParamList = {
  OtherProfile: { userId: string };
};

type OtherProfileRouteProp = RouteProp<RootStackParamList, "OtherProfile">;

const OtherProfile: React.FC = () => {
  const [dados, setDados] = useState<UsuarioItem[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const route = useRoute<OtherProfileRouteProp>();
  const userId = route.params.userId;

  const carregarDados = useCallback(async () => {
    try {
      const dadosRecebidos = await otherProfile("user", userId);
      setDados([dadosRecebidos]);
    } catch (erro) {
      console.error("Erro ao carregar dados autenticados:", erro);
      Alert.alert("Erro", "Não foi possível carregar os dados autenticados.");
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

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

export default OtherProfile;
