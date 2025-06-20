import { useState } from "react"
import { useEffect } from "react"

const SmallDataPayment = ({ payment, key }) => {
    
    const DynamicUrl = import.meta.env.VITE_DynamicUrl
    const [userName, setUserName] = useState("")
    const [loading, setLoading ] = useState(true)

    useEffect( () => {
        fetch(`${DynamicUrl}/users/${payment.issuedTo}`)
            .then(res => res.json())
            .then(data => {
                if( !data.error){
                    setUserName(`${data.firstName} ${data.lastName}`)
                }
            })
    },[])
    
    const handleSubmitAprobar = (e) => {
        e.preventDefault()
        console.log(`${DynamicUrl}/payment/${payment._id}`)
        fetch(`${DynamicUrl}/payment/${payment._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status": "paid"
            }), 
        })
        .then( res => res.json() )
        .then( data => console.log(data) )
    }
    const handleSubmitDesaprobar = (e) => {
        e.preventDefault()
        fetch(`${DynamicUrl}/payment/${payment._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status": "overdue"
            }), 
        })
        .then( res => res.json() )
        .then( data => console.log(data) )
    }
    return (
        <>
        {
            ( userName.length > 2 )
                ?   <div
                        key={ key }
                        className="user-card flex-1 max-w-[400px] h-full border border-gray-300 rounded-xl p-4 text-center bg-gray-100"
                    >
                        <h2 className="text-3xl text-gray-700 font-bold"> { userName } </h2>
                        <p className="p-2 w-full text-start text-gray-800">
                            <span className="text-gray-900 font-semibold"> Intención: </span> 
                            {payment.concept}
                        </p>
                         <p className="p-2 w-full text-start text-gray-800">
                            <span className="text-gray-900 font-semibold"> Monto : </span> 
                            {payment.amount}
                        </p>
                        <form onSubmit={handleSubmitAprobar} method="post">
                            <button type="submit"> Aprobar </button>
                        </form>
                        <form onSubmit={handleSubmitDesaprobar} method="post">
                            <button type="submit"> Denegar </button>
                        </form>
                    </div>
                :  ""
        } 
        </>
    )
}

export default SmallDataPayment