const provincias = [
    {
        "id": 1,
        "nombre": "Pichincha"
    },
    {
        "id": 2,
        "nombre": "Guayas"
    },
    {
        "id": 3,
        "nombre": "Azuay"
    }
]

const cantones = [
    {
        "id": 1,
        "nombre": "Quito",
        "provincia_id": 1
    },
    {
        "id": 2,
        "nombre": "Cuenca",
        "provincia_id": 3
    },
    {
        "id": 3,
        "nombre": "Guayaquil",
        "provincia_id": 2
    }
]

const parroquias = [
    {
        "id": 1,
        "nombre": "La Mariscal",
        "canton_id": 1
    },
    {
        "id": 2,
        "nombre": "El Vecino",
        "canton_id": 2
    },
    {
        "id": 3,
        "nombre": "El Salado",
        "canton_id": 3
    }
]

const recintos = [
    {
        "id": 1,
        "nombre": "Colegio 24 de Mayo",
        "parroquia_id": 1
    },
    {
        "id": 2,
        "nombre": "Escuela 12 de Octubre",
        "parroquia_id": 2
    },
    {
        "id": 3,
        "nombre": "Escuela 9 de Octubre",
        "parroquia_id": 3
    }
]

export default function Menu({ menu }) {
    return (
        <div className={`bg-white md:flex justify-center items-center
        ${menu ? 'flex' : 'hidden'}`}>
            <form className="flex flex-col w-8/12">
                <label className="block mb-2 font-medium text-black">Provincia</label>
                <select className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 mb-6">
                    <option value="">Seleccione una provincia</option>
                    {provincias.map(provincia => (
                        <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                    ))}
                </select>

                <label className="block mb-2 font-medium text-black">Cantón</label>
                <select className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 mb-6">
                    <option value="">Seleccione un cantón</option>
                    {cantones.map(canton => (
                        <option key={canton.id} value={canton.id}>{canton.nombre}</option>
                    ))}
                </select>

                <label className="block mb-2 font-medium text-black">Parroquia</label>
                <select className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 mb-6">
                    <option value="">Seleccione una parroquia</option>
                    {parroquias.map(parroquia => (
                        <option key={parroquia.id} value={parroquia.id}>{parroquia.nombre}</option>
                    ))}
                </select>

                <label className="block mb-2 font-medium text-black">Recinto</label>
                <select className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 mb-10">
                    <option value="">Seleccione un recinto</option>
                    {recintos.map(recinto => (
                        <option key={recinto.id} value={recinto.id}>{recinto.nombre}</option>
                    ))}
                </select>

                <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 focus:outline-none">
                    Buscar
                </button>
            </form>
        </div>
    );
}