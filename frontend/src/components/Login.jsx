import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct default import

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  // Uncommented error state

    // Auth state management
    const [authState, setAuthState] = useState({
        token: '',
        user: null,
    });

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent form reload

        try {
            const credentials = { username, password };  // Credentials object
            const response = await axios.post('http://localhost:8000/api/login/', credentials);
            const { access } = response.data;  // JWT token
            
            const decodedToken = jwtDecode(access);  // Decode the token
            const userRole = decodedToken.role || "default-role";  // Ensure role exists in the token or provide a fallback

            try {
                // Store the role and token in local storage if accessible
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('accessToken', access);
            } catch (e) {
                console.warn('localStorage is not accessible:', e);
            }

            setAuthState({ ...authState, user: decodedToken, token: access });  // Set user info and token
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please check your credentials.');
        }
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
            {error && <p>{error}</p>}  {/* Display error if any */}
        </form>
    );
};

export default Login;
