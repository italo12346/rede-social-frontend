const BASE_URL = "https://lenslink.onrender.com";

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
    throw error;
  }
};

export const fazerChamadaAutenticada = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/foto/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro na chamada autenticada");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    throw error;
  }
};
