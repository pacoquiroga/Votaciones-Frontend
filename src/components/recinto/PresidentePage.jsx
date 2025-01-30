import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import './PresidentePage.css';
import { FaUserTie } from "react-icons/fa";
import CandidatoCard from "../CandidatoCard";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { candidatoApi } from "../../api/candidatoApi";
import { juntaApi } from "../../api/juntaApi";

const RecintoSeleccionado = () => {
    const location = useLocation();
    const candidatoId = location.state?.candidatoId;
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const recinto = useStore((state) => state.recinto);
    const [candidatosData, setCandidatos] = useState({
        candidatos: [],
        numPartido: ""
    });
    const [junta, setJunta] = useState([]);
    const [selectedGender, setSelectedGender] = useState('M');
    const [filteredJuntas, setFilteredJuntas] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedJuntaId, setSelectedJuntaId] = useState(null);

    const cargarJuntas = async (gender) => {
        try {
            const response = await juntaApi.get(`/menu?idRecinto=${recinto.recintoId}`);
            const juntasFiltradas = response.data.filter(junta => junta.genero === gender);
            setJunta(response.data);
            setFilteredJuntas(juntasFiltradas);
        } catch (error) {
            console.error("Error cargando juntas:", error);
        }
    };

    useEffect(() => {
        if (recinto.recintoId) {
            cargarJuntas(selectedGender);
        }
    }, [recinto.recintoId, selectedGender]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const filtrarJuntas = () => {
        if (!inputValue) {
            return filteredJuntas;
        }
        return filteredJuntas.filter(junta =>
            junta.numJunta.toString() === inputValue
        );
    };

    const handleJuntaClick = async (juntaId) => {
        try {
            setIsLoading(true);
            setSelectedJuntaId(juntaId);

            const response = await candidatoApi.get(`/menu?idDignidad=${candidatoId}`);
            console.log('Datos de candidatos recibidos:', response.data);
            console.log('Datos de candidatos recibidos:', response.data.candidatos);

            if (response.data) {
                setCandidatos(response.data);
                setShowCards(true);
            }
        } catch (error) {
            console.error('Error cargando candidatos:', error);
            setCandidatos({ candidatos: [], numPartido: "" });
            setShowCards(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVolverClick = () => {
        navigate("/");
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

    return (
        <div className="w-full h-full p-5 bg-white rounded-[15px] relative">
            {/* Header section remains the same */}
            <div className="text-left">
                <button className="bg-[#4880FF] text-white font-bold text-base p-1 rounded-md" onClick={handleVolverClick}>
                    <IoMdArrowRoundBack className="inline-block" /> Volver
                </button>
            </div>

            <div className="text-center">
                <p className="text-sm font-bold text-xl text-gray-500 text-left">
                    {recinto.provincia} {'>'} {recinto.canton} {'>'} {recinto.parroquia} {'>'}
                    <span className="text-transform: uppercase" style={{ color: '#4880FF' }}>
                        {recinto.recintoNombre}
                    </span>
                </p>
            </div>

            {/* Filters section */}
            <div className="flex justify-between max-lg:flex-col items-center mt-8">
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
                        <select
                            className="w-full text-left bg-[#4880FF]"
                            style={{ appearance: 'textfield', color: 'white' }}
                            value={selectedGender}
                            onChange={handleGenderChange}
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main content */}
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
                        {filtrarJuntas().map((junta) => (
                            <div
                                key={junta.idJunta}
                                className={`p-3 text-black items-center justify-center border-b border-r border-black cursor-pointer hover:bg-sky-700 ${selectedJuntaId === junta.idJunta ? 'bg-sky-700 text-white' : ''
                                    }`}
                                onClick={() => handleJuntaClick(junta.idJunta)}
                            >
                                <p className="text-center font-bold text-xs">{junta.numJunta}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-[90%] p-3">
                        {isLoading && (
                            <p className="text-center">Cargando candidatos...</p>
                        )}

                        {!isLoading && !showCards && (
                            <p className="text-center text-lg text-red-500">
                                Por favor seleccione una junta para ver los candidatos
                            </p>
                        )}

                        {!isLoading && showCards && candidatosData && candidatosData.length > 0 ? (
                            <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 p-1 mb-3 overflow-y-auto"
                                style={{ maxHeight: '350px' }}>
                                {candidatosData.map(partido => (
                                    <div key={partido.idCandidato}
                                        className="bg-[#e2e2e2] rounded-[15px] p-5 text-black hover:bg-[#578aff] origin-center hover:origin-top cursor-pointer transform transition-transform duration-300 hover:scale-105">
                                        {partido.candidatos.map(candidato => (
                                            <div key={candidato.idCandidato}>
                                                <img
                                                    src={candidato.fotoCandidato ? null : <FaUserTie />}
                                                    alt={candidato.nombreCandidato}
                                                    className="w-25 h-40 object-cover mx-auto"
                                                />
                                                <p className="text-center text-lg font-bold mt-2">{candidato.nombreCandidato}</p>
                                                <p className="text-center text-lg font-bold">{candidato.posicion}</p>
                                            </div>
                                        ))}
                                        <p className="text-center text-lg font-bold">LISTA: {candidatosData.numPartido}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            showCards && !isLoading && (
                                <p className="text-center text-lg text-red-500">
                                    No se encontraron candidatos para mostrar
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecintoSeleccionado;