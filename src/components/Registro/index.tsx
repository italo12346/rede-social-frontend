import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormContainer, Container, Title, Input, Button, ButtonText, SignUpText } from "./styles";
import { fazerRegistro } from "../../service/api";

interface FormData {
    name: string;
    username: string;
    email: string;
}

export function Registro() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [senha, setSenha] = useState('')
    const navigation = useNavigation();


    const onSubmit = (data: FormData) => {
        try {
          fazerRegistro(data.email, senha, data.name, data.username).then(()=>{
            navigation.navigate("login");
          })
        } catch (error) {
          // Trate os erros aqui, se necessário
          console.error(error);
        }
      };
      
    const singIn = ()=> {
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
                    rules={{ required: 'Name is required' }}
                />
                {errors.name && <Text>{errors.name.message}</Text>}

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
                    rules={{ required: 'Username is required' }}
                />
                {errors.username && <Text>{errors.username.message}</Text>}

                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholderTextColor="#fdfcfe"
                            placeholder="E-mail"
                            value={field.value}
                            onChangeText={(text) => field.onChange(text)}
                        />
                    )}
                    name="email"
                    rules={{ required: 'E-mail é obrigatório', pattern: /^\S+@\S+$/i }}
                />
                {errors.email && <Text>{errors.email.message}</Text>}

                <Input
                    placeholder="Senha"
                    placeholderTextColor="#fdfcfe"
                    secureTextEntry
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                />

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
