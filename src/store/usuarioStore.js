import { create } from 'zustand';

export const usuarioStore = create((set) => ({
    usuario:
    {
        idUsuario: 0,
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: ''
    },
    setUsuario: (usuarioSeleccionado) => {
        set((state) => ({usuario : usuarioSeleccionado}))
    },
    resetUsuario: () => {
        set((state) => ({usuario: {idUsuario: 0, nombre: '', apellido: '', email: '', password: '', rol: ''}}))
    }
}))