

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        axios.post('http://localhost:8000/api/register/', {
            username,
            password
        })
        .then(response => {
            window.location.href = '/login';  // Redirect to login after registration
        })
        .catch(error => {
            setError('Registration failed');
        });
    };

    return (
        <form onSubmit={handleRegister}>
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
            <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm Password" 
                required 
            />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;