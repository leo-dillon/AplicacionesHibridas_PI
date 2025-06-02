import React, { useEffect, useState } from 'react';


const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  return (
    <div className="user-container bg-amber-300 flex flex-nowrap overflow-x-auto gap-4 p-4">
  {users.map(user => (
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
    </div>
  ))}
</div>

  );
};

export default UserList;
