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
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { profile } from "../../service/api";
import {
  Icons,
  Post,
  PostImage,
  Underline,
  Container,
  PostModal,
  Ellipse,
  Description,
} from "./styles";
import EditModal from "../Modal";
import { Name } from "../Feed/styles";

interface GalleryProps { }

export const Gallery: React.FC<GalleryProps> = () => {
  const [dados, setDados] = useState<any[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);

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

  const openImageModal = (image: string, item: any) => {
    setSelectedImage(image);
    setSelectedItem(item);
    setSelectedItemDescription(item.descricao);
    setSelectedItemId(item._id);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedItem(null);
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  const editPub = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const renderModalContent = () => {
    if (!selectedItem) {
      return null;
    }

    return (
      <Container>
        <TouchableOpacity onPress={closeImageModal}>
          <Ionicons
            name="close"
            size={25}
            color="black"
            style={{ marginLeft: 270, marginBottom: -22 }}
          />
        </TouchableOpacity>
        <Ellipse>
          <TouchableOpacity onPress={editPub}>
            <FontAwesome5 name="ellipsis-v" size={22} color="black" />
          </TouchableOpacity>
        </Ellipse>
        <PostModal
          source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
        />
        <Description>
          <Name>{selectedItem.autor.usuario} : </Name> {selectedItemDescription}
        </Description>
      </Container>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <EditModal
        description={selectedItemDescription}
        imageId={selectedItemId}
        isVisible={isEditModalVisible}
        onClose={closeEditModal}
      />
      <Icons>
        <Ionicons name="images-outline" size={24} color="black" />
      </Icons>
      <Underline />
      <FlatList
        data={dados}
        numColumns={3}
        keyExtractor={(post) => String(post._id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openImageModal(item.imagem, item)}>
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
        {renderModalContent()}
      </Modal>
    </View>
  );
};

export default Gallery;
