import React, { useState } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { fazerChamadaAutenticada, fazerLogin } from "../../service/api";
import {
  Container,
  FormContainer,
  Input,
  Title,
  Button,
  ButtonText,
  SignUpContainer,
  SignUpText,
} from "./styles";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const token = await fazerLogin(email, senha);
      console.log(token);

      await fazerChamadaAutenticada(token);

      setEmail("");
      setSenha("");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>LensLink</Title>
        <Input
          placeholder="E-mail"
          placeholderTextColor="#fdfcfe"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Senha"
          placeholderTextColor="#fdfcfe"
          secureTextEntry
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <Button onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
        </Button>
      </FormContainer>
      <SignUpContainer>
        <TouchableOpacity onPress={handleLogin}>
          <Text>
            Não tem uma conta?
            <SignUpText>Sing-Up!</SignUpText>
          </Text>
        </TouchableOpacity>
      </SignUpContainer>
    </Container>
  );
}

export default Login;
