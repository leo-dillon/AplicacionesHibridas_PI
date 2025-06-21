import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import DatosUser from "../users/DatosUser"
import HomeAdmin from "./HomeAdmin"
import HomeUser from "./HomeUser"

function HomeLogged(){

    const { userData } = useContext(AuthContext)
    const { id } = userData
    
    return(
        <>
            <main className="flex flex-col gap-12 p-6 overflow-y-auto">
                <DatosUser id = { id }/>
                {
                    ( userData.role == 'Admin' )
                        ? <HomeAdmin />
                        : <HomeUser />
                }
            </main>
        </>
    )
}

export default HomeLogged