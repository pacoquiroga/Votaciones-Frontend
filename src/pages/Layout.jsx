import Header from "../components/shared/Header";
import Menu from "../components/shared/Menu";
import Footer from "../components/shared/Footer";
import { useState } from "react";

export default function Layout({ children: contenido }) {
    const [menu, setMenu] = useState(false);

    return(
        <div className="grid md:grid-cols-layout grid-cols-1 grid-rows-layout h-screen">
            <Header menu={menu}  setMenu={setMenu}/>
            <Menu menu={menu}/>
            <div className={`bg-gray-300 md:flex justify-center items-center
                ${menu? 'hidden': 'flex'}`}>
                <div className="h-[90%] w-11/12 md:w-[95%] rounded-xl overflow-hidden">
                    {contenido}
                </div>
            </div>
            <Footer />
        </div>
    );
};