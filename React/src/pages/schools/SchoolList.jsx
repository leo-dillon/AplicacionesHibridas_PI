import { useEffect, useState } from 'react';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;
import { Link } from "react-router-dom"
 import ProvinceFilter from '../../components/schools/ProvinceFilter';
 import TypeFilter from '../../components/schools/TypeFilter';
 import NameFilter from '../../components/schools/NameFilter';
const SchoolList = ()=>{
    const [schools, setSchool]= useState([])
   // se ejecuta después de que el componente se ha montado
    useEffect(()=>{
         fetch(`${DynamicUrl}/school`)
         .then(response => response.json())
         .then(data => setSchool(data)) 
         .catch(error => console.error('Error al cargar usuarios:', error));
    }, [])

     return (
    <div>
      <h1>Lista de Escuelas</h1>

      <ProvinceFilter apiUrl={DynamicUrl} onResult={setSchool} />
      <TypeFilter apiUrl={DynamicUrl} onResult={setSchool} />
      <NameFilter apiUrl={DynamicUrl} onResult={setSchool} />

      <div className="user-container bg-cyan-900 flex flex-nowrap overflow-x-auto gap-4 p-4">
        {schools.length > 0 ? (
          schools.map((school) => (
            <div key={school._id} className="bg-white rounded-2xl shadow-md p-6 user-card flex-shrink-0 w-[300px] border text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{school.name}</h2>
              <hr />
              <p className="text-sm text-gray-600 mb-1">
                <strong>CUE:</strong> {school.CUE}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Dirección:</strong> {school.address}, {school.city}, {school.province}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Teléfonos:</strong> {school.phones.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Emails:</strong> {school.Emails.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Nivel:</strong> {school.level}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tipo:</strong> {school.type}
              </p>
              <Link to={`/Editar_Escuela/${school._id}`} className="text-blue-400 underline text-lg transition duration-300">
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

export default SchoolList;