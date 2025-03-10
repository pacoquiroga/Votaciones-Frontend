import Header from "../shared/Header";
import Menu from "../shared/Menu";
import Footer from "../shared/Footer";
import { simulacionStore } from "../../store/simulacionStore";
import { useState } from "react";
import { usuarioStore } from "../../store/usuarioStore";
import { BrowserRouter as Router } from "react-router-dom";

export default function Layout({ children: contenido }) {
    const [menu, setMenu] = useState(false);
    const simulacion = simulacionStore((state) => state.simulacion);
    const usuario = usuarioStore((state) => state.usuario);

    return(
        <div className="grid md:grid-cols-layout grid-cols-1 grid-rows-layout h-screen">
            <Header menu={menu}  setMenu={setMenu}/>
            
            <Router>

            {/* Mostrar el Menu solo si ya existe una simulacion */}
            {(simulacion.idSimulacion !== 0 && usuario.idUser !== 0) &&
            <Menu menu={menu}/>
            }

            <div className={`bg-gray-300 md:flex justify-center items-center
                ${menu? 'hidden': 'flex'}
                ${(simulacion.idSimulacion === 0 || usuario.idUser === 0) ? 'md:col-span-2': ''}`}>
                <div className="h-[90%] w-11/12 md:w-[95%] rounded-xl overflow-hidden">
                    {contenido}
                </div>
            </div>

            </Router>
            <Footer />
        </div>
    );
};