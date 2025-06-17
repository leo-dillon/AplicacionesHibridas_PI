import  {  useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const UserPostFormEdit = () => {

  const {id}= useParams();
  const navigate = useNavigate();

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
    school_id: '',
  });
  const [schools, setSchools] = useState([]);
// Cargar los datos actuales
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`${DynamicUrl}/users/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener el usuario');
        const data = await response.json();
         setUsers(prev => ({
        ...prev,
        ...data,
        birthDate: data.birthDate ? data.birthDate.split('T')[0] : '',
        school_id: data.school_id || '',
      }));
       
      } catch (error) {
        console.error('Error al cargar los datos de el usuario:', error);
      }
      
    };
    fetchSchoolData();
  }, [id]);
  useEffect(() => {
  fetch(`${DynamicUrl}/school`)
    .then(response => response.json())
    .then(data => setSchools(data))  // guardás directo el arreglo de escuelas
    .catch(error => console.error('Error al cargar escuelas:', error));
}, []);

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users); 
fetch(`${DynamicUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users), 
  })
    .then(() => {
      navigate('/Lista_Usuarios'); 
    })
    .catch((error) => {
      console.error('Error al enviar los datos:', error);
    });
  }
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsers((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  


  return (
    <div className="user-container bg-gray-100 py-4">
            <h1>Formulario de editar Usuario</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4" >
      <h2 className="text-2xl font-bold text-center">Formulario de editar Usuario</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

        <input name="firstName" type="text" placeholder="Nombre" value={users.firstName} onChange={handleChange} className="input" required />
        <input name="lastName" type="text" placeholder="Apellido" value={users.lastName} onChange={handleChange} className="input" required />

        <select name="gender" value={users.gender} onChange={handleChange} className="input" required>
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Other">Otro</option>
        </select>

        <input name="birthDate" type="date" value={users.birthDate} onChange={handleChange} className="input" required />

        <input name="dni" type="text" placeholder="DNI" value={users.dni} onChange={handleChange} className="input" required />
        <input name="email" type="email" placeholder="Email" value={users.email} onChange={handleChange} className="input" required />

        <input name="address" type="text" placeholder="Dirección" value={users.address} onChange={handleChange} className="input" required />
        <input name="phone" type="tel" placeholder="Teléfono" value={users.phone} onChange={handleChange} className="input" required />

        <input name="password" type="password" placeholder="Contraseña" value={users.password} onChange={handleChange} className="input" required />
        <select name="role" value={users.role} onChange={handleChange} className="input" required>
          <option value="student">Estudiante</option>
          <option value="parent">Padre</option>
          <option value="teacher">Profesor</option>
          <option value="director">director</option>
        </select>
         <select
            name="school_id"
            value={users.school_id}
            onChange={handleChange}
            className="input"
          >
            <option value="">Seleccionar escuela</option>
            {schools.map((school) => (
              <option key={school._id || school.id} value={school._id || school.id}>
                {school.name || school.schoolName}
              </option>
            ))}
          </select>
      </div>

      

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Enviar
      </button>
    </form>
      
    </div>
  );
};

export default UserPostFormEdit;
