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
    const response = await api.get(`pessoa/verificacao/${funcao}/${letra}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getRankGenero = async (id: number) => {
  try {
    const response = await api.get(`/filme/rank/${id}`);
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

export const getInfoFilme = async (id: number) => {
  try {
    const response = await api.get(`/filme/${id}`);
    return response;
  } catch (err) {
    console.error(err);
  }
};
