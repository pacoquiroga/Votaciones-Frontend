import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import './PresidentePage.css';
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { candidatoApi } from "../../api/candidatoApi";
import { juntaApi } from "../../api/juntaApi";

const PresidentePage = () => {
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
    const [votos, setVotos] = useState([]);  // Definir el estado de votos

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Realizar ambas solicitudes al mismo tiempo
                const [candidatosResponse, juntasResponse] = await Promise.all([
                    candidatoApi.get(`/menu?idDignidad=${candidatoId}`),
                    juntaApi.get(`/menu?idRecinto=${recinto.recintoId}`)
                ]);
    
                // Accedemos a la estructura que contiene los candidatos
                setCandidatos(candidatosResponse.data || { candidatos: [], numPartido: "" });
                console.log('Candidatos:', candidatosResponse.data);
    
                // Filtrar las juntas
                const juntasFiltradas = juntasResponse.data.filter(junta => junta.genero === selectedGender);
                setJunta(juntasResponse.data);
                setFilteredJuntas(juntasFiltradas);
    
                // Ahora que los datos están listos, cargamos los votos
                fetchVotos(candidatosResponse.data, juntasFiltradas);  // Pasamos los datos correctamente
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        if (candidatoId && recinto.recintoId) {
            fetchData();
        }
    }, [candidatoId, recinto.recintoId, selectedGender]);
    
    const fetchVotos = async (candidatosData, juntasFiltradas) => {
        if (!candidatosData || candidatosData.length === 0) return;
    
        const candidatosIds = candidatosData
            .flatMap(partido => partido.candidatos)
            .map(c => c.idCandidato) 
            .filter(id => id) 
            .join("&candidatos=");
    
        if (!candidatosIds) {
            console.error("No hay candidatos válidos");
            return;
        }
    
        const juntasIds = juntasFiltradas
            .map(j => j.idJunta)
            .filter(id => id) 
            .join("&juntas=");
    
    
        if (!juntasIds) {
            console.error("No hay juntas válidas");
            return;
        }
    
        const url = `/votosCandidatoJunta?candidatos=${candidatosIds}&juntas=${juntasIds}&idSimulacion=a6db8cc2-d8d7-4582-91f6-005e4d9d0b3d`;
    
        try {
            const response = await candidatoApi.get(url);
            setVotos(response.data);
            console.log('Votos de los candidatos:', response.data);
        } catch (error) {
            console.error('Error obteniendo votos:', error);
            setVotos([]);
        }
    };
    
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

    const handleJuntaClick = (juntaId) => {
        setSelectedJuntaId(juntaId);
        setShowCards(true);
    };

    const handleVolverClick = () => {
        navigate("/");
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
        setSelectedJuntaId(null);
        setShowCards(false);
    };

    const obtenerVotosCandidato = (juntaId, candidatoId) => {
        const junta = votos.find(j => j.idJunta === juntaId);
        if (!junta) return 0;
        
        const candidato = junta.candidatos.find(c => c.idCandidato === candidatoId);
        return candidato ? candidato.numVotos : 0;
    };

    return (
        <div className="w-full h-full p-5 bg-white relative overflow-auto">
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

            <div className={`border border-black rounded-md overflow-hidden mt-3 
                ${showCards ? 'h-full' : ''}`}>
                <div className="flex">
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-r border-black w-[10%]">
                        <p className="text-black text-center font-bold text-xs"># Junta</p>
                    </div>
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-black w-[90%]">
                        <p className="text-black text-center font-bold text-xs">Candidatos</p>
                    </div>
                </div>

                <div className={`flex flex-1 ${showCards ? 'h-full' : ''}`}>
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

                    <div className="w-[90%] p-3 overflow-auto">
                        {isLoading && (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-center">Cargando candidatos...</p>
                            </div>
                        )}

                        {!isLoading && !showCards && (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-center text-lg text-red-500">
                                    Por favor, seleccione una junta para ver los candidatos
                                </p>
                            </div>
                        )}

                        {!isLoading && showCards && candidatosData && candidatosData.length > 0 ? (
                            <div className="mx-auto w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-1 mb-3"
                                style={{ maxHeight: '350px' }}>
                                {candidatosData.map(partido => (
                                    <div key={partido.idPartido} className="bg-[#e2e2e2] rounded-[15px] p-5 text-black hover:bg-[#578aff] origin-center hover:origin-top">
                                        {partido.candidatos.map(candidato => (
                                            <div key={candidato.idCandidato}>
                                                {!candidato.fotoCandidato || candidato.fotoCandidato === "" ? (
                                                    <FaUserTie className="w-[50%] h-[20%] mx-auto" />
                                                ) : (
                                                    <img
                                                        src={candidato.fotoCandidato}
                                                        alt={candidato.nombreCandidato}
                                                        className="w-[50%] object-cover mx-auto"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = '<div class="w-[50%] h-[20%] mx-auto"><FaUserTie /></div>';
                                                        }}
                                                    />
                                                )}
                                                <p className="text-center text-sm font-bold mt-2">{candidato.nombreCandidato}</p>
                                                <p className="text-center text-xs">{candidato.posicion}</p>

                                            </div>
                                        ))}
                                        <p className="text-center text-lg font-bold">Votos: {obtenerVotosCandidato(selectedJuntaId,partido.candidatos[0].idCandidato)}</p>
                                        <p className="text-center text-lg font-bold">LISTA: {partido.numPartido}</p>
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

export default PresidentePage;
