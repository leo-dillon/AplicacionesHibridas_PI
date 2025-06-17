import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const DynamicUrl = import.meta.env.VITE_DynamicUrl;


const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Cargar todos los usuarios al inicio 
  useEffect(() => {   
     const token = localStorage.getItem('jwt');
      const decoded = jwtDecode(token);
      const schoolId = decoded['School'];  
       if (!schoolId) {
        setErrorMsg('No estás asociado a ninguna escuela.');
        return;
      }                
    fetch(`${DynamicUrl}/announcement/${schoolId}`)
      .then(res => res.json())
      .then(data => setAnnouncements(data.data))
      .catch(err => console.error('Error inicial:', err));
  }, []);
  
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Anuncios</h1>
       <section className="space-y-4">
        {errorMsg ? (
          <p className="text-red-600 text-center">{errorMsg}</p>
        ) : announcements.length > 0 ? (
          announcements.map((notification) => (
            <div
              key={notification._id}
              className="shadow-md bg-white rounded-xl border border-gray-200 p-5 transition hover:shadow-lg"
            >
              <p className="text-gray-800 text-base mb-2">
                {notification.message}
              </p>
              <p className="text-sm text-gray-500">
                Publicado el: {new Date(notification.create_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No se encontraron anuncios.</p>
        )}
      </section>

      
    </div>
  );
};

export default AnnouncementList;