import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const AssignCoursesToUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const decoded = jwtDecode(token);
      const schoolId = decoded['School'];
     // trae los cursos de la escuela
      const resCourses = await fetch(`${DynamicUrl}/courses/escuela/${schoolId}`);
      const dataCourses = await resCourses.json();
      setCourses(dataCourses.data || []);
     // trae los cursos del usuario
      const resUserCourses = await fetch(`${DynamicUrl}/users/${id}/courses`);
      const dataUserCourses = await resUserCourses.json();

      const assignedCourseIds = dataUserCourses.data
        ? dataUserCourses.data.map(course => course._id)
        : [];
      setSelectedCourses(assignedCourseIds);
      
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    // le asigna los cursos
      await fetch(`${DynamicUrl}/users/${id}/assign-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseIds: selectedCourses })
      });
        navigate('/Estudiantes')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Asignar Cursos al Usuario</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Selecciona Su cursos:
  </label>
  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2 bg-white">
    {courses.map(course => (
      <label key={course._id} className="flex items-center space-x-2 mb-2 cursor-pointer">
        <input type="checkbox" 
        value={course._id}
          checked={selectedCourses.includes(course._id)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedCourses(prev => {
              if (checked) {
                return [...prev, course._id];
              } else {
                return prev.filter(id => id !== course._id);
              }
            });
          }}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-gray-800">{course.titulo}</span>
      </label>
    ))}
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition">
    Asignar Cursos
  </button>
</form>
    </div>
  );
};

export default AssignCoursesToUser;
