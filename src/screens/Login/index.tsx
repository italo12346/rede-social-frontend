import React from "react";
import { styles } from "./styles";
import { View, Text, TextInput, TouchableOpacity, Linking, Button } from 'react-native';

export function LoginScreen() {
  const abrirLink = () => {
    // Substitua 'https://seu-link-aqui.com' pelo URL real do seu link
    const url = 'https://seu-link-aqui.com';
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>LensLink</Text>
        <TextInput style={styles.input}
          placeholder="E-mail"
          placeholderTextColor='#FDFCFE'
        ></TextInput>

        <TextInput style={styles.input}
          placeholder="Senha"
          placeholderTextColor='#FDFCFE'
        ></TextInput>
        <TouchableOpacity style={styles.buttom}>
            <Text style={{ color: '#fff' }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.singUp}>
        <TouchableOpacity onPress={abrirLink}>
          <Text>Não tem uma conta?
            <Text style={{ color: 'blue' }}>
              Sing-Up!
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
