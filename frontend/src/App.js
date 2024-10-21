import { Routes, Route } from 'react-router-dom';
import React from 'react' 

import './App.css';

import Home from './container/Home';
import Login from './components/Login';
import Register from './components/Register';


const App = () => {
  return (
   
      <Routes>
        <Route path = "/*" element={<Home />} />
        <Route path = "login" element={<Login />}></Route>
        <Route path = "register" element={<Register />}></Route>
      </Routes>
    
  )
}

export default App
