import styled from "styled-components";

export const Container = styled.div`
  background: #7d4f50;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.main`
  background: #ddbea9;
  height: 95%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const H2 = styled.h2`
  color: #7d4f50;
  font-family: Montserrat;
  font-size: 3rem;
  font-weight: 800;
`;

export const LetterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  right: 20px;

  color: #7d4f50;
  font-family: Montserrat;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const ChosenLetter = styled.span`
  color: #ddbea9;
  font-family: Montserrat;
  font-size: 2.5rem;
  font-weight: 700;
  background: #7d4f50;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  margin-left: auto;
`;
