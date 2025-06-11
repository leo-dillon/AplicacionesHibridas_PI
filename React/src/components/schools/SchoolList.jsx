import { useEffect, useState } from 'react';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;
const SchoolList = ()=>{
    const [schools, setSchool]= useState([])
   // se ejecuta después de que el componente se ha montado
    useEffect(()=>{
         fetch(`${DynamicUrl}/school`)
         .then(response => response.json())// convertimos la respuesta en JSON
         .then(data => setSchool(data)) //se guarda el resultado en la variable school usando setSchool
         .catch(error => console.error('Error al cargar usuarios:', error));
    }, [])

    return(
<div>
<h1>Lista de Escuelas</h1>
<div className="user-container bg-cyan-900 flex flex-nowrap overflow-x-auto gap-4 p-4">
  {schools.map((school) => (
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
        <strong>Teléfonos:</strong> {school.Emails.join(", ")}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Nivel:</strong> {school.level}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Tipo:</strong> {school.type}
      </p>
    </div>
  ))}
</div>
</div>
        

    )
}

export default SchoolList;