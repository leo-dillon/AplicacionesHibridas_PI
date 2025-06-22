import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const DatosSchool = ({ id, role }) => {
    
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    const [loading, setLoading] = useState(true)
    const [ school, setSchool ] = useState()

    useEffect( () => {
        fetch(`${DynamicUrl}/school/${id}` )
            .then( res => res.json() )
            .then( data => {
                setSchool(data)
                setLoading(false)
            })
    } , [] )
    return (
        <>
            {
            (loading)
                ? <p> Cargando los datos de escuela </p>
                : 
                <>
                    <div className="relative w-full p-4 border border-gray-400 rounded-2xl">
                        <h3 className="font-semibold text-xl text-gray-800"> Escuela a la que estás asociado </h3>
                        <div className="grid grid-cols-2 gap-y-4 p-2">
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500"> Nombre Completo: </small>
                                <p className="pl-2 text-gray-800"> { school.name } </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Email: </small>
                                <p className="pl-2 text-gray-800">
                                {   
                                    school.Emails.map( (email, index) => {
                                        return <small className="text-center" key={index}>{ (index > 0) ? "," : "" } { email } <br/></small>
                                    })
                                } 
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Telefono: </small>
                                <p className="pl-2 text-gray-800">
                                {   
                                    school.phones.map( (phone, index) => {
                                        return <small className="text-center" key={index}>{ (index > 0) ? "," : "" } { phone }</small>
                                    })
                                } 
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Intitución: </small> 
                                <p className="pl-2 text-gray-800">
                                {school.type}
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Provincia: </small> 
                                <p className="pl-2 text-gray-800">
                                {school.province}
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Ciudad </small> 
                                <p className="pl-2 text-gray-800">
                                {school.city}
                                </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-500">Dirección: </small> 
                                <p className="pl-2 text-gray-800">
                                {school.address}
                                </p>
                            </div>
                        </div>
                        {
                            ( role == "director" )
                                ? 
                                <Link
                                    to={``}
                                    title="Editar usuario"
                                    className="absolute bottom-0 right-0 px-6 text-blue-400 text-lg border rounded-tl-xl rounded-br-xl hover:text-blue-600 transition"
                                >
                                    Editar
                                </Link>
                                : ""
                        }
                    </div>
                </>
        }
        </>
    )
}

export default DatosSchool