import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import PresidentePage from "./components/recinto/PresidentePage";
import AsambleistaNaPage from "./components/recinto/AsambleistaNaPage";
import AsambleistaProvPage from "./components/recinto/AsambleistaProvPage";
import DignidadCard from "./components/recinto/DignidadCard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DignidadCard />} />
          <Route path="/recinto-seleccionado" element={<PresidentePage />} />
          <Route path="/asambleista-nacional" element={<AsambleistaNaPage />} />
          <Route path="/asambleista-provincial" element={<AsambleistaProvPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
