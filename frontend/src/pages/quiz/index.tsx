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
  Pontuacao,
} from "./styles";
import {
  getAvalFilme,
  getGenresRand,
  getVerificaFilme,
  getVerificaPessoa,
  getVotosFilme,
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
  id: string;
  titulo: string;
}

interface AnswerProps {
  value: Filme;
  genre: string;
  correct: boolean;
  pontuacao: number;
}

interface AnswerActorProps {
  value: Genero;
  funcao: string;
  correct: boolean;
  pontuacao: number;
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
        id: "",
      },
      genre: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        titulo: "",
        id: "",
      },
      genre: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        titulo: "",
        id: "",
      },
      genre: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        titulo: "",
        id: "",
      },
      genre: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        titulo: "",
        id: "",
      },
      genre: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        titulo: "",
        id: "",
      },
      genre: "",
      correct: false,
      pontuacao: 0,
    },
  ]);
  const [answersActors, setAnswersActors] = useState<AnswerActorProps[]>([
    {
      value: {
        nome: "",
      },
      funcao: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        nome: "",
      },
      funcao: "",
      correct: false,
      pontuacao: 0,
    },
    {
      value: {
        nome: "",
      },
      funcao: "",
      correct: false,
      pontuacao: 0,
    },
  ]);
  const [generos, setGeneros] = useState<Genero[]>();
  const [movies, setMovies] = useState<GeneroFilme[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const funcoes = ["Actor", "Director", "Composer"];
  const [actors, setActors] = useState<ActorFunction[]>([]);
  const [pontuTotal, setPontuTotal] = useState(0);

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

  const fetchVotosFilme = async (id: string) => {
    try {
      const response = await getVotosFilme(id);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar os votos do filme:", error);
    }
  };

  const fetchAvalFilme = async (id: string) => {
    try {
      const response = await getAvalFilme(id);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar a avaliação do filme:", error);
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
    const updatedAnswers = answers.map((answer, idx) =>
      idx === index
        ? { ...answer, value: { ...answer.value, titulo: value }, genre }
        : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleInputChangeActors = (
    index: number,
    value: string,
    funcao: string
  ) => {
    const updatedAnswers = answersActors.map((answer, idx) =>
      idx === index
        ? { ...answer, value: { ...answer.value, nome: value }, funcao }
        : answer
    );
    setAnswersActors(updatedAnswers);
  };

  const handleSubmit = async () => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    setResponseTime(timeTaken);
    console.log("Respostas:", answers);
    console.log(`Tempo de resposta: ${timeTaken / 1000} segundos`);

    const updatedAnswers = await Promise.all(
      answers.map(async (answer, i) => {
        const isCorrect = movies[i].filmes.some(
          (filme) =>
            filme.titulo.toLowerCase() === answer.value.titulo.toLowerCase()
        );

        if (isCorrect) {
          const filme = movies[i].filmes.find(
            (filme) =>
              filme.titulo.toLowerCase() === answer.value.titulo.toLowerCase()
          );
          if (filme) {
            const qtd_votos = await fetchVotosFilme(filme.id);
            const aval = await fetchAvalFilme(filme.id);
            console.log(aval);
            setPontuTotal(
              (prevValue) =>
                prevValue + (qtd_votos[0] ? 20 : 10) + (aval[0] ? 5 : 0)
            );
            return {
              ...answer,
              value: { ...answer.value, id: filme.id },
              correct: true,
              pontuacao: qtd_votos[0] ? 20 : 10 + (aval[0] ? 5 : 0),
            };
          }
        }
        return answer;
      })
    );

    setAnswers(updatedAnswers);

    const updatedAnswersActors = answersActors.map((answer, i) => {
      const isCorrect = actors[i].actor.some(
        (filme) => filme.nome.toLowerCase() === answer.value.nome.toLowerCase()
      );

      if (isCorrect) {
        console.log(actors[i].funcao, "-", answer.value.nome);
        setPontuTotal((prevValue) => prevValue + 30);
        return {
          ...answer,
          correct: true,
          pontuacao: 30,
        };
      }

      return answer;
    });

    setAnswersActors(updatedAnswersActors);
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
                  {responseTime !== null && (
                    <Pontuacao>+{answers[index].pontuacao}</Pontuacao>
                  )}

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
                      style={{
                        color: "#603e3e",
                        fontWeight: 500,
                        margin: 0,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
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
                      ? `Pessoa da função "${label}"`
                      : `Pessoa desconhecida`}
                  </Label>
                  {responseTime !== null && (
                    <Pontuacao>+{answersActors[index].pontuacao}</Pontuacao>
                  )}
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
            Pontuação Total = {pontuTotal}. Você levou {responseTime / 1000}{" "}
            segundos para responder!
          </p>
        )}
      </Main>
    </Container>
  );
};
