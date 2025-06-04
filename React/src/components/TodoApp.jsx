import Footer from './Footer';
import UserList from './users/UserList';

import SchoolsList from './schools/SchoolList';
import SchoolPostForm from './schools/SchoolPostForm';                             
import UserPostForm from './users/UserPostForm';
import '../index.css';

const TodoApp = () => {        
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container my-4"> 
        {/*Users*/}
    <div>
      <h1>Formulario de nuevo Usuario</h1>
      <UserPostForm />
    </div>
    <div>
      <h1>Lista de Usuarios</h1>
      <UserList />
    </div>
    {/* Schools*/}
    <div>
      <h1>Formulario de nueva Escuelas</h1>
      <SchoolPostForm />
    </div>
    <div>
      <h1>Lista de Escuelas</h1>
      <SchoolsList/>
    </div>

      </main>
       <Footer/>
    </div>
    

  );
};

export default TodoApp;
