import React, { useState } from 'react';
import axios from 'axios';



const Login = () => {
    // more like we are declaring a function and variable at 
    // time for an array the variable stores the data
    // the function execute the effect for that to happen.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhosot:8000/api/token/',{
            username,
            password
        }) 
        .then(response => {
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            window.location.href = '/'; // redirect to home
        })
        .catch(error => {
            setError('Invalid login credentials');
        });
    };

  return (
    <form onSubmit={handleLogin}>
    <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        required 
    />
    <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
    />
    <button type="submit">Login</button>
    {error && <p>{error}</p>}
   </form>
    
  );
};

export default Login;
