import { simulacionStore } from "../store/simulacionStore";
import { usuarioStore } from "../store/usuarioStore";
import { useState, useEffect } from "react";
import { simulacionesApi } from "../api/simulacionesApi";

export default function Simulacion() {
    const usuario = usuarioStore((state) => state.usuario);
    const [nombre, setNombre] = useState("");
    const [simulaciones, setSimulaciones] = useState([]);
    const [selectedSimulacion, setSelectedSimulacion] = useState("");
    const [activeTab, setActiveTab] = useState("crear");

    useEffect(() => {
        getSimulaciones();
    }, []);

    const getSimulaciones = async () => {
        try {
            const response = await simulacionesApi.get("");
            console.log(response.data);
            setSimulaciones(response.data);
        } catch (error) {
            console.log("Error al obtener las simulaciones");
        }
    };

    const handleCreate = async () => {
        const simulacion = { nombreSimulacion: nombre };
        try {
            const response = await simulacionesApi.post("", simulacion);
            simulacionStore.getState().setSimulacion(response.data);
            setNombre("");
        } catch (error) {
            console.log("Error al subir la simulación");
        }
    };

    const handleSelect = async () => {
        const simulacion = simulaciones.find(sim => sim.idSimulacion === selectedSimulacion);
        if (simulacion) {
            simulacionStore.getState().setSimulacion(simulacion);
            try {
                const response = await simulacionesApi.patch(
                    `/activarSimulacion/${simulacion.idSimulacion}`
                );
                console.log(response.data);
            } catch (error) {
                console.log("Error al activar la simulación");
            }
            setNombre("");
        }
    };

    if (usuario.rol === "Administrador")
        return (
            <div className="bg-white flex flex-col items-center justify-center gap-8 h-full w-full">
                <h2 className="text-black text-4xl md:text-8xl font-bold">
                    <span className="text-blue-500">Simulación</span> Votaciones
                </h2>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-lg font-bold ${activeTab === "crear" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                        onClick={() => setActiveTab("crear")}>
                        Crear Simulación
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg font-bold ${activeTab === "seleccionar" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                        onClick={() => setActiveTab("seleccionar")}>
                        Seleccionar Simulación
                    </button>
                </div>
                {activeTab === "crear" ? (
                    <div className="md:w-[45%] w-[90%]">
                        <label className="block mb-4 text-2xl font-medium">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                        <button
                            onClick={handleCreate}
                            disabled={!nombre}
                            className={`text-white font-bold rounded-lg px-5 py-2.5 mt-4 w-full md:text-xl ${!nombre ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none'}`}>
                            Iniciar Simulación
                        </button>
                    </div>
                ) : (
                    <div className="md:w-[45%] w-[90%]">
                        <label className="block mb-4 text-2xl font-medium">Seleccionar Simulación</label>
                        <select
                            value={selectedSimulacion}
                            onChange={(e) => setSelectedSimulacion(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="">Seleccione una simulación</option>
                            {simulaciones.map((sim) => (
                                <option key={sim.idSimulacion} value={sim.idSimulacion}>{sim.nombreSimulacion}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleSelect}
                            disabled={!selectedSimulacion}
                            className={`text-white font-bold rounded-lg px-5 py-2.5 mt-4 w-full md:text-xl ${!selectedSimulacion ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none'}`}>
                            Cargar Simulación
                        </button>
                    </div>
                )}
            </div>
        );

    if (usuario.rol === "Registrador")
        return (
            <div className="bg-white flex flex-col items-center justify-center h-full w-full">
                <h2 className="text-black text-4xl md:text-6xl font-bold text-center">
                    No hay simulaciones activas en este momento.
                </h2>
            </div>
        );

    return null;
}
