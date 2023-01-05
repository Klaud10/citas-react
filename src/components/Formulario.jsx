import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false) // Validación del formulario

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validación del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {

            setError(true)

            setTimeout(() => {
                setError(false)
            }, 4000);
        }

        // Vamos a construir un objeto de paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,

        }

        if (paciente.id) {
            // Editando registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})

        } else {
            // Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }



        // Reiniciar el formulario
        setTimeout(() => {
            setNombre('')
            setPropietario('')
            setEmail('')
            setFecha('')
            setSintomas('')
        }, 500);

    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="mx-3 bg-white shadow-md rounded-md py-10 px-5 mb-10">



                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase">
                        Nombre de la Mascota :
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota "
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase">
                        Nombre del Propietario :
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario "
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase">
                        E-mail :
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="correo@correo.com"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase">
                        Fecha de Alta :
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase">
                        Comentarios :
                    </label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Comentarios"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                {error && <Error><p>'Todos los campos son Obligatorios'</p></Error>}

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase text-base font-semibold rounded-md hover:bg-indigo-700 transition-all cursor-pointer shadow-md"
                    value={paciente.id ? 'Guardar cambios' : 'Agregar Paciente'}
                />

            </form>
        </div>
    )
}

export default Formulario
