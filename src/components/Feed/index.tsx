import React, { useEffect, useState } from "react";
import { View, Alert, FlatList } from "react-native";
import { fazerChamadaAutenticada } from "../../service/api";
import { Post, Header, Avatar, Name, PostImage, Description } from "./styles";

export const Feed = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dadosRecebidos = await fazerChamadaAutenticada("foto/list");
        setDados(dadosRecebidos);
      } catch (erro) {
        console.error("Erro ao carregar dados autenticados:", erro);
        Alert.alert("Erro", "Não foi possível carregar os dados autenticados.");
      }
    };

    carregarDados();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={dados}
        keyExtractor={(post) => String(post._id)}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar
                source={{
                  uri: `data:image/jpeg;base64,${item.autor.fotoPerfil}`,
                }}
              />
              <Name>{item.autor.usuario}</Name>
            </Header>

            <PostImage
              source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
            />

            <Description>
              <Name>{item.autor.usuario}</Name> {item.descricao}
            </Description>
          </Post>
        )}
      />
    </View>
  );
};

export default Feed;
