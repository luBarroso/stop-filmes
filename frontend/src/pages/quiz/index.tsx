import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import {
  ChosenLetter,
  Container,
  H2,
  Header,
  Input,
  InputContainer,
  InputGrid,
  Label,
  LetterContainer,
  Main,
} from "./styles";
import { getGenresRand, getMoviesLetter } from "../../services/api";

interface GeneroFilme {
  genero: string;
  filmes: string[];
}

export const Quiz = () => {
  const [letter, setLetter] = useState("");
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [generos, setGeneros] = useState<string[]>(["", "", "", ""]);
  const [movies, setMovies] = useState<GeneroFilme[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  const fetchGeneros = async () => {
    try {
      const response = await getGenresRand();
      if (response?.data && Array.isArray(response.data)) {
        setGeneros(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar o rank do gênero:", error);
    }
  };

  const fetchMoviesLetter = async () => {
    try {
      const moviePromises = generos.map(async (genero, index) => {
        const response = await getMoviesLetter(letter, genero);
        if (response?.data) {
          const updatedAnswers = [...answers];
          updatedAnswers[index] = response.data;
          setAnswers(updatedAnswers);
          return {
            genero,
            filmes: response.data,
          };
        }
        return null;
      });

      const moviesData = (await Promise.all(moviePromises)).filter(Boolean);
      setMovies(moviesData as GeneroFilme[]);
    } catch (error) {
      console.error(`Erro ao buscar os filmes da letra ${letter}:`, error);
    }
  };

  useEffect(() => {
    setStartTime(Date.now());
    setLetter(getRandomLetter());
    fetchGeneros();
  }, []);

  useEffect(() => {
    if (generos.some((g) => g)) {
      fetchMoviesLetter();
    }
  }, [generos, letter]);

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    setResponseTime(timeTaken);
    console.log("Respostas:", answers);
    console.log(`Tempo de resposta: ${timeTaken / 1000} segundos`);
  };

  return (
    <Container>
      <Main>
        <Header>
          <H2>STOP FILMES</H2>
          <LetterContainer>
            LETRA: <ChosenLetter>{letter}</ChosenLetter>
          </LetterContainer>
        </Header>
        <InputGrid>
          {["Alguma coisa", "Alguma coisa", "Alguma coisa"].map(
            (label, index) => (
              <InputContainer key={index}>
                <Label>{label}</Label>
                <Input
                  placeholder=""
                  value={answers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </InputContainer>
            )
          )}
        </InputGrid>
        <Button value="Enviar" onClick={handleSubmit}></Button>
        {responseTime !== null && (
          <p>Você levou {responseTime / 1000} segundos para responder.</p>
        )}
      </Main>
    </Container>
  );
};
