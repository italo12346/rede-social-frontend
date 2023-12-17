import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getUserByName } from "../../service/api";
import { Button, Container, Input, ButtonText, ItemContainer, Avatar, UserName, Busca } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface UsuarioItem {
  _id: string;
  usuario: string;
  fotoPerfil: string;
}

const SearchUser: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [resultados, setResultados] = useState<UsuarioItem[]>([]);

  const SearchUser = async () => {
    try {
      const data = await getUserByName(nomeUsuario);

      if (data) {
        setResultados(data);
      } else {
        setResultados([]);
      }
    } catch (erro) {
      console.error("Erro ao buscar usuário:", erro);
    }
  };

  const navigation = useNavigation();

  const renderItem = ({ item }: { item: UsuarioItem }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("OtherProfile", {
          userId: item._id,
        })
      }
    >
      <ItemContainer>
        <Avatar
          source={{
            uri: `data:image/jpeg;base64,${item.fotoPerfil}`,
          }}
        />
        <UserName>{item.usuario}</UserName>
      </ItemContainer>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Busca>
        <Input
          placeholder="Digite o nome do usuário"
          value={nomeUsuario}
          onChangeText={(text) => setNomeUsuario(text)}
        />
        <Button onPress={SearchUser}>
          <ButtonText>Buscar</ButtonText>
        </Button>
      </Busca>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default SearchUser;
