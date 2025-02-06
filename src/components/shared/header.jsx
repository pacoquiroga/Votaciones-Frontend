import { TiThMenu } from "react-icons/ti";
import { simulacionStore } from "../../store/simulacionStore";

export default function Header({ menu, setMenu }) {
    const simulacion = simulacionStore((state) => state.simulacion);

    const handleClick = () => {
        setMenu(!menu);
    }

    return (
        <header className="bg-white flex h-full w-full md:col-span-2 items-center justify-between px-5">
            {/* Mostrar el Menu solo si ya existe una simulacion */}
            {simulacion.idSimulacion !== 0 &&
            <button className="md:hidden ml-5"
            onClick={handleClick}>
                <TiThMenu className="text-black text-lg" onClick={() => setMenu(!menu)}/>
            </button>
            }

            <img className="md:ml-20 mx-auto max-h-full md:mt-2" src="/images/logo-elecciones2025.png" alt="Logo elecciones" />
            
            {/* Mostrar el nombre de la simulación */}
            {simulacion.nombreSimulacion && (
                <p>Simulación: <span className="text-black text-lg font-bold md:mr-20">{simulacion.nombreSimulacion}</span></p>
            )}
        </header>
    );
}
