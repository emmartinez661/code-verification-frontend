import React from 'react';

import './App.css';
//import LoginForm from './components/forms/LoginForm';
//import RegisterForm from './components/forms/RegisterForm';

//React router DOM imports 
import {BrowserRouter as Router,Routes , Route,Navigate, Link} from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasPage } from './pages/KatasPages';
import { KatasDetailPage } from './pages/KatasDetailPage';

function App() {
  return (
    <div className="App">
     {/*  <LoginForm/> */}
     {/* <RegisterForm/> */}
     <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/katas'>Katas</Link>
          </li>
        </ul>
      </nav>
    {/* TODO Export to Routes folder*/}
      <Routes>
        {/* Routes definition */}
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/katas' element={<KatasPage/>}></Route>
        <Route path='/katas/:id' element={<KatasDetailPage/>}></Route>
        {/*Redirect whtn Page not Found */}
        <Route 
        path='*' 
        element={<Navigate to='/' replace />}></Route>
      </Routes>

     </Router>
    </div>
  );
}

export default App;
