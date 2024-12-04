import { useEffect, useRef, useState } from "react";
import { getInfoFilme, getRankGenero } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Page404 } from "../404";
import {
  Container,
  Main,
  MovieContainer,
  Image,
  IndexContainer,
  IndexLink,
  Section,
  Content,
} from "./styles";

interface RankProps {
  avg_nota: number;
  colocacao: number;
  nome: string;
}

interface InfoFilmesProps {
  poster: string;
  titulo: string;
  ano_lancamento: number;
  arrecadacao: string;
  people: [
    {
      person_name: string;
      person_function: string;
    }
  ];
}

export const Info = () => {
  const { genero } = useParams<{ genero: string }>();

  const navigate = useNavigate();

  const [infoFilmes, setInfoFilmes] = useState<InfoFilmesProps[]>([]);
  const [rank, setRank] = useState<RankProps>();
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  if (genero) {
    const fetchInfoFilmes = async () => {
      try {
        const response = await getInfoFilme(genero);
        if (response?.data && Array.isArray(response.data)) {
          setInfoFilmes(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar o rank do gênero:", error);
      }
    };

    const fetchRankGenero = async () => {
      try {
        const response = await getRankGenero(genero);
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

    useEffect(() => {
      fetchRankGenero();
      fetchInfoFilmes();
    }, []);

    // Função para rolar até a seção correspondente
    const scrollToSection = (letter: string) => {
      const section = sectionsRef.current[letter];
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Organiza os filmes por letra inicial
    const groupedMovies = infoFilmes.reduce((acc, movie) => {
      const firstLetter = movie.titulo[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(movie);
      return acc;
    }, {} as { [key: string]: InfoFilmesProps[] });

    const sortedLetters = Object.keys(groupedMovies).sort();

    return (
      <Container>
        <button className="continue-btn" onClick={() => navigate("/jogo")}>
          Continuar
        </button>
        <Content>
          <div className="header">
            <h1>
              Filmes de {genero} - {rank?.avg_nota}
            </h1>
            <p>
              {genero} está rankeado como {rank?.colocacao} entre gêneros
            </p>
          </div>
          <Main>
            <IndexContainer>
              {sortedLetters.map((letter) => (
                <IndexLink key={letter} onClick={() => scrollToSection(letter)}>
                  {letter}
                </IndexLink>
              ))}
            </IndexContainer>

            {sortedLetters.map((letter) => (
              <Section
                key={letter}
                ref={(el) => (sectionsRef.current[letter] = el)}
              >
                <h2>{letter}</h2>
                {groupedMovies[letter].map((movie, index) => (
                  <div className="movie" key={index}>
                    <Image src={movie.poster} alt="Filme 1" />
                    <div className="movie-details">
                      <MovieContainer>
                        <h3>{movie.titulo}</h3>
                        <p>Ano: {movie.ano_lancamento}</p>
                        <p>Arrecadação: US$ {movie.arrecadacao}</p>
                      </MovieContainer>
                      <MovieContainer>
                        {movie.people.map((person, i) => (
                          <p key={i}>
                            {person.person_name} - {person.person_function}
                          </p>
                        ))}
                      </MovieContainer>
                    </div>
                  </div>
                ))}
              </Section>
            ))}
          </Main>
        </Content>
      </Container>
    );
  } else return <Page404 />;
};
