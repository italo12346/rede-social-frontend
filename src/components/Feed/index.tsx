import React, { useEffect, useState, useCallback } from "react";
import { View, Alert, FlatList, RefreshControl } from "react-native";
import { fazerChamadaAutenticada } from "../../service/api";
import { Post, Header, Avatar, Name, PostImage, Description } from "./styles";

interface DadosItem {
  _id: string;
  autor: {
    fotoPerfil: string;
    usuario: string;
  };
  imagem: string;
  data: string;
  descricao: string;
}

export const Feed = () => {
  const [dados, setDados] = useState<DadosItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);

  const carregarDados = useCallback(async () => {
    try {
      const dadosRecebidos = await fazerChamadaAutenticada("foto/list");

      dadosRecebidos.sort((a: { data: string }, b: { data: string }) => {
        const dataA = new Date(a.data).getTime();
        const dataB = new Date(b.data).getTime();

        return dataB - dataA;
      });

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

  const handleEndReached = () => {
    if (visibleItems < dados.length) {
      setVisibleItems(visibleItems + 5);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        data={dados.slice(0, visibleItems)}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Feed;
