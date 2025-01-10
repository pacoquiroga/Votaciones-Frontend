import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const CandidatoCard = ({ nombre, partido, num_lista, imagen }) => {
  const [votos, setVotos] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoVoto, setNuevoVoto] = useState("");

  const handleEditar = () => {
    setIsModalOpen(true);
  };

  const handleConfirmarVoto = () => {
    if (nuevoVoto.trim() === "") {
      alert("Por favor, ingresa la cantidad de votos.");
      return;
    }

    setVotos(nuevoVoto);
    setIsModalOpen(false);
    alert(`Se han asignado ${nuevoVoto} votos a ${nombre}.`);
  };

  return (
    <div className="w-[18%] h-auto pb-5 bg-[#1a33a2] rounded-[15px] shadow-[1px_5px_60px_0px_rgba(16,10,136,0.42)] relative">
      <div className="w-[60%] h-[10px] bg-[#4880FF] mx-auto rounded-b-[15px] z-10 relative"></div>

      <div className="w-[70px] h-[70px] bg-[#4880FF] rounded-[15px] mx-auto mt-[25px] overflow-hidden">
        <img
          src={imagen || "default-image-url.jpg"}
          alt={`Foto de ${nombre}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center mt-5 text-white">
        <h2 className="text-lg font-bold">{nombre}</h2>
        <p className="text-sm">Partido: {partido}</p>
        <p className="text-sm">Lista: {num_lista}</p>
      </div>

      <div className="mt-5 flex justify-center items-center gap-3">
        <div className="w-[50%] p-2 bg-white text-black rounded-md text-center">
          {votos} votos
        </div>
        <button
          onClick={handleEditar}
          className="p-2 flex items-center gap-1 bg-[#4880FF] text-white rounded-md hover:bg-[#356ddb] transition duration-300"
        >
          <CiEdit className="w-5 h-5" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-[400px] p-5 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-3">Editar Votos</h2>
            <input
              type="number"
              placeholder="Ingrese nuevos votos"
              value={nuevoVoto}
              onChange={(e) => setNuevoVoto(e.target.value)}
              className="w-full p-2 mb-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4880FF]"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarVoto}
                className="p-2 bg-[#4880FF] text-white rounded-md hover:bg-[#356ddb] transition duration-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatoCard;
