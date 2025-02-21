import { create } from 'zustand';

export const usuarioStore = create((set) => ({
    usuario:
    {
        idUser: 0,
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
        set((state) => ({usuario: {idUser: 0, nombre: '', apellido: '', email: '', password: '', rol: ''}}))
    }
}))