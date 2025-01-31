import { create } from 'zustand';

export const useStore = create((set) => ({
    recinto:
    {
        provincia: '',
        idProvincia: 0,
        canton: '',
        parroquia: '',
        recintoId: 0,
        recintoNombre: '',
    },
    setRecinto: (recintoSeleccionado) => {
        set((state) => ({recinto: recintoSeleccionado}))
    },
    resetRecinto: () => {
        set((state) => ({recinto: {provincia: '', idProvincia: 0, canton: '', parroquia: '', recintoId: 0, recintoNombre: ''}}))
    }
}))