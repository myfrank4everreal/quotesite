import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct default import
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();  // Set up navigate function

    // define the authstate management
    const [authState, setAuthState] = useState({
        token: '',
        user: null,
    })

    const handleLogin = async(event) => {
        event.preventDefault(); //prevents form reload
        try{
            const credentials = { username, password };
            const response = await axios.post('http://localhost:8000/api/login/', credentials);
            const { access } = response.data; // JWT Token
            const decodedToken = jwtDecode(access);
            const userRole = decodedToken.role;  // what is this this decodedToken.role and is it properly setup?
            // localStorage.setItem('userRole', userRole);
            localStorage.setItem('authToken', access);  // Save the JWT access token

            setAuthState({ ...authState, userRole, token: access });
             // Redirect to home page after login
            navigate('/');  // Replace '/home' with your home page route
        } catch(error){
            console.error('Login failed', error);
            setError('Login failed please check your credentials. ');
        }
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
