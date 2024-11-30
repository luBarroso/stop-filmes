import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Container, H1 } from "./styles";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <H1>STOP FILMES</H1>
      <Button value="Começar" onClick={() => navigate("/quiz")} />
    </Container>
  );
};
