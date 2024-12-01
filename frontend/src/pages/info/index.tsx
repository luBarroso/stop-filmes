import { useState } from "react";
import { getRankGenero } from "../../services/api";

interface RankProps {
  avg_nota: number;
  colocacao: number;
  nome: string;
}

interface FilmeProps {
  poster: string;
  titulo: string;
  ano_lancamento: number;
  arrecadacao: string;
  nome: string;
  funcao: string;
  sinopse: string;
}

export const Info = () => {
  const [rank, setRank] = useState<RankProps>();
  const [infoFilme, setInfoFilme] = useState<FilmeProps[]>();

  const fetchMovie = async () => {
    const id = 8;
    try {
      const response = await getRankGenero(id);
      if (response?.data) {
        setRank({
          avg_nota: response.data[0].avg_nota,
          colocacao: response.data[0].colocacao,
          nome: response.data[0].nome,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar o rank do gênero:", error);
    }
  };

  // useEffect(() => {
  //   fetchRank();
  //   fetchMovie();
  // }, []);

  return (
    <>
      <p>Página de Info</p>
    </>
  );
};
