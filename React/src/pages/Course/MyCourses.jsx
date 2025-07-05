import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;
const gradients = [
  'from-blue-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-pink-500 to-rose-600',
];
const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const decoded = jwtDecode(token);
    const userId = decoded['id'];
    try {
      
      fetch(`${DynamicUrl}/users/${userId}/courses`)
        .then(res => res.json())
        .then(data => {
          if (data.data && data.data.length > 0) {
            setCourses(data.data);
          } else {
            setError('No tenés cursos asignados.');
          }
        })
        .catch(err => {
          console.error('Error al obtener cursos:', err);
          setError('Error al cargar los cursos.');
        });

    } catch (err) {
      console.error('Token inválido:', err);
      setError('Token inválido.');
    }
  }, []);

  return (
    <div className=" px-4 py-6">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Cursos</h1>

  {error ? (
    <p className="text-red-600">{error}</p>
  ) : (
    <div className="space-y-6">
  {courses.map((course, index) => (
    <Link
      to={`/Comunicados-Curso/${course._id}`}
      key={course._id}
      className="block rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition transform hover:scale-[1.01]"
    >
      <div
        className={`p-6 text-white bg-gradient-to-r ${
    gradients[index % gradients.length]
  }`}
      >
        <h2 className="text-xl font-bold">{course.titulo}</h2>
        <p className="text-sm mt-1 opacity-90">{course.descripcion}</p>
      </div>

      <div className="p-4 bg-white text-sm text-blue-600 font-medium">
        Ver comunicados →
      </div>
    </Link>
  ))}
</div>

  )}
</div>

  );
};

export default MyCourses;
