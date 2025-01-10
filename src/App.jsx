import { useState } from "react";
import CandidatosCard from "./components/CandidatoCard";
import Layout from "./pages/Layout";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import RecintoSeleccionado from "./components/recinto/RecintoSeleccionado"

function App() {
  return (
    <>
      <Layout Contenido={ RecintoSeleccionado }/>
    </>
  );
}

export default App;
