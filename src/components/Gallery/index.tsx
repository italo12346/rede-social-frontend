import React, { useEffect, useState, useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { profile } from "../../service/api";
import { Icons, Post, PostImage, Underline } from "./styles";
import { Icon } from "react-native-vector-icons/Icon";

export const Gallery = () => {
  const [dados, setDados] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      const dadosRecebidos = await profile("foto/userfotos");
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
      <Icons>
        <Ionicons name="images-outline" size={24} color="black" />
      </Icons>
      <Underline />
      <FlatList
        data={dados}
        numColumns={3}
        stickyHeaderHiddenOnScroll={false}
        keyExtractor={(post) => String(post._id)}
        renderItem={({ item }) => (
          <Post>
            <PostImage
              source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
            />
          </Post>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Gallery;
