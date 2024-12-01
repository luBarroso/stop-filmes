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
  font-size: 2rem;
  font-weight: 700;
`;

export const ChosenLetter = styled.span`
  color: #ddbea9;
  font-family: Montserrat;
  font-size: 2rem;
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

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  outline: 0;
  border: 0;
  color: #000;
  font-family: Montserrat;
  font-weight: 500;
  padding: 10px;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const Label = styled.label`
  color: #7d4f50;
  font-family: Montserrat;
  font-size: 1rem;
  font-weight: 700;
`;
