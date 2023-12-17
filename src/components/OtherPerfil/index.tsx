import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Modal,
} from "react-native";
import { otherProfile, profile } from "../../service/api";
import {
  ProfileContainer,
  Header,
  Avatar,
  Name,
  Info,
  InfoName,
  NameUser,
  Icons,
  Underline,
  Post,
  PostImage,
  Container,
  Ellipse,
  PostModal,
  Description,
} from "./styles";

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
  const [gallery, setGallery] = useState<any[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);

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

  const carregarGaleria = useCallback(async () => {
    try {
      const dadosRecebidos = await otherProfile("foto/userfotos", userId);
      setGallery(dadosRecebidos);
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

  const openImageModal = (image: string, item: any) => {
    setSelectedImage(image);
    setSelectedItem(item);
    setSelectedItemDescription(item.descricao);
    setIsModalVisible(true);
  };

  useEffect(() => {
    carregarDados(), carregarGaleria();
  }, [carregarDados, carregarGaleria]);

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedItem(null);
    setIsModalVisible(false);
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
            style={{ marginLeft: 270 }}
          />
        </TouchableOpacity>
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close" style={{ fontSize: 30 }} />
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

      <Icons>
        <Ionicons name="images-outline" size={24} color="black" />
      </Icons>
      <Underline />
      <FlatList
        data={gallery}
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

export default OtherProfile;
