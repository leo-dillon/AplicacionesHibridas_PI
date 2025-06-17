import { Link } from "react-router-dom"

const NavBarAdmin = ({ handleLogout }) => {
  return (
    <ul className="flex space-x-6 justify-center items-center m-0">
      <li className="flex items-center">
        <Link to="/" className="text-white transition duration-300">
            Home
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="/Lista_Usuarios" className="text-white transition duration-300">
            Usuarios Registrados
        </Link>
      </li>
      <li className="flex items-center">
        <Link to="/Lista_Escuela" className="text-white transition duration-300">
            Escuelas Registradas
        </Link>
      </li>
      <li>
        <button
          onClick = { handleLogout }
          className="text-white transition duration-300"
        >
          Cerrar Sesion
        </button>
      </li>
    </ul>
  )
}

export default NavBarAdmin