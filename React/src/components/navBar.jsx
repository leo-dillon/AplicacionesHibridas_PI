import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">Inicio</Link>
      
      <div className="space-x-4">
        {user ? (
          <>
            <span className="font-medium">Hola, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            to="/Iniciar_Sesion"
            className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
