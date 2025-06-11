
import Footer from './Footer';
import UserList from './users/UserList';
import UserPostForm from './users/UserPostForm';
import UserPostFormEdit from './users/UserPostFormEdit';
import SchoolsList from './schools/SchoolList';
import SchoolPostForm from './schools/SchoolPostForm';                             
import SchoolEditForm from './schools/SchoolsPutForm';                             
import NotFound from '../pages/NotFound';
import '../index.css';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'

import Home from '../pages/Home';

const TodoApp = () => {        
  
  return (
    <>
    <h3>Rutas</h3>
     <nav className="bg-gray-800 p-4">
  <ul className="flex space-x-6 justify-center">
    <li>
      <Link to="/" className="text-white transition duration-300"
      >
        Home
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

    <Routes>
        <Route path='/' element={<Home/>} />
        // {/*Users*/}
        <Route path='/Crear_Usuario' element={<UserPostForm />} />
        <Route path='/Editar_Usuario/:id' element={<UserPostFormEdit />} />
        <Route path='/Lista_Usuarios' element={<UserList />} />
        // {/*Schools*/}
        <Route path='/Crear_Escuela' element={<SchoolPostForm />} />
        <Route path='/Editar_Escuela' element={<SchoolEditForm />} />
        <Route path='/Lista_Escuela' element={<SchoolsList />} />
        <Route path='*' element={<NotFound />}/>

    </Routes>
    </>
  );
};

export default TodoApp;
