import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const Userlogin = () => {
  const [users, setUsers] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!users.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(users.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!users.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (users.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${DynamicUrl}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
      });

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || 'Error al autenticar');
}


      const result = await response.json();
      console.log(result);
       login(result.user, result.token);

       navigate('/');
    } catch (error) {
alert('Tenemos un error al loguear al usuario: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md text-center space-y-6">
        <img
          src="/li.svg"
          alt="Login"
          className="mx-auto w-24 h-24 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold text-gray-800">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={users.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              value={users.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
        <a href="/Crear_Usuario" className="text-blue-600 hover:underline">
          ¿No tienes cuenta? Registrarse
        </a>
      </div>
    </div>
  );
};

export default Userlogin;
