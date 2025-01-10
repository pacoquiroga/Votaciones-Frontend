import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import './PresidentePage.css';
import { useNavigate } from "react-router-dom";

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
    { "id": "1", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "2", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "3", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "4", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "5", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "6", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },
    { "id": "7", "nombre": "RICARDO VANEGAS", "cargo": "PRINCIPAL", "nombre2":"ALEXANDRA OVIEDO SALAZAR", "cargo2": "SUPLENTE", "orden": 1, "imagen": "https://backend-apps.cne.gob.ec/repository/api/File/Get?file=votoinformado/candidatos/132/9/0909443111.jpg" },

];

const RecintoSeleccionado = () => {
    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nuevoVoto, setNuevoVoto] = useState("");
    const [selectedJunta, setSelectedJunta] = useState(null);
    const navigate = useNavigate();
    

    const handleEditar = (id) => {
        const junta = juntas.find(j => j.id === id);
        setSelectedJunta(junta);
        setNuevoVoto(junta.votos.toString());
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    const handleVolverClick = () => {
        navigate("/");
    };

    const handleConfirmarVoto = () => {
        if (nuevoVoto.trim() === "") {
            alert("Por favor, ingresa la cantidad de votos.");
            return;
        }

        setSelectedJunta(prev => ({ ...prev, votos: nuevoVoto }));
        setIsModalOpen(false);
        alert(`Se han asignado ${nuevoVoto} votos a ${selectedJunta.nombre}.`);
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
                    {array[0]} {'>'} {array[1]} {'>'} {array[2]} {'>'} <span className="text-transform: uppercase" style={{ color: '#4880FF' }}>{array[3]}</span>
                </p>
            </div>

            {/* Filtro de numero junta y seleccion de genero */}
            <div className="flex justify-between max-lg:flex-col items-center mt-8">
                {/* Primer filtro */}
                <div className="flex items-center gap-0 border border-black rounded-md overflow-hidden">
                    <div className="p-2 bg-[#4880FF] border-r border-black">
                        <input
                            type="text"
                            placeholder="Ingrese Partido"
                            className="text-left bg-[#4880FF]"
                            style={{ appearance: 'none', color: 'white', width: '100px' }}
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            <div className="border border-black rounded-md mt-3" style={{ height: '400px' }}>
                <div className="flex">
                    <div className="p-3 text-black items-center bg-[#D5D5D5] justify-center border-b border-black w-full">
                        <p className="text-black text-center font-bold text-xs">Partidos Políticos</p>
                    </div>
                </div>
                <div className="mx-auto w-[80%] grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 p-1 mb-3 overflow-auto" style={{ maxHeight: '350px' }}>
                    {juntas.map((j) => (
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
                        <h2 className="text-xl font-bold mb-3">Editar Votos</h2>
                        <input
                            type="number"
                            placeholder="Ingrese nuevos votos"
                            value={nuevoVoto}
                            onChange={(e) => setNuevoVoto(e.target.value)}
                            className="p-2 mb-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4880FF]"
                        />
                        <div className="w-full grid grid-cols-4 md:grid-cols-7 gap-4 mt-3 p-1 mb-2 overflow-auto" style={{ maxHeight: '50vh' }}>
                            {candidatosJuntas.map((candidato) => (
                                <div
                                    key={candidato.id}
                                    className="bg-[#e2e2e2] rounded-[15px] p-5 text-black "
                                >
                                    <img src={candidato.imagen} alt="imagen" className="w-25 h-20 object-cover mx-auto" />
                                    <p className="text-center text-sm font-bold ">{candidato.nombre}</p>
                                    <p className="text-center text-xs ">{candidato.cargo}</p>
                                    <p className="text-center text-sm font-bold ">{candidato.nombre2}</p>
                                    <p className="text-center text-xs ">{candidato.cargo2}</p>
                                    <p className="text-center text-sm ">Orden de Papeleta: {candidato.orden}</p>
                                </div>
                            ))}
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
        </div>
    );
};

export default RecintoSeleccionado;
