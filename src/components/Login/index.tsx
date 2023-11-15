import React from "react";
import { Linking, TouchableOpacity, Text } from "react-native";
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
  const abrirLink = () => {
    const url = "https://seu-link-aqui.com";
    Linking.openURL(url);
  };

  return (
    <Container>
      <FormContainer>
        <Title>LensLink</Title>
        <Input placeholder="E-mail" placeholderTextColor="#fdfcfe" />
        <Input placeholder="Senha" placeholderTextColor="#fdfcfe" />
        <Button>
          <ButtonText>Login</ButtonText>
        </Button>
      </FormContainer>
      <SignUpContainer>
        <TouchableOpacity onPress={abrirLink}>
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
