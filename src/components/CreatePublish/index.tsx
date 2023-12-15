import React, { useEffect, useState } from "react";
import { Alert, Image, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Container, Input, Button, ButtonText } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createPub } from "../../service/api";


const CreatePublish: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [descricao, setDescription] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    if (route.params && (route.params as any).photo) {
      const { photo } = route.params as any;
      setImage(photo.uri);
    }
  }, [route.params]);
  
  const handlePickerImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const result = await pickImageFromLibrary();
      if (!result.canceled) {
        const { uri } = result.assets[0];
        setImage(uri);
      } else {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      }
    }
  };

  const pickImageFromLibrary = async () => {
    return await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      aspect: [4, 4],
      quality: 1,
    });
  };

  const uploadImage = async (uri: string, description: string) => {
    try {
      const filename = uri.substring(uri.lastIndexOf("/") + 1, uri.length);
      const extend = filename.split(".")[1];
      const formData = new FormData();
      formData.append(
        "imagem",
        JSON.parse(
          JSON.stringify({
            name: filename,
            uri: uri,
            type:` image/${extend}`,
          })
        )
      );
      formData.append("descricao", description);

      await createPub("foto/create", formData);
    } catch (error) {
      console.error("Erro ao enviar imagem", error);
    }
  };

 
  const save = async () => {
    try {
      if (image) {
        await uploadImage(image, descricao);
        // Limpa os estados após o envio
        setImage(null);
        setDescription("");
      }
      navigation.navigate('home')
    } catch (error) {
      console.error("Erro ao enviar", error);
    }
  };

  return (
    <Container>
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />
      )}
      <Input
        placeholderTextColor="#fdfcfe"
        placeholder="Adicione aqui a descrição da sua imagem"
        value={descricao}
        onChangeText={setDescription}
        autoCapitalize="none"
      />
      <Button onPress={handlePickerImage}>
        <ButtonText>Escolha uma foto</ButtonText>
      </Button>

      <Button onPress={save}>
        <ButtonText>Salvar</ButtonText>
      </Button>
    </Container>
  );
};

export default CreatePublish;