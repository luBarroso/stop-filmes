import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Quiz } from "./pages/quiz";
import { Info } from "./pages/info";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogo" element={<Quiz />} />
          <Route path="/info/:genero" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
