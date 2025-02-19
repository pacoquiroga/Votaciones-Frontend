import { useState } from "react";
import { usuarioStore } from "../store/usuarioStore";
import { TbEye } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";

export default function IniciarSesion() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [observarcontraseña, setObservarcontraseña] = useState(false);

    const handleClick = async () => {
        // Lógica para guardar la simulación
        try {
            const usuario = {
                nombre: "Pepe",
                apellido: "Perez",
                email: email,
                password: password,
                rol: "Administrador"
            };
            usuarioStore.getState().setUsuario(usuario);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log("Error al obtener usuario");
        }
    }

    return (
        <div className="bg-white flex flex-col items-center justify-center gap-8 h-full w-full">
            <h2 className="text-black text-4xl md:text-8xl font-bold">
                <span className="text-blue-500">Iniciar</span> Sesión
            </h2>

            <div className="md:w-[45%] w-[90%]">
                <label className="block mb-4 text-2xl font-medium">Email</label>
                <input type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300
                text-gray-900 text-xl rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block w-full p-2.5 " required />
            </div>

            <div className="md:w-[45%] w-[90%] relative">
                <label className="block mb-4 text-2xl font-medium">Contraseña</label>
                <div>
                    <input
                        type={observarcontraseña ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300
                text-gray-900 text-xl rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block w-full p-2.5"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setObservarcontraseña(!observarcontraseña)}
                        className="absolute my-auto right-3 flex items-center text-gray-600 text-3xl"
                    >
                        {observarcontraseña ? <TbEyeClosed /> : <TbEye />}
                    </button>
                </div>
            </div>

            <button
                onClick={handleClick}
                disabled={!email || !password}
                type='button'
                className={`text-white font-bold rounded-lg px-5 py-2.5 mx-auto md:text-xl
                ${(!email || !password) ? 'bg-gray-400'
                        : 'bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none'}`}>
                Iniciar Sesión
            </button>
        </div>
    );
}