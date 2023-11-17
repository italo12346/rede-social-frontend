import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormContainer, Container, Title, Button, ButtonText, SignUpText, ErroText, Input } from "./styles";
import { fazerRegistro } from "../../service/api";
interface FormData {
    name: string;
    username: string;
    email: string;
    senha: string;
}

export function Registro() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigation = useNavigation();


    const onSubmit = (data: FormData) => {
        try {
            fazerRegistro(data.email, data.senha, data.name, data.username).then(() => {
                navigation.navigate("login");
            })
        } catch (error) {
            // Trate os erros aqui, se necessário
            console.error(error);
        }
    };

    const singIn = () => {
        navigation.navigate("login");

    }

    return (
        <Container>
            <FormContainer>
                <Title>LensLink</Title>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Name"
                            placeholderTextColor="#fdfcfe"
                            value={field.value}
                            onChangeText={(text) => field.onChange(text)}
                        />
                    )}
                    name="name"
                    rules={{ required: 'Insira um nome valido' }}
                />
                {errors.name && <ErroText>{errors.name.message}</ErroText>}

                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Username"
                            placeholderTextColor="#fdfcfe"
                            value={field.value}
                            onChangeText={(text) => field.onChange(text)}
                        />
                    )}
                    name="username"
                    rules={{ required: 'Insira um Username valido' }}
                />
                {errors.username && <ErroText>{errors.username.message}</ErroText>}

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
                        required: 'E-mail é obrigatório', pattern: {
                            message: "Email Invalido",
                            value: /^\S+@\S+$/i
                        }
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
                        required: 'Senha muito curta',
                        minLength: 3
                    }}
                />
                {errors.senha && <ErroText>{errors.senha.message}</ErroText>}
                <Button onPress={handleSubmit(onSubmit)} >
                    <ButtonText>Registrar</ButtonText>
                </Button>
            </FormContainer>
            <TouchableOpacity onPress={singIn}>
                <Text>
                    Já tem uma conta?
                    <SignUpText>Sing-In!</SignUpText>
                </Text>
            </TouchableOpacity>
        </Container>
    );
}

export default Registro;
