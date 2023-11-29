import React, { useState } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { fazerLogin } from "../../service/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

interface FormData {
  email: string;
  senha: string;
}

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigation = useNavigation();

  const handleLogin = async (data: FormData) => {
    try {
      const token = await fazerLogin(data.email, data.senha);
      await AsyncStorage.setItem("authToken", token.token);
      await AsyncStorage.setItem("userId", token.userId);
      navigation.navigate("home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Falha no login. Verifique suas credenciais.");
    }
  };
  const singUp = () => {
    navigation.navigate("registro");
  };

  return (
    <Container>
      <FormContainer>
        <Title>LensLink</Title>
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholderTextColor="#fdfcfe"
              placeholder="E-mail"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              autoCapitalize="none"
            />
          )}
          name="email"
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              message: "Email Invalido",
              value: /^\S+@\S+$/i,
            },
          }}
        />
        {errors.email && <ErroText>{errors.email.message}</ErroText>}

        <Controller
          control={control}
          render={({ field }) => (
            <Input
              placeholderTextColor="#fdfcfe"
              placeholder="Senha"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
              autoCapitalize="none"
              secureTextEntry
            />
          )}
          name="senha"
          rules={{
            required: "Senha muito curta",
            minLength: 3,
          }}
        />
        {errors.senha && <ErroText>{errors.senha.message}</ErroText>}

        <Button onPress={handleSubmit(handleLogin)}>
          <ButtonText>Login</ButtonText>
        </Button>
      </FormContainer>
      <SignUpContainer>
        <TouchableOpacity onPress={singUp}>
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
