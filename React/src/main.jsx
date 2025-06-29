import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './components/TodoApp';

import { BrowserRouter } from 'react-router-dom'
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <TodoApp />
    </BrowserRouter>
  </React.StrictMode>
  
);

