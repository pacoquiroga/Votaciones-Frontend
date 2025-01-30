import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import PresidentePage from "./components/recinto/PresidentePage";
import AsambleistaNaPage from "./components/recinto/AsambleistaNaPage";
import AsambleistaProvPage from "./components/recinto/AsambleistaProvPage";
import DignidadPage from "./components/recinto/DignidadPage";
import { useStore } from "./store/store";

function App() {
  const recinto = useStore((state) => state.recinto);
  return (
    <Layout>
      {
        recinto.recintoId === 0 ? <PaginaPrincipal/>
        : <Router>
            <Routes>
              <Route path="/recinto-seleccionado" element={<PresidentePage />} />
              <Route path="/asambleista-nacional" element={<AsambleistaNaPage />} />
              <Route path="/asambleista-provincial" element={<AsambleistaProvPage />} />
              <Route path="/" element={<DignidadPage />} />
            </Routes>
          </Router>
      }
    </Layout>
  );
}

export default App;
