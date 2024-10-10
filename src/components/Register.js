import React, { useState } from 'react';
import { registerUser } from '../services/Users-Api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const result = await registerUser(userData);
            console.log('Registration successful:', result);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;
