import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import DatosUser from "../users/DatosUser"
import LastUsers from "../users/LastUsers"
import LastSchools from "../schools/LastSchools"

function HomeLogged(){

    const { userData } = useContext(AuthContext)
    const { id } = userData
    
    return(
        <>
            <main className="flex flex-col gap-12 p-6 overflow-y-auto">
                <DatosUser id = { id }/>
                <LastUsers />
                <LastSchools />
            </main>
        </>
    )
}

export default HomeLogged