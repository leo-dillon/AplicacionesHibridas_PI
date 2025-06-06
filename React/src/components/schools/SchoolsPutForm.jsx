import  { useState  } from 'react';
const DynamicUrl = import.meta.env.VITE_DynamicUrl;

const SchoolEditForm = ()=>{
  const [useLoading, setUseLoading] = useState(false)
 const [schools, setschools] = useState({
        id: '681953052a4809e24066ff47',
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
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(schools);
    setUseLoading(true)

  try {
    const response = await fetch(`${DynamicUrl}/school/${schools.id}`, {
      method: 'PUT',
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
  <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
    <h2 className="text-2xl font-bold text-center">Formulario de Escuela</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
            name="id"
            type="text"
            placeholder="ID de Escuela"
            value={schools.id}
            onChange={handleChange}
            className="input"
            required
            readOnly
      />
      <input
        name="user_id"
        type="text"
        placeholder="ID de Usuario"
        value={schools.user_id}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        name="name"
        type="text"
        placeholder="Nombre de la escuela"
        value={schools.name}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        name="CUE"
        type="text"
        placeholder="CUE"
        value={schools.CUE}
        onChange={handleChange}
        className="input"
        required
      />
<input
        name="phones"
        type="text"
        placeholder="Teléfonos (separados por coma)"
        value={schools.phones}
        onChange={handleChange}
        className="input"
        required
      />
      <input
        name="address"
        type="text"
        placeholder="Dirección"
        value={schools.address}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        name="city"
        type="text"
        placeholder="Ciudad"
        value={schools.city}
        onChange={handleChange}
        className="input"
        required
      />

      <input
        name="province"
        type="text"
        placeholder="Provincia"
        value={schools.province}
        onChange={handleChange}
        className="input"
        required
      />

      

      <input
        name="Emails"
        type="text"
        placeholder="Emails (separados por coma)"
        value={schools.Emails}
        onChange={handleChange}
        className="input"
      />

      <select
        name="level"
        value={schools.level}
        onChange={handleChange}
        className="input"
        required
      >
        <option value="">Nivel</option>
        <option value="Inicial">Inicial</option>
        <option value="Primario">Primario</option>
        <option value="Secundario">Secundario</option>
        <option value="Terciario">Terciario</option>
      </select>

      <select
        name="type"
        value={schools.type}
        onChange={handleChange}
        className="input"
        required
      >
        <option value="">Tipo de institución</option>
        <option value="Pública">Pública</option>
        <option value="Privada">Privada</option>
        <option value="Subencionada">Subencionada</option>

      </select>
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

export default SchoolEditForm;