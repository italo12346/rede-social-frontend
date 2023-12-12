import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { profile } from "../../service/api";
import {
  Icons,
  Post,
  PostImage,
  Underline,
  Container,
  PostModal,
} from "./styles";

export const Gallery = () => {
  const [dados, setDados] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const openImageModal = (image: any) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Icons>
        <Ionicons name="images-outline" size={24} color="black" />
      </Icons>
      <Underline />
      <FlatList
        data={dados}
        numColumns={3}
        keyExtractor={(post) => String(post._id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImageModal(item.imagem)}>
            <Post>
              <PostImage
                source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
              />
            </Post>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Modal visible={isModalVisible} transparent>
        <Container>
          <TouchableOpacity onPress={closeImageModal}>
            <Ionicons
              name="close"
              size={24}
              color="black"
              style={{ marginLeft: 270 }}
            />
          </TouchableOpacity>
          <PostModal
            source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
          />
        </Container>
      </Modal>
    </View>
  );
};

export default Gallery;
