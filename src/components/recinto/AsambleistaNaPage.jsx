import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import './PresidentePage.css';
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";

const array = ["Tungurahua", "Ambato", "La matriz", "Unidad Educativa Liceo Cevallos"];

// lista de juntas y candidatos
const juntas = [
    { "id": "1", "nombre": "Movimiento Centro Democratico", "votos": 18, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/logos/132/1.png" },
    { "id": "2", "nombre": "Partido Unidad Popular", "votos": 88, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/logos/132/2.png" },
    { "id": "3", "nombre": "Movimiento Centro Democratico", "votos": 8, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/logos/132/3.png" },
    { "id": "4", "nombre": "Movimiento Centro Democratico", "votos": 18, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/logos/132/4.png" },
    { "id": "5", "nombre": "Partido Unidad Popular", "votos": 88, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/logos/132/5-33.png" },
    { "id": "6", "nombre": "Movimiento Centro Democratico", "votos": 8, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/logos/132/6.png" },

];

const candidatosJuntas = [
    { "id": "1", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "2", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "3", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "4", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "5", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "6", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "7", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2": "ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },

];

const RecintoSeleccionado = () => {
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nuevoVoto, setNuevoVoto] = useState("");
    const [selectedJunta, setSelectedJunta] = useState(null);
    const [showVoteInput, setShowVoteInput] = useState(false);
    const [votoInput, setVotoInput] = useState("");
    const [candidatoVotos, setCandidatoVotos] = useState({});
    const navigate = useNavigate();
    const recinto = useStore((state) => state.recinto);


    const handleEditar = (id) => {
        const junta = juntas.find(j => j.id === id);
        setSelectedJunta(junta);
        setNuevoVoto(junta.votos.toString());
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleVolverClick = () => {
        navigate("/");
    };

    const handleCandidatoVotoChange = (candidatoId, value) => {
        setCandidatoVotos(prev => ({
            ...prev,
            [candidatoId]: value
        }));
    };

    const handleConfirmarVoto = () => {
        if (!nuevoVoto || nuevoVoto.trim() === "") {
            alert("Por favor, ingrese la cantidad de votos del partido.");
            return;
        }

        console.log("Votos del partido:", nuevoVoto);
        console.log("Votos individuales:", candidatoVotos);
        alert("Votos registrados exitosamente");
        setIsModalOpen(false);
        setCandidatoVotos({});
    };

    return (
        <div className="w-full h-full p-5 bg-white rounded-[15px] relative">
            {/* Botón volver */}
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

            {/* Filtro de numero junta y seleccion de genero */}
            <div className="w-[25%] max-lg:flex-col items-center mt-8">
                {/* Primer filtro */}
                <div className="flex items-center border border-black rounded-md overflow-hidden">
                    <div className="p-2 bg-[#4880FF] border-r border-black flex-grow">
                        <input
                            type="text"
                            placeholder="Buscar partido..."
                            className="text-left bg-[#4880FF] w-full"
                            style={{ appearance: 'none', color: 'white' }}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="border border-black rounded-md mt-3 overflow-hidden" style={{ height: '400px' }}>
                <div className="flex">
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-black w-full">
                        <p className="text-black text-center font-bold text-xs">Partidos Políticos</p>
                    </div>
                </div>
                <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 p-1 mb-3 overflow-y-auto" style={{ maxHeight: '350px' }}>
                    {juntas
                        .filter(j => j.nombre.toLowerCase().includes(inputValue.toLowerCase()))
                        .map((j) => (
                        <div
                            key={j.id}
                            className="bg-[#e2e2e2] rounded-[15px] p-5 text-black hover:bg-[#578aff] origin-center hover:origin-top cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            onClick={() => handleEditar(j.id)}
                        >
                            <img src={j.imagen} alt="imagen" className="w-25 h-40 object-cover mx-auto" />
                            <p className="text-center text-lg font-bold ">{j.nombre}</p>
                            <p className="text-center text-lg font-bold ">{j.votos} votos</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-[70%] p-5 rounded-md shadow-lg overflow-auto" style={{ maxHeight: '80vh' }}>
                        <h2 className="text-xl font-bold mb-3">Editar Votos de {selectedJunta?.nombre}</h2>
                        
                        {/* Campo principal de votos del partido */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Votos del partido
                            </label>
                            <input
                                type="number"
                                value={nuevoVoto}
                                onChange={(e) => setNuevoVoto(e.target.value)}
                                placeholder="Ingrese votos del partido"
                                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4880FF]"
                            />
                        </div>

                        <div className="w-full grid grid-cols-4 md:grid-cols-3 gap-4 mt-3 p-1 mb-2 overflow-auto" style={{ maxHeight: '50vh' }}>
                            {candidatosJuntas.map((candidato) => (
                                <div
                                    key={candidato.id}
                                    className="bg-[#e2e2e2] rounded-[15px] p-5 text-black"
                                >
                                    <img src={candidato.imagen} alt="imagen" className="w-25 h-20 object-cover mx-auto" />
                                    <p className="text-center text-sm font-bold">{candidato.nombre}</p>
                                    <p className="text-center text-xs">{candidato.cargo}</p>
                                    <p className="text-center text-sm font-bold">{candidato.nombre2}</p>
                                    <p className="text-center text-xs">{candidato.cargo2}</p>
                                    <p className="text-center text-sm">Orden de Papeleta: {candidato.orden}</p>
                                    <div className="mt-3">
                                        <input
                                            type="number"
                                            value={candidatoVotos[candidato.id] || ''}
                                            onChange={(e) => handleCandidatoVotoChange(candidato.id, e.target.value)}
                                            placeholder="Votos (opcional)"
                                            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4880FF]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setCandidatoVotos({});
                                }}
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

export default RecintoSeleccionado;
