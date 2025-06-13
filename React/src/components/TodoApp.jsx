
import Footer from './Footer';
import UserList from '../pages/users/UserList';
import UserPostForm from '../pages/users/UserPostForm';
import UserPostFormEdit from '../pages/users/UserPostFormEdit';
import SchoolsList from '../pages/schools/SchoolList';
import SchoolPostForm from '../pages/schools/SchoolPostForm';                             
import SchoolEditForm from '../pages/schools/SchoolsPutForm';                             
import NotFound from '../pages/NotFound';
import Userlogin from '../pages/users/Userlogin';
import {Link, Route, Routes} from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext';
import '../index.css';

import Home from '../pages/Home';

const TodoApp = () => {        
  
  return (
    <>
     <nav className="bg-gray-800 p-4">
  <ul className="flex space-x-6 justify-center">
    <li>
      <Link to="/" className="text-white transition duration-300"
      >
        Home
      </Link>
    </li>
    <li>
      <Link to="/Iniciar_Sesion" className="text-white transition duration-300"
      >
        Iniciar Sesion
      </Link>
    </li>
    <li>
      <Link to="/Lista_Usuarios" className="text-white transition duration-300"
      >
        Usuarios Registrados
      </Link>
    </li>
    <li>
      <Link to="/Lista_Escuela" className="text-white transition duration-300"
      >
        Escuelas Registradas
      </Link>
    </li>
  </ul>
</nav>
<AuthProvider>
   <Routes>
        <Route path='/' element={<Home/>} />
        // {/*Users*/}
        <Route path='/Crear_Usuario' element={<UserPostForm />} />
        <Route path='/Iniciar_Sesion' element={<Userlogin/>} />
        <Route path='/Editar_Usuario/:id' element={<UserPostFormEdit />} />
        <Route path='/Lista_Usuarios' element={<UserList />} />
        // {/*Schools*/}
        <Route path='/Crear_Escuela' element={<SchoolPostForm />} />
        <Route path='/Editar_Escuela/:id' element={<SchoolEditForm />} />
        <Route path='/Lista_Escuela' element={<SchoolsList />} />
        <Route path='*' element={<NotFound />}/>
   </Routes>
</AuthProvider>
    
    </>
  );
};

export default TodoApp;
