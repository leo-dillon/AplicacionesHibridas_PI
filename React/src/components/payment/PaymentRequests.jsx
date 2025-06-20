import { useEffect, useState } from "react"
import SmallDataPayment from "./SmallDataPayment"

const PaymentRequests = () => {
    const DynamicUrl = import.meta.env.VITE_DynamicUrl

    const [loading, setLoading] = useState(true)
    const [payments, setPayments] = useState()

    useEffect( () => {
        fetch(`${DynamicUrl}/payment/unapproved`)
            .then(res => res.json())
            .then(data => {
                setPayments(data)
                setLoading(false)
            })
    },[])

    return (  
        <div className="group">
            <h2 className="mb-4 border-b border-gray-100 text-3xl text-gray-700 font-bold group-hover:border-gray-400 duration-300"> 
                Pagos pendientes a aprobar 
            </h2>
            <div className="w-full min-h-content flex gap-12 justify-center items-center">
                {
                    ( loading ) 
                        ? <p className="w-full text-center text-xl text-gray-600"> cargando los pagos de usuarios</p>
                        : payments.data.map( (payment) => <SmallDataPayment payment={payment} key={payment._id} />)
                }
            </div>
        </div>
    )
} 

export default PaymentRequests