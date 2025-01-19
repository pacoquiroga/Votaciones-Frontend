import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { provinciasApi } from '../../api/provinciasApi';
import { cantonesApi } from '../../api/cantonesApi';
import { parroquiasApi } from '../../api/parroquiasApi';
import { recintosApi } from "../../api/recintosApi";

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
    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [parroquias, setParroquias] = useState([]);
    const [recintos, setRecintos] = useState([]);

    // Opciones seleccionadas
    const [provincia, setProvincia] = useState(null);
    const [canton, setCanton] = useState(null);
    const [parroquia, setParroquia] = useState(null);
    const [recinto, setRecinto] = useState(null);

    //CARGAR DATOS BACKEND
    //Provincias
    const cargarProvincias = async () => {
        try{
            const response = await provinciasApi.get(
                `/menu`
            );
            setProvincias(response.data);
        } catch (error) {
            console.log("Error al cargar las provincias");
        }
    };
    //Cantones
    const cargarCantones = async () => {
        console.log(provincia);
        try{
            const response = await cantonesApi.get(
                `/menu?idProvincia=${provincia.value}`
            );
            setCantones(response.data);
        } catch (error){
            console.log("Error al cargar los cantones");
        }
    };
    //Parroquias
    const cargarParroquias = async () => {
        try{
            const response = await parroquiasApi.get(
                `/menu?idCanton=${canton.value}`
            );
            setParroquias(response.data);
        } catch (error){
            console.log("Error al cargar las parroquias");
        }
    };
    //Recintos
    const cargarRecintos = async () => {
        try{
            const response = await recintosApi.get(
                `/menu?idParroquia=${parroquia.value}`
            );
            setRecintos(response.data);
        } catch (error){
            console.log("Error al cargar los recintos");
        }
    };
    //Effect Provicias
    useEffect(() => {
        cargarProvincias();
    },[]);
    //Effect Cantones
    useEffect(() => {
        if(provincia){
            cargarCantones();
            setParroquias([]);
            setRecintos([]);
        }
    },[provincia]);
    //Effect Parroquias
    useEffect(() => {
        if(canton){
            cargarParroquias();
            setRecintos([]);
        }
    },[canton]);
    //Effect Recintos
    useEffect(() => {
        if(parroquia){
            cargarRecintos();
        }
    },[parroquia]);

    //Funciones handle
    const handleChange = (tipo, valor) => {
        if (tipo === 'provincia') {
            setProvincia(valor);
            setCanton(null);
            setParroquia(null);
            setRecinto(null);
        } else if (tipo === 'canton') {
            setCanton(valor);
            setParroquia(null);
            setRecinto(null);
        } else if (tipo === 'parroquia') {
            setParroquia(valor);
            setRecinto(null);
        } else if (tipo === 'recinto') {
            setRecinto(valor);
        }
    }

    const handleClick = () => {
        console.log(provincia, canton, parroquia, recinto);
        const recintoSeleccionado = {
            provincia: provincia.label,
            canton: canton.label,
            parroquia: parroquia.label,
            recintoId: recinto.value,
            recintoNombre: recinto.label,
        }

        useStore.getState().setRecinto(recintoSeleccionado);
    }

    return (
        <div className={`bg-white md:flex justify-center items-center
        ${menu ? 'flex' : 'hidden'}`}>
            <form className="flex flex-col w-8/12">
                
                <label className="block mb-2 font-medium text-black">Provincia</label>
                <Select
                className='mb-6'
                placeholder='Seleccione una provincia'
                value={provincia}
                onChange={(option) => handleChange('provincia', option)}
                options={provincias} />

                <label className="block mb-2 font-medium text-black">Cantón</label>
                <Select
                className='mb-6'
                placeholder='Seleccione un cantón'
                value={canton}
                onChange={(option) => handleChange('canton', option)}
                isDisabled={!provincia}
                options={cantones} />

                <label className="block mb-2 font-medium text-black">Parroquia</label>
                <Select
                className='mb-6'
                placeholder='Seleccione una parroquia'
                value={parroquia}
                onChange={(option) => handleChange('parroquia', option)}
                isDisabled={!canton}
                options={parroquias} />

                <label className="block mb-2 font-medium text-black">Recinto</label>
                <Select
                className='mb-6'
                placeholder='Seleccione un recinto'
                value={recinto}
                onChange={(option) => handleChange('recinto', option)}
                isDisabled={!parroquia}
                options={recintos} />

                <button
                onClick={handleClick}
                isDisabled={!recinto}
                type='button'
                className={`text-white font-bold rounded-lg px-5 py-2.5 w-1/2 mx-auto
                ${!recinto ? 'bg-gray-400 cursor-default'
                : 'bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none'}`}>
                    Buscar
                </button>
            </form>
        </div>
    );
}