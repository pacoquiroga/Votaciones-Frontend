import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const CandidatoCard = ({ nombre, partido, num_lista, imagen, className = "" }) => {
  const [votos, setVotos] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoVoto, setNuevoVoto] = useState("");

  const handleConfirmarVoto = () => {
    if (!nuevoVoto || nuevoVoto.trim() === "") {
      alert("Por favor, ingrese la cantidad de votos del partido.");
      return;
    }

    setVotos(nuevoVoto);
    setIsModalOpen(false);
    alert(`Se han asignado ${nuevoVoto} votos a ${nombre}.`);
  };

  return (
    <>
      {/* Tarjeta principal */}
      <div
        className={`bg-[#e2e2e2] rounded-[15px] p-5 text-black hover:bg-[#578aff] origin-center hover:origin-top cursor-pointer transform transition-transform duration-300 hover:scale-105 ${className} w-[20%] h-[90%] flex flex-col items-center justify-between`}
      >
        <div className="flex flex-col items-center w-full h-full">
          <img
            src={imagen}
            alt="imagen"
            className="w-[80%] h-auto object-cover mb-4 max-h-[50%]"
          />
          <p className="text-center text-lg font-bold">{nombre}</p>
          <p className="text-center text-sm">{partido}</p>
          <p className="text-center text-sm">Lista: {num_lista}</p>

          {/* Votos con botón de editar */}
          <div className="flex items-center gap-2 text-lg font-bold mt-2">
            <p>{votos} votos</p>
            <CiEdit
              size={24}
              className="cursor-pointer text-[#4880FF] hover:text-[#356ddb]"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal fuera de la tarjeta */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white w-[70%] p-5 rounded-md shadow-lg overflow-auto"
            style={{ maxHeight: "80vh" }}
          >
            <h2 className="text-xl font-bold mb-3">Editar Votos de {nombre}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Votos totales
              </label>
              <input
                type="number"
                value={nuevoVoto}
                onChange={(e) => setNuevoVoto(e.target.value)}
                placeholder="Ingrese el total de votos"
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4880FF]"
              />
            </div>
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
    </>
  );
};

export default CandidatoCard;
