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
import {
  getGenresRand,
  getVerificaFilme,
  getVerificaPessoa,
} from "../../services/api";
import { useNavigate } from "react-router-dom";

interface GeneroFilme {
  genero: Genero;
  filmes: Filme[];
}

interface Genero {
  nome: string;
}

interface Filme {
  titulo: string;
}

interface AnswerProps {
  value: Filme;
  genre: string;
  correct: boolean;
}

interface AnswerActorProps {
  value: Genero;
  funcao: string;
  correct: boolean;
}

interface ActorFunction {
  funcao: string;
  actor: Genero[];
}

export const Quiz = () => {
  const [letter, setLetter] = useState("");
  const [answers, setAnswers] = useState<AnswerProps[]>([
    {
      value: {
        titulo: "",
      },
      genre: "",
      correct: false,
    },
    {
      value: {
        titulo: "",
      },
      genre: "",
      correct: false,
    },
    {
      value: {
        titulo: "",
      },
      genre: "",
      correct: false,
    },
    {
      value: {
        titulo: "",
      },
      genre: "",
      correct: false,
    },
    {
      value: {
        titulo: "",
      },
      genre: "",
      correct: false,
    },
    {
      value: {
        titulo: "",
      },
      genre: "",
      correct: false,
    },
  ]);
  const [answersActors, setAnswersActors] = useState<AnswerActorProps[]>([
    {
      value: {
        nome: "",
      },
      funcao: "",
      correct: false,
    },
    {
      value: {
        nome: "",
      },
      funcao: "",
      correct: false,
    },
    {
      value: {
        nome: "",
      },
      funcao: "",
      correct: false,
    },
  ]);
  const [generos, setGeneros] = useState<Genero[]>();
  const [movies, setMovies] = useState<GeneroFilme[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const funcoes = ["Actor", "Director", "Composer"];
  const [actors, setActors] = useState<ActorFunction[]>([]);

  const navigate = useNavigate();

  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };

  const fetchGeneros = async () => {
    try {
      const response = await getGenresRand();
      if (response?.data && Array.isArray(response.data)) {
        setGeneros(response.data.filter((g) => g)); // Filter empty genres
      }
    } catch (error) {
      console.error("Erro ao buscar o rank do gênero:", error);
    }
  };

  const fetchMoviesLetter = async () => {
    try {
      const moviePromises = generos?.map(async (genero: Genero) => {
        const genreName = genero.nome;
        const response = await getVerificaFilme(genreName, letter);
        if (response?.data) {
          return {
            genero: genero,
            filmes: response.data,
          };
        }
        console.error(`No movies found for ${genreName}`);
        return null;
      });
      if (moviePromises) {
        const moviesData = (await Promise.all(moviePromises)).filter(Boolean);
        console.log(moviesData);
        setMovies(moviesData as GeneroFilme[]);
      }
    } catch (error) {
      console.error(`Erro ao buscar os filmes da letra ${letter}:`, error);
    }
  };

  const fetchPeopleLetter = async () => {
    try {
      const actorsPromises = funcoes.map(async (funcao: string) => {
        const response = await getVerificaPessoa(funcao, letter);
        if (response?.data && Array.isArray(response.data)) {
          return {
            funcao: funcao,
            actor: response.data,
          };
        }
        console.error(`No actors found for ${funcao}`);
        return { funcao, actor: [] };
      });

      const actorsData = (await Promise.all(actorsPromises)).filter(Boolean);
      console.log(actorsData);
      setActors(actorsData as ActorFunction[]);
    } catch (error) {
      console.error(`Erro ao buscar os atores com a letra ${letter}:`, error);
    }
  };

  useEffect(() => {
    setStartTime(Date.now());
    setLetter(getRandomLetter());
    fetchGeneros();
  }, []);

  useEffect(() => {
    if (generos?.some((g) => g)) {
      fetchMoviesLetter();
    }
    fetchPeopleLetter();
  }, [generos]);

  const handleInputChange = (index: number, value: string, genre: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].value.titulo = value;
    updatedAnswers[index].genre = genre;
    setAnswers(updatedAnswers);
  };

  const handleInputChangeActors = (
    index: number,
    value: string,
    funcao: string
  ) => {
    const updatedAnswers = [...answersActors];
    updatedAnswers[index].value.nome = value;
    updatedAnswers[index].funcao = funcao;
    setAnswersActors(updatedAnswers);
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    setResponseTime(timeTaken);
    console.log("Respostas:", answers);
    console.log(`Tempo de resposta: ${timeTaken / 1000} segundos`);

    for (let i = 0; i < 6; i++) {
      if (
        movies[i].filmes.some(
          (filme) =>
            filme.titulo.toLowerCase() === answers[i].value.titulo.toLowerCase()
        )
      ) {
        console.log(movies[i].genero, "-", answers[i].value.titulo);
        const updatedAnswers = answers.map((answer, index) =>
          index === i ? { ...answer, correct: true } : answer
        );
        setAnswers(updatedAnswers);
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        actors[i].actor.some(
          (filme) =>
            filme.nome.toLowerCase() ===
            answersActors[i].value.nome.toLowerCase()
        )
      ) {
        console.log(actors[i].funcao, "-", answersActors[i].value.nome);
        const updatedAnswers = answersActors.map((answer, index) =>
          index === i ? { ...answer, correct: true } : answer
        );
        setAnswersActors(updatedAnswers);
      }
    }
  };

  return (
    <Container>
      <Main>
        <Header>
          <H2>{responseTime === null ? "STOP FILMES" : "RESULTADOS"}</H2>
          <LetterContainer>
            LETRA: <ChosenLetter>{letter}</ChosenLetter>
          </LetterContainer>
        </Header>
        <InputGrid>
          {generos?.map(
            (label, index) =>
              movies[index]?.filmes.length !== 0 && (
                <InputContainer key={index}>
                  <Label>
                    {label.nome
                      ? `Filme do gênero "${label.nome}"`
                      : `Filme do gênero desconhecido`}
                  </Label>
                  <Input
                    placeholder={`Digite o nome do ${
                      label.nome ? label.nome.toLowerCase() : "gênero"
                    }`}
                    value={answers[index].value.titulo}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value, label.nome)
                    }
                    $answered={responseTime !== null}
                    $correct={answers[index].correct}
                    readOnly={responseTime !== null}
                  />

                  {responseTime !== null && (
                    <p
                      style={{ color: "#603e3e", fontWeight: 500, margin: 0 }}
                      onClick={() => navigate("/info/" + label.nome)}
                    >
                      Ver filmes de {label.nome}
                    </p>
                  )}
                </InputContainer>
              )
          )}
        </InputGrid>
        <InputGrid>
          {funcoes.map(
            (label, index) =>
              actors[index]?.actor.length !== 0 && (
                <InputContainer key={index}>
                  <Label>
                    {label
                      ? `Filme do gênero "${label}"`
                      : `Filme do gênero desconhecido`}
                  </Label>
                  <Input
                    placeholder={`Digite o nome do ${
                      label ? label.toLowerCase() : "gênero"
                    }`}
                    value={answersActors[index].value.nome}
                    onChange={(e) =>
                      handleInputChangeActors(index, e.target.value, label)
                    }
                    $answered={responseTime !== null}
                    $correct={answersActors[index].correct}
                    readOnly={responseTime !== null}
                  />
                </InputContainer>
              )
          )}
        </InputGrid>
        {responseTime === null && (
          <Button value="Enviar" onClick={handleSubmit} />
        )}
        {responseTime !== null && (
          <p style={{ color: "#603e3e", fontWeight: 500, margin: 0 }}>
            Você levou {responseTime / 1000} segundos para responder.
          </p>
        )}
      </Main>
    </Container>
  );
};
