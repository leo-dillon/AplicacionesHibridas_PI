import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserFilter from '../../components/users/UserFilter';
import GenderFilter from '../../components/users/GenderFilter';
import FirstNameFilter from '../../components/users/FirstNameFilter';
import SmallDataUser from '../../components/users/SmallDataUser';

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
            <SmallDataUser user={user} />
          ))
        ) : (
          <p className="text-red-600">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
