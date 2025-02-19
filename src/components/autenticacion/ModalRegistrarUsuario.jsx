import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ModalRegistrarUsuario({ openModal, setOpenModal }) {
    const dialogRef = useRef(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: ""
    });

    useEffect(() => {
        if (openModal) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [openModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.password || !formData.rol) {
            Swal.fire("Error", "Todos los campos son obligatorios", "error");
            return;
        }
        Swal.fire("Éxito", "Usuario registrado correctamente", "success");
        setOpenModal(false);
    };

    return (
        <dialog ref={dialogRef} className="rounded-lg shadow-lg w-11/12 md:w-1/3 p-5">
            <div className="flex justify-end">
                <button type="button" className="text-gray-400 hover:text-gray-600" onClick={() => setOpenModal(false)}>
                    <FaTimes size={20} />
                </button>
            </div>
            <h2 className="text-2xl font-bold text-center mb-5">
                Registrar <span className="text-yellow-500">Usuario</span>
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                />
                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                >
                    <option value="">Seleccione un rol</option>
                    <option value="administrador">Administrador</option>
                    <option value="registrador">Registrador</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold rounded-lg px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                    Registrar Usuario
                </button>
            </form>
        </dialog>
    );
}
