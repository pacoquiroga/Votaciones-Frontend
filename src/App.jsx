import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import Simulacion from "./pages/Simulacion";
import PresidentePage from "./components/recinto/PresidentePage";
import AsambleistaNaPage from "./components/recinto/AsambleistaNaPage";
import AsambleistaProvPage from "./components/recinto/AsambleistaProvPage";
import DignidadCard from "./components/recinto/DignidadCard";
import { useStore } from "./store/store";
import { simulacionStore } from "./store/simulacionStore";

import { useEffect } from "react";
import { simulacionesApi } from "./api/simulacionesApi";

function App() {

  useEffect(() => {
    const cargarSimulacion = async () => {
      try {
        const response = await simulacionesApi.get(
          `/activa`
        );
        if (response.data === "") {
          return;
        }
        simulacionStore.getState().setSimulacion(response.data);
      } catch (error) {
        console.log("Error al cargar la simulacion");
      }
    };
    cargarSimulacion();
  },[])

  const recinto = useStore((state) => state.recinto);
  const simulacion = simulacionStore((state) => state.simulacion);
  return (
    <Layout>
      {
        simulacion.idSimulacion === 0 ? <Simulacion/> :
        recinto.recintoId === 0 ? <PaginaPrincipal/>
        : <Router>
            <Routes>
              <Route path="/recinto-seleccionado" element={<PresidentePage />} />
              <Route path="/asambleista-nacional" element={<AsambleistaNaPage />} />
              <Route path="/asambleista-provincial" element={<AsambleistaProvPage />} />
              <Route path="/" element={<DignidadCard />} />
            </Routes>
          </Router>
      }
    </Layout>
  );
}

export default App;
