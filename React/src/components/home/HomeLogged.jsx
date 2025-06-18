import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Male from "../icons/Male"
import User from "../icons/User"

const DynamicUrl = import.meta.env.VITE_DynamicUrl

function HomeLogged(){
    const { userData } = useContext(AuthContext)
    const { id } = userData
    const [user, setUser] = useState()
    const [imgError, setImgError  ] = useState('true')

    useEffect( () => {
        fetch( `${DynamicUrl}/users/${id}` )
            .then(res => res.json())
            .then(data => setUser(data))
    }, [] )
    
    console.log(user)

    const genreIcon = (genre) => {
        let elegido 
        switch (genre) {
            case "Male":
                elegido = <Male width={ 24 } height={ 24 }/>
                break
            case "Famele":
                elegido = <Famele width={ 24 } height={ 24 }/>
                break
            default:
                elegido = ""
                break
        }
        return elegido
    }
    
    return(
        <>
            <main className="p-6 overflow-y-auto">
                <h2 className="text-3xl text-gray-700 font-bold"> Perfil </h2>
                <small className="text-gray-500"> En está página puedes ver todos tus datos </small>
                <div className="mt-6 flex gap-4 w-full p-4 border border-gray-400 rounded-3xl">
                    <div className="flex justify-center items-center w-full max-w-3/10">
                        {
                            ( user?.photo && imgError ) 
                            ?   <picture className="w-full max-w-8/10 flex justify-center items-center border-4 border-gray-200 rounded-full">
                                    <img 
                                        src={ user?.photo } 
                                        alt={ "Foto de perfil de " + user?.firstName + ' ' + user?.lastName } 
                                        onError={ setImgError( false ) }
                                    />
                                </picture>
                            :   <div className="w-full max-w-8/10 flex justify-center items-center border-4 border-gray-200 rounded-full"> 
                                        <User /> 
                                </div> 
                        }
                    </div>
                    <div className="w-full max-w-7/10 p-4 border border-gray-200 rounded-2xl">
                        <h3 className="font-semibold"> Datos personales </h3>
                        <div className="grid grid-cols-2 gap-y-4 p-2">
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-400"> Nombre Completo: </small>
                                <p className="pl-2 text-gray-600"> { user?.firstName } { user?.lastName } </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-400"> Genero: </small>
                                <p className="pl-2 flex justify-between text-gray-600"> { user?.gender } { genreIcon(user?.gender) }</p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-400"> Fecha de Nacimiento: </small>
                                <p className="pl-2 text-gray-600"> { user?.birthDate.split('T')[0] } </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-400"> DNI: </small>
                                <p className="pl-2 text-gray-600"> { user?.dni} </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-400"> Email: </small>
                                <p className="pl-2 text-gray-600"> { user?.email} </p>
                            </div>
                            <div className="w-8/10 border-b border-gray-200">
                                <small className="text-gray-400"> Telefono: </small>
                                <p className="pl-2 text-gray-600"> { user?.phone} </p>
                            </div>
                            <div className="w-9/10 border-b border-gray-200 col-span-2">
                                <small className="text-gray-400"> Dirección: </small>
                                <p className="pl-2 text-gray-600"> { user?.address} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomeLogged