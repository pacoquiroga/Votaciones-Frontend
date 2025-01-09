import { useState } from "react";
import CandidatosCard from "./components/CandidatoCard";
import RecintoSeleccionado from "./components/recinto/RecintoSeleccionado";

function App() {
  return (
    <>
      <div className="bg-white flex justify-center items-center">	
        <RecintoSeleccionado />
      </div>
      <div className="bg-white flex justify-center items-center">
        <CandidatosCard nombre={"Daniel Noboa"} partido={"ADN"} num_lista={"1"} imagen={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYUY7htlIIUKF2SiKc3D3NCOggJlNja8E_hg&s"}/>
      </div>
    </>
  );
}

export default App;
