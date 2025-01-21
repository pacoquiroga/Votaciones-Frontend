import React from 'react';
import Header from "../components/shared/Header";
import Menu from "../components/shared/Menu";
import Footer from "../components/shared/Footer";
import { useState } from "react";

const Layout = ({ children }) => {
    const [menu, setMenu] = useState(false);

    return(
        <div className="grid md:grid-cols-layout grid-cols-1 grid-rows-layout min-h-screen">
            <Header menu={menu}  setMenu={setMenu}/>
            <Menu menu={menu}/>
            <div className={`bg-gray-300 md:flex justify-center items-center
                ${menu? 'hidden': 'flex'}`}>
                <div className="h-5/6 w-5/6 md:w-11/12 rounded-xl overflow-hidden">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;