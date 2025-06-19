import { useEffect, useState } from "react"
import SmallDataschool from "./SmallDataSchool"

const LastSchools = () => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    
    const [schools, setSchools] = useState()
    const [loading, setLoading] = useState(true)
    
    
    useEffect( () => {
        fetch( `${DynamicUrl}/School/lastSchool` )
            .then(res => res.json())
            .then(data => {
                setSchools(data)
                console.log(data)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            })
    },[])
    
    return (
        <>
        <h2 className="text-3xl text-gray-700 font-bold"> Ultimas Escuelas registrados </h2>
        <div className="flex gap-12 justify-center items-center">
        {
            ( loading ) 
            ? <p className="w-full text-center text-xl text-gray-600"> cargando los datos del usuario</p>
            : schools.map( school => <SmallDataschool school={school} />
            )
        }
        </div>
        </>
    )
}

export default LastSchools