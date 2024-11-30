import {
  ChosenLetter,
  Container,
  H2,
  Header,
  LetterContainer,
  Main,
} from "./styles";

export const Quiz = () => {
  return (
    <Container>
      <Main>
        <Header>
          <H2>STOP FILMES</H2>
          <LetterContainer>
            LETRA: <ChosenLetter>A</ChosenLetter>
          </LetterContainer>
        </Header>
      </Main>
    </Container>
  );
};
