import React, { useRef, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CameraPage: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<Camera | null>(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleTakePicture = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Foto tirada:', photo);
      }
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return <Text>Sem acesso à câmera</Text>;
    }
  
    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type} ref={cameraRef}>
            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={handleTakePicture}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capturar </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    };
    
    export default CameraPage;
    