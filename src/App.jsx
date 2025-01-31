import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import Simulacion from "./pages/Simulacion";
import PresidentePage from "./components/recinto/PresidentePage";
import AsambleistasPage from "./components/recinto/AsambleistasPage";
import DignidadPage from "./components/recinto/DignidadPage";
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
        : 
            <Routes>
              <Route path="/recinto-seleccionado" element={<PresidentePage />} />
              <Route path="/asambleista-nacional" element={<AsambleistasPage />} />
              <Route path="/asambleista-provincial" element={<AsambleistasPage />} />
              <Route path="/parlamento-andino" element={<AsambleistasPage />} />
              <Route path="/asambleista-circunscripcion" element={<AsambleistasPage />} />
              
              <Route path="/" element={<DignidadPage />} />
            </Routes>
      }
    </Layout>
  );
}

export default App;
