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
            <img className="md:ml-20 mx-auto max-h-full md:mt-2" src="/images/logo-elecciones2025.png" alt="Logo elecciones" />
        </header>
    );
}