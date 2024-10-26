import React, { useState } from 'react';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';  // Correct default import



const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/token/',{username, password})
        
        .then(response => {
            const {access } = response.data;
            try{
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refresh', response.data.refresh);
            }catch(e){
                console.warn('local storage error', e);
            }
            
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
        placeholder="Username1" 
        required 
    />
    <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password1" 
        required 
    />
    <button type="submit">Login</button>
    {error && <p>{error}</p>}
   </form>
    
  );
};

export default Login;
