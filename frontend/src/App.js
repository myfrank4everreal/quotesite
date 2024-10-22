import { Routes, Route } from 'react-router-dom';
import React from 'react';

// Admin protection from unauthorized user
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './components/AdminDashboard';
// Adding the Role provider for user identification and role assignment
import { RoleProvider } from './contexts/RoleContext';

import './App.css';

import Home from './container/Home';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <RoleProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Admin protected route */}
        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
      </Routes>
    </RoleProvider>
  );
};

export default App;
