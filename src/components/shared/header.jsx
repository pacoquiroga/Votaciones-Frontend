import { TiThMenu } from "react-icons/ti";
import { simulacionStore } from "../../store/simulacionStore";

export default function Header({ menu, setMenu }) {
    const simulacion = simulacionStore((state) => state.simulacion);

    const handleClick = () => {
        setMenu(!menu);
    }

    return (
        <header className="bg-white flex h-full w-full md:col-span-2 items-center">

            {/* Mostrar el Menu solo si ya existe una simulacion */}
            {simulacion.idSimulacion !== 0 &&
            <button className="md:hidden ml-5 absolute"
            onClick={handleClick}>
                <TiThMenu className="text-black text-lg" onClick={() => setMenu(!menu)}/>
            </button>
            }

            <img className="md:ml-20 mx-auto max-h-full md:mt-2" src="/images/logo-elecciones2025.png" alt="Logo elecciones" />
        </header>
    );
}