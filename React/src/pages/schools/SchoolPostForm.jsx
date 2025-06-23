import { jwtDecode } from 'jwt-decode';
import  { useState, useEffect   } from 'react';
import { useNavigate } from 'react-router-dom';

const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const SchoolPostForm = ()=>{
  const [useLoading, setUseLoading] = useState(false)
   const navigate = useNavigate();
 const [schools, setschools] = useState({
       user_id:'',
       name:'',
       CUE:'' ,
       address:'',
       city: '',
       province: '',
       phones:'',
       Emails: '',
       creation_date: new Date(),
       level:'',
       type: ''
    })
    const [errors, setErrors] = useState({});
const validateForm = () => {
  const newErrors = {};

  if (!schools.name.trim()) newErrors.name = 'El nombre de la escuela es obligatorio.';
  if (!schools.CUE.trim()) newErrors.CUE = 'El CUE es obligatorio.';
  if (!schools.address.trim()) newErrors.address = 'La dirección es obligatoria.';
  if (!schools.city.trim()) newErrors.city = 'La ciudad es obligatoria.';
  if (!schools.province.trim()) newErrors.province = 'La provincia es obligatoria.';
  if (!schools.phones.trim()) newErrors.phones = 'El teléfono es obligatorio.';
  if (schools.Emails && !schools.Emails.split(',').every(email => /\S+@\S+\.\S+/.test(email.trim()))) {
    newErrors.Emails = 'Uno o más correos electrónicos no son válidos.';
  }
  if (!schools.level) newErrors.level = 'Seleccioná un nivel educativo.';
  if (!schools.type) newErrors.type = 'Seleccioná un tipo de gestión.';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    const decoded = jwtDecode(token);
    const userId = decoded?.id || decoded?.user_id;
    if (userId) {
      setschools((prev) => ({
        ...prev,
        user_id: userId
      }));
    }
  }
}, []);
   const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setUseLoading(true)

  try {
    const response = await fetch(`${DynamicUrl}/school`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schools),
    });
    setUseLoading(false)
    if (!response.ok) {
      const errorText = await response.text();// Intentar leer el cuerpo
      alert(errorText)
    }
    navigate('/');
  } catch (error) {
    console.error('Error al crear escuela:', error);
    setUseLoading(false)
  }
};

    const handleChange = (e)=> {
     const { name, value, type, checked } = e.target;
      setschools((prevData)=>({
        ...prevData, [name]: type === 'checkbox' ? checked : value,
      }))
    }
 return(
    <div className="school-container bg-gray-100 py-4">
            <h1>Formulario de nueva Escuelas</h1>

  <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 className="text-2xl font-bold text-center">Formulario de Escuela</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
        name="name"
        type="text"
        placeholder="Nombre de la escuela"
        value={schools.name}
        onChange={handleChange}
        className="input"
        
      />
      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Identifiacador educativo</label>
        <input
        name="CUE"
        type="text"
        placeholder="CUE"
        value={schools.CUE}
        onChange={handleChange}
        className="input"
        
      />
            {errors.CUE && <p className="text-red-500 text-sm mt-1">{errors.CUE}</p>}

      </div>
      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">Telefono educativo</label>

        <input
        name="phones"
        type="text"
        placeholder="Teléfonos (separados por coma)"
        value={schools.phones}
        onChange={handleChange}
        className="input"
        
      />
      {errors.phones && <p className="text-red-500 text-sm mt-1">{errors.phones}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
        <input
        name="address"
        type="text"
        placeholder="Dirección"
        value={schools.address}
        onChange={handleChange}
        className="input"
        
      />
      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
        <input
        name="city"
        type="text"
        placeholder="Ciudad"
        value={schools.city}
        onChange={handleChange}
        className="input"
        
      />
      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
        <input
        name="province"
        type="text"
        placeholder="Provincia"
        value={schools.province}
        onChange={handleChange}
        className="input"
        
      />
      {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Emails</label>
        <input
        name="Emails"
        type="text"
        placeholder="Emails (separados por coma)"
        value={schools.Emails}
        onChange={handleChange}
        className="input"
      />
      {errors.Emails && <p className="text-red-500 text-sm mt-1">{errors.Emails}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel academico</label>
        <select
        name="level"
        value={schools.level}
        onChange={handleChange}
        className="input"
        
      >
        <option value="">Nivel</option>
        <option value="Inicial">Inicial</option>
        <option value="Primario">Primario</option>
        <option value="Secundario">Secundario</option>
        <option value="Terciario">Terciario</option>
      </select>
            {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}

      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de gestion</label>
        <select
        name="type"
        value={schools.type}
        onChange={handleChange}
        className="input"
        
      >
        <option value="">Tipo de institución</option>
        <option value="Pública">Pública</option>
        <option value="Privada">Privada</option>
        <option value="Subencionada">Subencionada</option>

      </select>
      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}

      </div>
      

      

      

      

      

      

      

      

      

      
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      { (useLoading) ? 'loading' : 'Guardar Escuela' }
    </button>
  </form>
</div>

 )
}

export default SchoolPostForm;