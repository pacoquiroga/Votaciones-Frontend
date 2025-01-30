import { simulacionStore } from "../store/simulacionStore";
import { useState } from "react";
import { simulacionesApi } from "../api/simulacionesApi";

export default function Simulacion() {

    const [nombre, setNombre] = useState(null);

    const handleClick = async () => {
        // Lógica para guardar la simulación
        const simulacion = {
            nombreSimulacion: nombre,
        };

        try {
            const response = await simulacionesApi.post(
                ``, simulacion
            );
            simulacionStore.getState().setSimulacion(response.data);
            setNombre(null);
        } catch (error) {
            console.log("Error al subir la simulacion");
        }
    }

    return (
        <div className="bg-white flex flex-col items-center justify-center gap-8 h-full w-full">
            <h2 className="text-black text-4xl md:text-8xl font-bold">
                <span className="text-blue-500">Nueva</span> Simulación
            </h2>

            <div className="md:w-[45%] w-[90%]">
                <label className="block mb-4 text-2xl font-medium">Nombre</label>
                <input type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    className="bg-gray-50 border border-gray-300
                text-gray-900 text-xl rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block w-full p-2.5 " required />
            </div>

            <button
                onClick={handleClick}
                disabled={!nombre}
                type='button'
                className={`text-white font-bold rounded-lg px-5 py-2.5 mx-auto md:text-xl
                ${!nombre ? 'bg-gray-400'
                        : 'bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none'}`}>
                Iniciar Simulación
            </button>
        </div>
    );
}