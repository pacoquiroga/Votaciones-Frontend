import React from "react";
import { FaFilter } from "react-icons/fa";

const array = ["Tungurahua", "Ambato", "La matriz", "Unidad Educativa Liceo Cevallos"];

const RecintoSeleccionado = () => {
    return (
        <div className="w-[50%] h-auto pb-5 bg-gray-200 rounded-[15px] shadow-[1px_5px_60px_0px_rgba(16,10,136,0.42)] relative">
            <div className="text-center mt-5">
                <p className="text-sm font-bold text-lg text-gray-500 text-left pl-5">
                    {array[0]} {'>'} {array[1]} {'>'} {array[2]} {'>'} <span className="text-transform: uppercase" style={{ color: '#4880FF' }}>{array[3]}</span>
                </p>
            </div>
            {/* Filtro de numero junta y seleccion de genero */}
            <div className="flex justify-between items-center px-5 mt-8">
                {/* Primer filtro */}
                <div className="flex items-center gap-0">
                    <div className="w-[10%] p-1 text-black items-center bg-[#4880FF] rounded-l-md flex justify-center border border-black">
                        <FaFilter className="w-4 h-8" />
                    </div>
                    <div className="w-[30%] p-2 bg-[#4880FF] border border-black">
                        <input type="number" placeholder="N° Junta" className="w-full text-left bg-[#4880FF]" style={{ appearance: 'textfield', color: 'white' }} />
                    </div>
                    <div className="w-[40%] p-2 text-black rounded-r-md bg-[#4880FF] border border-black">
                        <select className="w-full text-left bg-[#4880FF]" style={{ appearance: 'textfield', color: 'white' }}>
                            <option value="" disabled selected hidden>Género</option>
                            <option value="1">Masculino</option>
                            <option value="2">Femenino</option>
                        </select>
                    </div>
                </div>
                {/* Segundo filtro */}
                <div className="flex items-center gap-0">
                    <div className="w-[10%] p-1 text-black items-center bg-[#4880FF] rounded-l-md flex justify-center border border-black">
                        <FaFilter className="w-4 h-8" />
                    </div>
                    <div className="w-[40%] p-2 text-black rounded-r-md bg-[#4880FF] border border-black">
                        <select className="w-full text-left bg-[#4880FF]" style={{ appearance: 'textfield', color: 'white' }}>
                            <option value="" disabled selected hidden>Presidente</option>
                            <option value="1">Masculino</option>
                            <option value="2">Femenino</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecintoSeleccionado;
