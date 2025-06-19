import { useEffect, useState } from "react"
import SmallDataUser from "./SmallDataUser"

const LastUsers = () => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)


    useEffect( () => {
        fetch( `${DynamicUrl}/users/lastUser` )
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            })
    },[])

    return(
        <>
            <h2 className="text-3xl text-gray-700 font-bold"> Ultimos Usuarios registrados </h2>
            <div className="flex gap-12 justify-center items-center">
            {
                ( loading ) 
                ? <p className="w-full text-center text-xl text-gray-600"> cargando los datos del usuario</p>
                : users.map( user => <SmallDataUser user={user} />
                )
            }
            </div>
        </>
    )
}

export default LastUsers