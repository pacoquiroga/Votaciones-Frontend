import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import './PresidentePage.css';
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { partidosApi } from "../../api/partidosApi";
import { juntaApi } from "../../api/juntaApi";
import { candidatoApi } from "../../api/candidatoApi";
import { FaUserTie } from "react-icons/fa";



const RecintoSeleccionado = () => {
    const location = useLocation();
    const dignidadId = location.state?.dignidadId;
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const recinto = useStore((state) => state.recinto);
    const [partidosData, setPartidos] = useState([]);
    const [selectedGender, setSelectedGender] = useState('M');
    const [filteredJuntas, setFilteredJuntas] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedJuntaId, setSelectedJuntaId] = useState(null);
    const [junta, setJunta] = useState([]);
    const [candidatoData, setCandidato] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPartido, setSelectedPartido] = useState(null);
    const [candidatoPartido, setCandidatoPartido] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [partidosResponse, juntasResponse, candidatosResponse] = await Promise.all([
                    partidosApi.get("/"),
                    juntaApi.get(`/menu?idRecinto=${recinto.recintoId}`),
                    candidatoApi.get(`/menu?idDignidad=${dignidadId}`),
                ]);
                
                setCandidato(candidatosResponse.data);
                setPartidos(partidosResponse.data);
                const todasLasJuntas = juntasResponse.data;
                setJunta(todasLasJuntas);
                // Filtrar juntas por género
                const juntasFiltradas = todasLasJuntas.filter(j => j.genero === selectedGender);
                setFilteredJuntas(juntasFiltradas);

            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (recinto.recintoId) {
            fetchData();
        }
    }, [recinto.recintoId, selectedGender]); // Agregar selectedGender como dependencia

    const handleJuntaClick = (juntaId) => {
        setSelectedJuntaId(juntaId);
        setShowCards(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filtrarJuntas = () => {
        if (!inputValue) {
            return filteredJuntas;
        }
        return filteredJuntas.filter(junta =>
            junta.numJunta.toString() === inputValue
        );
    };

    const handleVolverClick = () => {
        navigate("/");
    };

    const handleGenderChange = (e) => {
        const newGender = e.target.value;
        setSelectedGender(newGender);
        // Filtrar juntas existentes por el nuevo género
        const juntasFiltradas = junta.filter(j => j.genero === newGender);
        setFilteredJuntas(juntasFiltradas);
        setSelectedJuntaId(null);
        setShowCards(false);
    };

    const handlePartidoClick = async (partido) => {
        setSelectedPartido(partido);
        setIsModalOpen(true);
        const candidatosPartido = await candidatoData.find((data) => data.idPartido === partido.idPartido) ?? {candidatos: []};
        setCandidatoPartido(candidatosPartido.candidatos);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPartido(null);
    };

    return (
        <div className="w-full h-full p-5 bg-white relative overflow-auto">
            {/* Header section */}
            <div className="text-left">
                <button className="bg-[#4880FF] text-white font-bold text-base p-1 rounded-md" onClick={handleVolverClick}>
                    <IoMdArrowRoundBack className="inline-block" /> Volver
                </button>
            </div>

            {/* Breadcrumb navigation */}
            <div className="text-center">
                <p className="text-sm font-bold text-xl text-gray-500 text-left">
                    {recinto.provincia} {'>'} {recinto.canton} {'>'} {recinto.parroquia} {'>'}
                    <span className="text-transform: uppercase" style={{ color: '#4880FF' }}>
                        {recinto.recintoNombre}
                    </span>
                </p>
            </div>

            {/* Filters */}
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

            {/* Main content container */}
            <div className="text-center mt-3">
                <p className="text-sm font-bold text-lg text-black text-left pl-5">
                    Ingrese la cantidad de votos para la dignidad seleccionada
                </p>
            </div>

            <div className="border border-black rounded-md mt-3">
                {/* Headers */}
                <div className="flex">
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-r border-black w-[10%]">
                        <p className="text-black text-center font-bold text-xs"># Junta</p>
                    </div>
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-black w-[90%]">
                        <p className="text-black text-center font-bold text-xs">Partidos</p>
                    </div>
                </div>

                {/* Content container */}
                <div className={`flex flex-1 ${showCards ? 'h-full' : ''}`}>
                    {/* Juntas column */}
                    <div className="w-[10%] border-r border-black">
                        {filteredJuntas && filteredJuntas.length > 0 ? (
                            filtrarJuntas().map((junta) => (
                                <div
                                    key={junta.idJunta}
                                    className={`p-3 text-black items-center justify-center border-b border-black cursor-pointer hover:bg-sky-700 ${
                                        selectedJuntaId === junta.idJunta ? 'bg-sky-700 text-white' : ''
                                    }`}
                                    onClick={() => handleJuntaClick(junta.idJunta)}
                                >
                                    <p className="text-center font-bold text-xs">{junta.numJunta}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-center text-gray-500">
                                No hay juntas disponibles
                            </div>
                        )}
                    </div>

                    {/* Partidos content */}
                    <div className="w-[90%] p-3 overflow-auto">
                        {isLoading && (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-center">Cargando partidos...</p>
                            </div>
                        )}

                        {!isLoading && !showCards && (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-center text-lg text-red-500">
                                    Por favor, seleccione una junta para ver los partidos
                                </p>
                            </div>
                        )}

                        {!isLoading && showCards && partidosData && partidosData.length > 0 ? (
                            <div className="mx-auto w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-1 mb-3"
                                style={{ maxHeight: '350px' }}>
                                {partidosData.map(partido => (
                                    <div 
                                        key={partido.idPartido}
                                        className="bg-[#e2e2e2] rounded-[15px] p-5 text-black hover:bg-[#578aff] origin-center hover:origin-top cursor-pointer"
                                        onClick={() => handlePartidoClick(partido)}
                                    >
                                        <img 
                                            src={partido.fotoPartido} 
                                            alt={partido.nombrePartido}
                                            className="w-25 h-40 object-contain mx-auto"
                                        />
                                        <p className="text-center text-lg font-bold mt-2">{partido.nombrePartido}</p>
                                        <p className="text-center text-lg font-bold">LISTA: {partido.numPartido}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            showCards && !isLoading && (
                                <p className="text-center text-lg text-red-500">
                                    No se encontraron partidos para mostrar
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Modal para mostrar candidatos */}
            {isModalOpen && selectedPartido && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[80%] max-h-[80vh] p-5 rounded-lg overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {selectedPartido.nombrePartido} - Lista {selectedPartido.numPartido}
                            </h2>
                            <button 
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {candidatoPartido.length > 0 ? (
                                candidatoPartido.map(candidato => (
                                    <div 
                                        key={candidato.idCandidato}
                                        className="bg-gray-100 p-4 rounded-lg"
                                    >
                                        {candidato.fotoCandidato ? (
                                            <img 
                                                src={candidato.fotoCandidato}
                                                alt={candidato.nombreCandidato}
                                                className="w-32 h-32 object-cover mx-auto rounded-full"
                                            />
                                        ) : (
                                            <FaUserTie className="w-32 h-32 mx-auto text-gray-400" />
                                        )}
                                        <p className="text-center font-bold mt-2">{candidato.nombreCandidato}</p>
                                        <p className="text-center text-sm text-gray-600">{candidato.posicion}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">
                                    No hay candidatos disponibles para este partido
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecintoSeleccionado;
