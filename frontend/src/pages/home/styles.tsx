import styled from "styled-components";
import homeBackgroung from "../../assets/home-background.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;
  background-color: #fff;
  color: black;
  background-image: url(${homeBackgroung});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const H1 = styled.h1`
  text-align: center;
  color: #ffe8d6;
  font-family: Montserrat;
  font-size: 6rem;
  font-weight: 900;
  width: 400px;
`;
