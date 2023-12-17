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
    const userId = data.userId;

    return { token, userId };
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

export const profile = async (rota: string, metodo = "GET", dados = {}) => {
  const token = await AsyncStorage.getItem("authToken");
  const userId = await AsyncStorage.getItem("userId");
  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: metodo,
      url: `${BASE_URL}/${rota}/${userId}`,
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


export const otherProfile = async (rota: string,userId:string, metodo = "GET", dados = {}) => {
  const token = await AsyncStorage.getItem("authToken");
  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: metodo,
      url: `${BASE_URL}/${rota}/${userId}`,
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

export const editProfile = async (rota: string, dados: any) => {
  const token = await AsyncStorage.getItem("authToken");
  const userId = await AsyncStorage.getItem("userId");

  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: "PUT",
      url: `${BASE_URL}/${rota}/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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
export const createPub = async (rota: string, dados: any) => {
  const token = await AsyncStorage.getItem("authToken");

  if (!token) {
    return null;
  }
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/${rota}/`,
      headers: {
        Authorization: ` Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: dados,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data || error.message);
    } else {
      console.error("Erro não relacionado ao Axios:", error);
    }
    throw error;
  }
};export const editPub = async (rota: string, descricao: string) => {
  const token = await AsyncStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: "PUT",
      url: `${BASE_URL}/${rota}`, // Removido a barra no final para permitir adicionar o ID da imagem
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Alterado o Content-Type para application/json
      },
      data: { descricao }, // Enviando a descrição dentro de um objeto
    });

    return response.data;
  } catch (erro) {
    console.error("Erro na chamada autenticada:", erro);
    throw erro;
  }
};

export const deletePub = async (rota: string) => {
  const token = await AsyncStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: "DELETE",
      url: `${BASE_URL}/${rota}/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro do Axios:", error.response?.data || error.message);
    } else {
      console.error("Erro não relacionado ao Axios:", error);
    }
    throw error;
  }
};

export const getUserByName = async (nomeUsuario: string): Promise<any | null> => {
  const token = await AsyncStorage.getItem('authToken');

  if (!token) {
    return null;
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/user/search/${nomeUsuario}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (erro) {
    if (axios.isAxiosError(erro) && erro.response?.status === 404) {
      console.error('Usuário não encontrado:', erro.response?.data || erro.message);
      return null;
    } else {
      console.error('Erro ao buscar usuários pelo nome:', erro);
      throw erro;
    }
  }
};