import { TiThMenu } from "react-icons/ti";

export default function Header({ menu, setMenu }) {
    const handleClick = () => {
        setMenu(!menu);
    }
    return (
        <header className="bg-white flex h-full w-full md:col-span-2 items-center">
            <button className="md:hidden ml-5 absolute"
            onClick={handleClick}>
                <TiThMenu className="text-black text-lg" onClick={() => setMenu(!menu)}/>
            </button>
            <h2 className="text-black text-xl font-bold md:ml-20 mx-auto">
                <span className="text-blue-500">ELECCIONES</span> 2025
            </h2>
        </header>
    );
}