import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConfigPage from "./pages/ConfigPage";
import JogadoresPage from "./pages/JogadoresPage";
import TorneioPage from "./pages/TorneioPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/config" />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/jogadores" element={<JogadoresPage />} />
        <Route path="/torneio" element={<TorneioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
