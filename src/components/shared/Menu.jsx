import Select from 'react-select';
import { useState } from 'react';

const provinciasEjemplo = [
    {
        "value": 1,
        "label": "Pichincha"
    },
    {
        "value": 2,
        "label": "Guayas"
    },
    {
        "value": 3,
        "label": "Azuay"
    }
]

const cantonesEjemplo = [
    {
        "value": 1,
        "label": "Quito",
    },
    {
        "value": 2,
        "label": "Cuenca",
    },
    {
        "value": 3,
        "label": "Guayaquil",
    }
]

const parroquiasEjemplo = [
    {
        "value": 1,
        "label": "La Mariscal",
    },
    {
        "value": 2,
        "label": "El Vecino",
    },
    {
        "value": 3,
        "label": "El Salado",
    }
]

const recintosEjemplo = [
    {
        "value": 1,
        "label": "Colegio 24 de Mayo",
    },
    {
        "value": 2,
        "label": "Escuela 12 de Octubre",
    },
    {
        "value": 3,
        "label": "Escuela 9 de Octubre",
    }
]

export default function Menu({ menu }) {
    // Implementar base de datos para cargar las opciones
    const [provincias, setProvincias] = useState(provinciasEjemplo);
    const [cantones, setCantones] = useState([]);
    const [parroquias, setParroquias] = useState([]);
    const [recintos, setRecintos] = useState([]);

    // Opciones seleccionadas
    const [provincia, setProvincia] = useState(null);
    const [canton, setCanton] = useState(null);
    const [parroquia, setParroquia] = useState(null);
    const [recinto, setRecinto] = useState(null);

    const handleChange = (tipo, valor) => {
        if (tipo === 'provincia') {
            setProvincia(valor);
            setCanton(null);
            setParroquia(null);
            setRecinto(null);

            //Implementar base de datos para cargar los cantones
            setCantones(cantonesEjemplo);
        } else if (tipo === 'canton') {
            setCanton(valor);
            setParroquia(null);
            setRecinto(null);

            //Implementar base de datos para cargar las parroquias
            setParroquias(parroquiasEjemplo);
        } else if (tipo === 'parroquia') {
            setParroquia(valor);
            setRecinto(null);

            //Implementar base de datos para cargar los recintos
            setRecintos(recintosEjemplo);
        } else if (tipo === 'recinto') {
            setRecinto(valor);
        }
    }

    return (
        <div className={`bg-white md:flex justify-center items-center
        ${menu ? 'flex' : 'hidden'}`}>
            <form className="flex flex-col w-8/12">
                
                <label className="block mb-2 font-medium text-black">Provincia</label>
                <Select
                className='mb-6'
                placeholder='Seleccione una provincia'
                onChange={(option) => handleChange('provincia', option)}
                options={provincias} />

                <label className="block mb-2 font-medium text-black">Cantón</label>
                <Select
                className='mb-6'
                placeholder='Seleccione un cantón'
                onChange={(option) => handleChange('canton', option)}
                isDisabled={!provincia}
                options={cantones} />

                <label className="block mb-2 font-medium text-black">Parroquia</label>
                <Select
                className='mb-6'
                placeholder='Seleccione una parroquia'
                onChange={(option) => handleChange('parroquia', option)}
                isDisabled={!canton}
                options={parroquias} />

                <label className="block mb-2 font-medium text-black">Recinto</label>
                <Select
                className='mb-6'
                placeholder='Seleccione un recinto'
                onChange={(option) => handleChange('recinto', option)}
                isDisabled={!parroquia}
                options={recintos} />

                <button
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 focus:outline-none w-1/2 mx-auto">
                    Buscar
                </button>
            </form>
        </div>
    );
}