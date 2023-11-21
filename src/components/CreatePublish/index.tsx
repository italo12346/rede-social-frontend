import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
    Container,
    FormContainer,
    Input,
    Title,
    Button,
    ButtonText,
    SignUpContainer,
    SignUpText,
    ErroText,
  } from "./styles";
  

export default function ImagePickerExample(): React.ReactElement {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result && result.assets && result.assets.length > 0 && !result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Container>
      {image && <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />}

      <Button onPress={pickImage} >
      <ButtonText>Escolha uma foto</ButtonText>
      </Button>
    </Container>
  );
}
