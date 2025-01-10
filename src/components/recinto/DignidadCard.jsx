import React from "react";
import { useNavigate } from "react-router-dom";

const DignidadCard = () => {
    const navigate = useNavigate();

    const dignidad = [
        { "id": "1", "nombre": "Presidente y Vicepresidente", "imagen": "https://votoinformado.cne.gob.ec/assets/dignidades/binomio.png" },
        { "id": "2", "nombre": "Asambleísta Nacionales", "imagen": "https://votoinformado.cne.gob.ec/assets/dignidades/nacionales.png" },
        { "id": "3", "nombre": "Asambleísta Provinciales",  "imagen": "https://votoinformado.cne.gob.ec/assets/dignidades/provinciales.png" },
    ];

    const handleDignidadClick = (id) => {
        if (id === "1") {
            navigate("/recinto-seleccionado");
        } else if (id === "2") {
            navigate("/asambleista-nacional");
        } else if (id === "3") {
            navigate("/asambleista-provincial");
        }
    };

    return (
        <div className="w-full h-full p-5 bg-white rounded-[15px] relative">
            <div className="text-center">
                <p className="text-sm font-bold text-xl text-left">
                    Dignidades
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {dignidad.map((d) => (
                    <div 
                        key={d.id} 
                        className="bg-[#4880FF] rounded-[15px] p-5 text-white hover:bg-[#578aff] origin-center hover:origin-top cursor-pointer transform transition-transform duration-300 hover:scale-105"
                        onClick={() => handleDignidadClick(d.id)}
                    >
                        <img src={d.imagen} alt="imagen" className="w-30 h-40 object-cover mx-auto rounded-full" />
                        <p className="text-center text-lg font-bold ">{d.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DignidadCard;