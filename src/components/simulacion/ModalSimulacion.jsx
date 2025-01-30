import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2'

import { simulacionStore } from "../../store/simulacionStore";
import { simulacionesApi } from "../../api/simulacionesApi";

export default function ModalSimulacion({ openModal, setOpenModal }) {
    const dialogRef = useRef(null);
    const simulacion = simulacionStore((state) => state.simulacion);

    const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
    const fechaFormateada = new Date(simulacion.fechaCreacion).toLocaleDateString("es-ES", opcionesFecha);

    useEffect(() => {
        if (openModal) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [openModal]);

    const handleClick = () => {
        setOpenModal(false);
    }

    const handleTerminarSimulacion = async () => {
        try {
            const response = await simulacionesApi.patch(
                `/terminarSimulacion/${simulacion.idSimulacion}`
            );
            setOpenModal(false);
            Swal.fire({
                title: "Simulación Terminada Exitosamente",
                icon: "success",
                draggable: true
            }).then((result) => {
                if (result.isConfirmed) {
                    simulacionStore.getState().resetSimulacion();
                    window.location.href = "/";
                }
            });
        } catch (error) {
            console.log("Error al terminar la simulacion");
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-lg shadow-lg w-11/12 md:w-1/5 p-5"
        >
            <div className="flex justify-end">
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={handleClick}
                >
                    <FaTimes size={20} />
                </button>
            </div>
            <div className="flex flex-col w-full gap-5">
                <h2 className="text-2xl font-bold mx-auto mb-5">
                    Datos de <span className="text-yellow-500">Simulación</span>
                </h2>
                <p className="text-xl">
                    <span className="font-bold text-blue-500">Nombre:</span> {simulacion.nombreSimulacion}
                </p>
                <p className="text-xl mb-5">
                    <span className="font-bold text-red-500">Creación:</span> {fechaFormateada}
                </p>

                <button className="bg-red-500 text-white font-bold rounded-lg px-5 py-2.5 mx-auto
                hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                    onClick={handleTerminarSimulacion}>
                    Terminar Simulación
                </button>
            </div>
        </dialog>
    );
}