import styled from "styled-components";

export const Content = styled.div`
  background: #ddbea9;
  height: 95vh;
  width: 95vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Container = styled.div`
  background: #7d4f50;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #000;

  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  .header h1 {
    color: #7d4f50;
    font-family: Montserrat;
    font-size: 3rem;
    font-weight: 800;
    margin: 0;
    margin-top: 20px;
  }
  .header p {
    color: #603e3e;
    font-family: Montserrat;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0;
    margin: 0;
  }
  .movie {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 30px;
    width: 80%;
  }
  .movie img {
    width: 90px;
    height: auto;
    margin-right: 20px;
  }
  .movie-details {
    display: flex;
    /* grid-template-columns: repeat(2, minmax(0, 1fr)); */
    flex-direction: row;
    width: 100%;
  }
  .movie-details h3 {
    font-size: 18px;
    margin: 0 0 10px;
  }
  .movie-details p {
    margin: 5px 0;
    font-size: 14px;
  }

  .continue-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    background-color: #4a2e2a;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease;
  }

  .continue-btn:hover {
    background-color: #71494a; /* Cor de fundo ao passar o mouse */
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  max-height: 150px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-left: 10px;
  border-left: 2px solid #793c3d;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Image = styled.img``;

export const IndexContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 4vw;
  font-size: 18px;
  z-index: 100;
`;

// Estilo para os links de navegação
export const IndexLink = styled.div`
  margin: 5px 0;
  cursor: pointer;
  font-weight: bold;
  color: #532626;

  &:hover {
    color: #793c3d;
  }
`;

export const Section = styled.div`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
