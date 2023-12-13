import React, { useState } from "react";
import { Alert, Image, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Container, Input, Button, ButtonText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { createPub } from "../../service/api";

export default function ImagePickerExample(): React.ReactElement {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const save = async () => {
    try {
      const dadosAtualizados = {
        description,
      };

      await createPub("foto/create", dadosAtualizados);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao enviar", error);
    }
  };

  const handlePickerImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita que sua aplicação acesse as imagens"
      );
    } else {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        aspect: [4, 4],
        quality: 1,
      });

      if (canceled) {
        ToastAndroid.show("Operação cancelada", ToastAndroid.SHORT);
      } else {
        setImage(assets[0].uri);
        const filename = assets[0].uri.substring( 
          assets[0].uri.lastIndexOf("/") + 1,
          assets[0].uri.length
        );
        const extend = filename.split(".")[1];
        const formData = new FormData();
        formData.append(
          "imagem",
          JSON.parse(
            JSON.stringify({
              name: filename,
              uri: assets[0].uri,
              type: `image/${extend}`,
            })
          )
        );
        await createPub("foto/create", formData);
      }
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
        value={description}
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
}