import { create } from 'zustand';

export const simulacionStore = create((set) => ({
    simulacion:
    {
        idSimulacion: 0,
        fechaCreacion: '',
        nombreSimulacion: '',
        estado: false,
    },
    setSimulacion: (simulacionSeleccionada) => {
        set((state) => ({simulacion: simulacionSeleccionada}))
    },
    resetSimulacion: () => {
        set((state) => ({simulacion: {idSimulacion: 0, fechaCreacion: '', nombreSimulacion: '', estado: false}}))
    }
}))