import { Navigate } from "react-router-dom"

const DirectorRoutes = ({ children }) => {
    const user = localStorage.getItem('jwt')
    if( user?.role == "director" || user?.role == "Admin" ){
        return <Navigate to="/" replace/>
    }
    return children
}

export default DirectorRoutes