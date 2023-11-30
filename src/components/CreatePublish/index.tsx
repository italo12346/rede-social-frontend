import React, { useState } from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Container, Input, Button, ButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import { postarFoto } from '../../service/api';

export default function ImagePickerExample(): React.ReactElement {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0]);
      
    }
  };

  const save = async () => {
    try {
      if (image) {    
        // Chama a função para enviar a foto para a API
          await postarFoto(description, image ).then(()=>{
          navigation.navigate("home");
        })
      }
    } catch (error) {
      console.log('Não foi possível enviar a imagem:', error);
    }
  };

  return (
    <Container>
      {image && <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />}
      <Input
        placeholderTextColor="#fdfcfe"
        placeholder="Adicione aqui a descrição da sua imagem"
        value={description}
        onChangeText={setDescription}
        autoCapitalize="none"
      />
      <Button onPress={pickImage}>
        <ButtonText>Escolha uma foto</ButtonText>
      </Button>

      <Button onPress={save}>
        <ButtonText>Salvar</ButtonText>
      </Button>
    </Container>
  );
}
