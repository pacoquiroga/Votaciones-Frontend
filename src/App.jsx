import { useState } from "react";
import CandidatosCard from "./components/CandidatoCard";
import Layout from "./pages/Layout";
import PaginaPrincipal from "./pages/PaginaPrincipal";

function App() {
  return (
    <>
      <Layout Contenido={ PaginaPrincipal }/>
    </>
  );
}

export default App;
