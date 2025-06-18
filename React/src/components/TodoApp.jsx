import { Link, Route, Routes,  } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import Footer from './Footer';
import UserList from '../pages/users/UserList';
import UserPostForm from '../pages/users/UserPostForm';
import UserPostFormEdit from '../pages/users/UserPostFormEdit';

import SchoolsList from '../pages/schools/SchoolList';
import SchoolPostForm from '../pages/schools/SchoolPostForm';                             
import SchoolEditForm from '../pages/schools/SchoolsPutForm';      

import NotificadosList from '../components/announcement/notificadosList';      

import NotFound from '../pages/NotFound';
import Userlogin from '../pages/users/Userlogin';
import Home from '../pages/Home';
import Header from './header/Header';
import '../index.css';

const TodoApp = () => {        
  return (
    <div className='grid grid-rows-[100px_1fr_100px] min-h-screen'>
      <AuthProvider>

        <Header/>
    
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
          // {/*AnnouncementList*/}
          <Route path='/Notificados' element={<NotificadosList/>} />
          
          <Route path='*' element={<NotFound />}/>
        </Routes>
    
        <Footer/>

      </AuthProvider>
    </div>
  );
};

export default TodoApp;
