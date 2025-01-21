import { create } from 'zustand';

export const useStore = create((set) => ({
    recinto:
    {
        provincia: '',
        canton: '',
        parroquia: '',
        recintoId: 0,
        recintoNombre: '',
    },
    setRecinto: (recintoSeleccionado) => {
        set((state) => ({recinto: recintoSeleccionado}))
    },
    resetRecinto: () => {
        set((state) => ({recinto: {provincia: '', canton: '', parroquia: '', recintoId: 0, recintoNombre: ''}}))
    }
}))