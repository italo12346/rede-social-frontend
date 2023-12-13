import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera,CameraType } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  CaptureButton,
  ChangeButton,
  Container,
} from "./styles";

const CameraPage: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState( CameraType.back);
  const cameraRef = useRef<Camera | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Foto tirada:', photo);
        navigation.navigate('createpublish', { photo });
      } catch (error) {
        console.error('Erro ao tirar a foto:', error);
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ aspectRatio:0.8, flex:1 }} type={cameraType} ref={cameraRef}>
        <Container>
          <CaptureButton onPress={handleTakePicture}>
            <Feather name="camera" size={24} color="black" />
          </CaptureButton>
          <ChangeButton onPress={toggleCameraType}>
            <Feather name="refresh-cw" size={24} color="black" />
          </ChangeButton>
        </Container>
      </Camera>
    </View>
  );
};

export default CameraPage;