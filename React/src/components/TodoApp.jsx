import Footer from './Footer';
import UserList from './users/UserList';
import UserPostForm from './users/UserPostForm';
import '../index.css';

const TodoApp = () => {        
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill">
        <div className="container my-4">
          <div className="card shadow p-4">
           

<div>
      <h1>Formulario de nuevo Usuario</h1>
      <UserPostForm />
    </div>
 <div>
      <h1>Lista de Usuarios</h1>
      <UserList />
    </div>
          </div>
        </div>
      </main>
      
       <Footer/>
    </div>
    
  );
};

export default TodoApp;
