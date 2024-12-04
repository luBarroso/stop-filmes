import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

export const getVerificaFilme = async (genero: string, letra: string) => {
  try {
    const response = await api.get(`filme/verificacao/${genero}/${letra}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getAvalFilme = async (id: number) => {
  try {
    const response = await api.get(`/filme/avaliacao/${id}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getVerificaPessoa = async (funcao: string, letra: string) => {
  try {
    const response = await api.get(`/pessoa/verificacao/${funcao}/${letra}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getRankGenero = async (genero: string) => {
  try {
    const response = await api.get(`/filme/rank/${genero}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getVotosFilme = async (id: number) => {
  try {
    const response = await api.get(`/filme/votos/${id}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getInfoFilme = async (genero: string) => {
  try {
    const response = await api.get(`/filme/${genero}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getGenresRand = async () => {
  try {
    const response = await api.get(`/genero/rand`);
    return response;
  } catch (err) {
    console.error(err);
  }
};
