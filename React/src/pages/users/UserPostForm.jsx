import  {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UserPostForm = () => {
  const [users, setUsers] = useState({
    firstName:'',
    lastName:'',
    gender: '',
    birthDate:'',
    dni:'',
    email:'',
    address:'',
    phone:'',
    password:'',
    active: true,
    role: '',
  });
  const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users); 
    fetch(`${DynamicUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users), 
      })
      navigate('/');
  }
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  


  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
    <div className="text-center">
      <img
        src="/li.svg"
        alt="Registro"
        className="mx-auto w-24 h-24 rounded-full object-cover mb-4"
      />
      <h1 className="text-3xl font-bold text-gray-800">Registrarse</h1>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            name="firstName"
            type="text"
            value={users.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
          <input
            name="lastName"
            type="text"
            value={users.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <select
            name="gender"
            value={users.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar género</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Other">Otro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
          <input
            name="birthDate"
            type="date"
            value={users.birthDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
          <input
            name="dni"
            type="text"
            value={users.dni}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={users.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input
            name="address"
            type="text"
            value={users.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            name="phone"
            type="tel"
            value={users.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            name="password"
            type="password"
            value={users.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            name="role"
            value={users.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar rol</option>
            <option value="student">Estudiante</option>
            <option value="parent">Padre</option>
            <option value="teacher">Profesor</option>
            <option value="director">Director</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  </div>
</div>

  );
};

export default UserPostForm;
