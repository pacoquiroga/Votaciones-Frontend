import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { dignidadesApi } from '../../api/dignidadesApi';
import { useStore } from "../../store/store"; // Importa el estado global

const DignidadPage = () => {
    const navigate = useNavigate();
    const [dignidad, setDignidad] = useState([]);
    const recinto = useStore((state) => state.recinto); 

    const provinciasExcluidas = ['PICHINCHA', 'GUAYAS', 'MANABI'];

    const cargarDignidad = async () => {
        try {
            const response = await dignidadesApi.get("/");

            const filteredDignidades = response.data.filter(d => {
                const nombreDignidad = d.nombreDignidad.toLowerCase();
                const provinciaActual = recinto.provincia?.toUpperCase();
                const esProvinciaExcluida = provinciasExcluidas.includes(provinciaActual);

                if (nombreDignidad.includes('asambleistas nacionales')) {
                    return !esProvinciaExcluida; // Solo mostrar para provincias no excluidas
                }
                
                if (nombreDignidad.includes('asambleistas provinciales por circunscripcion')) {
                    return esProvinciaExcluida; // Solo mostrar para provincias excluidas
                }
                
                if (nombreDignidad.includes('asambleistas provinciales')) {
                    return !esProvinciaExcluida; // Solo mostrar para provincias no excluidas
                }

                return true; // Mostrar el resto de dignidades sin filtrar
            });
            
            console.log(response.data);
            setDignidad(filteredDignidades);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarDignidad();
    }, [recinto.provincia]);


    const handleDignidadClick = (id, dignidadId) => {
        switch(id) {
            case 1:
                navigate("/recinto-seleccionado", { state: { dignidadId } });
                break;
            case 2: 
                navigate("/asambleista-nacional",  { state: { dignidadId } });
                break;
            case 3:
                navigate("/asambleista-provincial",  { state: { dignidadId } });
                break;
            case 4:
                navigate("/parlamento-andino",  { state: { dignidadId } });
                break;
            case 5:
                navigate("/asambleista-exterior",  { state: { dignidadId } });
                break;
            case 6:
                navigate("/asambleista-circunscripcion",  { state: { dignidadId } });
                break;
            default:
                console.log("Dignidad no encontrada");
        }
    };

    return (
        <div className="w-full h-full p-5 bg-white rounded-[15px] relative">
            <div className="text-center">
                <p className="text-sm font-bold text-xl text-left">
                    Dignidades
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {dignidad.map((dignidad) => (
                    <div
                        key={dignidad.codigoDignidad}
                        className="bg-[#e2e2e2] rounded-[15px] p-5 text-black hover:bg-[#578aff] origin-center hover:origin-top cursor-pointer w-full flex flex-col items-center justify-between"
                        onClick={() => handleDignidadClick(dignidad.codigoDignidad, dignidad.idDignidad)}
                    >
                        <div className="flex flex-col items-center w-full h-full">
                            <img
                                src={dignidad.fotoDignidad}
                                alt={dignidad.nombreDignidad}
                                className="object-cover mb-4"
                            />
                            <p className="text-center text-lg font-bold">{dignidad.nombreDignidad}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DignidadPage;
