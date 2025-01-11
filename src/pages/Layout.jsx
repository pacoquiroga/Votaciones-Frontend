import Header from "../components/shared/header";
import Menu from "../components/shared/Menu";
import Footer from "../components/shared/Footer";
import { useState } from "react";

export default function Layout({ Contenido }){
    const [menu, setMenu] = useState(false);

    return(
        <div className="grid md:grid-cols-layout grid-cols-1 grid-rows-layout min-h-screen">
            <Header menu={menu}  setMenu={setMenu}/>
            <Menu menu={menu}/>
            <div className={`bg-gray-300 md:flex justify-center items-center
                ${menu? 'hidden': 'flex'}`}>
                <div className="h-5/6 w-5/6 md:w-11/12 rounded-xl overflow-hidden">
                    <Contenido />
                </div>
            </div>
            <Footer />
        </div>
    );
}