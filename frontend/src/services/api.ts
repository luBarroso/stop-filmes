import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

export const getRankGenero = async (id: number) => {
  try {
    const response = await api.get(`/filme/rank/${id}`);
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

export const getGenresRand = async () => {
  try {
    const response = await api.get(`/filme/rand`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getMoviesLetter = async (letter: string, genero: string) => {
  return `
  [
    {
    'teste',
    },  
  ]
  `;
};
