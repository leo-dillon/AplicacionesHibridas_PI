import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import NavBar from "./NavBar"
import NavBarAdmin from "./NavBarAdmin"

const Header = ( ) => {
  
  const { userData, logout } = useContext(AuthContext)
  const UserRole = userData?.role

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  // estoy realizando los demas
  const NavRender = () => {
    switch (UserRole) {
      case "teacher": 
        return "Profesor"

      case "parent":
        return "Padre"

      case 'student':
        return "estudiante"

      case 'director':
        return 'director'

      case 'Admin':
        return <NavBarAdmin handleLogout = { handleLogout } />
      
      default:
        return <NavBar />
    }
  }
  return (
    <>
      <header className="p-4 flex flex-row justify-between items-center bg-gray-800">
        <div className="flex items-center text-white">
          <h1>
            Piccino / Dillon
          </h1>
        </div>
        { NavRender() }
      </header>
    </>
  )
}

export default Header