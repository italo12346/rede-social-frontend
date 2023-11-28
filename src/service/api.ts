import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const BASE_URL = "https://lenslink.onrender.com";

interface RegistroResponse {
  message: string;
}

export const fazerLogin = async (email: string, senha: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();
    const token = data.token;

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fazerChamadaAutenticada = async (
  rota: string,
  metodo = "GET",
  dados = {}
) => {
  const token = await AsyncStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: metodo,
      url: `${BASE_URL}/${rota}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: dados,
    });

    return response.data;
  } catch (erro) {
    console.error("Erro na chamada autenticada:", erro);
    throw erro;
  }
};

export const fazerRegistro = async (
  email: string,
  senha: string,
  nome: string,
  usuario: string
): Promise<RegistroResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
        nome,
        usuario,
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.log("Response body:", await response.text());
      throw new Error("Erro no registro do usuário");
    }

    const data: RegistroResponse = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postarFoto = async (descricao:string, imagem:string) => {
  try {
    const response = await fetch(`${BASE_URL}/foto/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Aqui você pode incluir cabeçalhos de autenticação, se necessário
      },
      body: JSON.stringify({
        descricao: descricao,
        imagem: imagem,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao postar a foto");
    }

    const data = await response.json();
    // Se houver alguma informação adicional na resposta que você precisa, você pode lidar com isso aqui.

    return data; // Você pode retornar qualquer dado útil aqui, dependendo da sua necessidade.
  } catch (error) {
    console.error(error); // Log do erro
    throw error;
  }
};
