import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const BIN_ID = '66edbacdad19ca34f8a9b390'; // Your user data bin ID
    const API_KEY = '$2a$10$7mjT9aeQtxXINcc8zlRKKOplgg0buh0Py7aLGLuPMJjK.MME4zCnW'; // Replace with your API key

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Fetch existing users data from the bin
            const getResponse = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': API_KEY,
                    'X-Bin-Meta': 'false' // To omit metadata
                }
            });

            const users = Array.isArray(getResponse.data) ? getResponse.data : [];

            // Check if the entered email and password match any user
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                setMessage('Login successful! Welcome, ' + user.email);

                // Store user data in localStorage
                localStorage.setItem('email', user.email);
                localStorage.setItem('password', user.password);

                // Navigate to the Transaction page
                navigate('/transaction'); 

            } else {
                setMessage('Invalid email or password. Please try again.');
            }

        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Error during login. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </form>
        </div>
    );
};

export default Login;
