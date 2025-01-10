import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import './RecintoSeleccionado.css';
import CandidatoCard from "../CandidatoCard";

const array = ["Tungurahua", "Ambato", "La matriz", "Unidad Educativa Liceo Cevallos"];

//lista de juntas y candidatos

const juntas = [{ "id": "1", "candidato": <CandidatoCard nombre="Presidente" partido="Partido 1" num_lista="1" imagen="https://danielnoboaazin.com/wp-content/uploads/2020/09/Captura-de-pantalla-2023-05-09-a-las-21.17.25.png" /> },
{ "id": "2", "candidato": <CandidatoCard nombre="Asambleísta Nacional" partido="Partido 2" num_lista="2" imagen="https://danielnoboaazin.com/wp-content/uploads/2020/09/Captura-de-pantalla-2023-05-09-a-las-21.17.25.png" /> },
];

const RecintoSeleccionado = () => {
    const [inputValue, setInputValue] = useState("");
    const [selectedJunta, setSelectedJunta] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleJuntaClick = (id) => {
        setSelectedJunta(id);
    };

    return (
        <div className="w-full h-full p-5 bg-white rounded-[15px] relative">
            <div className="text-center">
                <p className="text-sm font-bold text-xl text-gray-500 text-left">
                    {array[0]} {'>'} {array[1]} {'>'} {array[2]} {'>'} <span className="text-transform: uppercase" style={{ color: '#4880FF' }}>{array[3]}</span>
                </p>
            </div>
            {/* Filtro de numero junta y seleccion de genero */}
            <div className="flex justify-between max-lg:flex-col items-center mt-8">
                {/* Primer filtro */}
                <div className="flex items-center gap-0 border border-black rounded-md overflow-hidden">
                    <div className="p-1 text-black items-center bg-[#4880FF] flex justify-center border-r border-black">
                        <FaFilter className="w-4 h-8" />
                    </div>
                    <div className="p-2 bg-[#4880FF] border-r border-black">
                        <input
                            type="text"
                            placeholder="N° Junta"
                            className="text-left bg-[#4880FF]"
                            style={{ appearance: 'none', color: 'white', width: '100px' }}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 text-black bg-[#4880FF]">
                        <select className="w-full text-left bg-[#4880FF]" style={{ appearance: 'textfield', color: 'white' }}>
                            <option value="" disabled selected hidden>Género</option>
                            <option value="1">Masculino</option>
                            <option value="2">Femenino</option>
                        </select>
                    </div>
                </div>
                {/* Segundo filtro */}
                <div className="flex items-center gap-0 border border-black rounded-md overflow-hidden">
                    <div className="p-1 text-black items-center bg-[#4880FF] rounded-l-md flex justify-center border-r border-black">
                        <FaFilter className="w-4 h-8" />
                    </div>
                    <div className="p-2 text-black rounded-r-md bg-[#4880FF]">
                        <select className="w-full text-left bg-[#4880FF]" style={{ appearance: 'textfield', color: 'white' }}>
                            <option value="" disabled selected hidden>Dignidad</option>
                            <option value="1">Presidente</option>
                            <option value="2">Asambleísta Nacional</option>
                            <option value="3">Asambleísta Provincial</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="text-center mt-3">
                <p className="text-sm font-bold text-lg text-black text-left pl-5">
                    Ingrese la cantidad de votos para la dignidad seleccionada
                </p>
            </div>
            <div className="border border-black rounded-md overflow-hidden mt-3">
                <div className="flex">
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-r border-black w-[10%]">
                        <p className="text-black text-center font-bold text-xs"># Junta</p>
                    </div>
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-black w-[90%]">
                        <p className="text-black text-center font-bold text-xs">Candidatos</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[10%]">
                        {juntas.map((junta) => (
                            <div
                                key={junta.id}
                                className={`p-3 text-black items-center justify-center border-b border-r border-black cursor-pointer hover ${selectedJunta === junta.id ? 'bg-[#4880FF]' : 'bg-white'}`}
                                onClick={() => handleJuntaClick(junta.id)}
                            >
                                <p className="text-black text-center font-bold text-xs">{junta.id}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-[90%] p-3">
                        {selectedJunta && juntas.find(junta => junta.id === selectedJunta).candidato}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecintoSeleccionado;
