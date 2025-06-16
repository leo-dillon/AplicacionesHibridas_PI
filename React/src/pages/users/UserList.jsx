import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserFilter from '../../components/users/UserFilter';
import GenderFilter from '../../components/users/GenderFilter';
import FirstNameFilter from '../../components/users/FirstNameFilter';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Cargar todos los usuarios al inicio 
  useEffect(() => {
    fetch(`${DynamicUrl}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error inicial:', err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>

      <UserFilter apiUrl={DynamicUrl} onResult={setUsers} />
      <GenderFilter apiUrl={DynamicUrl} onResult={setUsers} />
      <FirstNameFilter apiUrl={DynamicUrl} onResult={setUsers} />

      <div className="user-container bg-amber-300 flex flex-nowrap overflow-x-auto gap-4 p-4">
        {users.length > 0 ? (
          users.map(user => (
            <div
              key={user._id}
              className="user-card flex-shrink-0 w-[300px] border border-gray-300 rounded-xl p-4 text-center bg-gray-100"
            >
              <h3 className="text-lg font-semibold mb-2">{user.firstName} {user.lastName}</h3>
              <hr className="border-gray-300 mb-3" />
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Género:</span> {user.gender}</p>
              <p><span className="font-semibold">Fecha de nacimiento:</span> {new Date(user.birthDate).toLocaleDateString("es-AR")}</p>
              <p><span className="font-semibold">DNI:</span> {user.dni}</p>
              <p><span className="font-semibold">Dirección:</span> {user.address}</p>
              <p><span className="font-semibold">Teléfono:</span> {user.phone}</p>
              <p><span className="font-semibold">Rol:</span> <strong>{user.role}</strong></p>
              <Link
                to={`/Editar_Usuario/${user._id}`}
                className="text-blue-400 underline text-lg transition duration-300"
              >
                Editar
              </Link>
            </div>
          ))
        ) : (
          <p className="text-red-600">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
