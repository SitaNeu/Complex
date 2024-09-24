import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Optional CSS file for styling
import logo from './forSignup.png'; // Import your Scotia Bank logo

const Signup = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const BIN_ID = '66edbacdad19ca34f8a9b390'; // Your bin ID
    const API_KEY = '$2a$10$7mjT9aeQtxXINcc8zlRKKOplgg0buh0Py7aLGLuPMJjK.MME4zCnW'; // Replace with your API key

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            id: userId,
            username: username,
            email: email,
            password: password
        };

        try {
            const getResponse = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': API_KEY,
                    'X-Bin-Meta': 'false'
                }
            });

            const existingUsers = Array.isArray(getResponse.data) ? getResponse.data : [];
            const updatedUsers = [...existingUsers, newUser];

            await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, updatedUsers, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                }
            });

            setMessage('Signup successful!');
            setUserId('');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('Error during signup. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Steps to Sign Up Section */}
                <div className="col-md-6">
                    <h3>Steps to Sign Up</h3>
                    <ol>
                        <li><strong>Fill in the form:</strong> Enter your User ID, username, email, and password in the fields provided.</li>
                        <li><strong>Submit the form:</strong> Click the "Sign Up" button to create your account.</li>
                        <li><strong>Check your email:</strong> You will receive a confirmation email. Follow the instructions in the email to verify your account.</li>
                        <li><strong>Log in:</strong> After verification, return to the login page and enter your credentials to access your account.</li>
                    </ol>
                </div>

                {/* Signup Form Section */}
                <div className="col-md-6">
                    <h2 className="text-center" style={{ color: 'black' }}>
                        <img src={logo} alt="Scotia Bank Logo" style={{ width: '40px', marginRight: '10px' }} />
                        Sign Up
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userId">User ID</label>
                            <input
                                type="text"
                                id="userId"
                                className="form-control"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
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
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'red', color: 'white' }}>
                            Sign Up
                        </button>
                        {message && <div className="mt-3 alert alert-info">{message}</div>}
                    </form>

                       

                </div>
            </div>
        </div>
    );
};

export default Signup;
