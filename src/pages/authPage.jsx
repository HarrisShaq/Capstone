import React, { useState } from 'react';
import SignUpForm from '../components/signUpForm';
import '../styles/authPage.css'; 

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        alert(`Email: ${email}, Password: ${password}`);
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Authentication</h1>
            <SignUpForm />
            <input 
                type="text" 
                className="auth-input" 
                placeholder="Email" 
                value={email}
                onChange={handleEmailChange} 
            />
            <input 
                type="password" 
                className="auth-input" 
                placeholder="Password" 
                value={password}
                onChange={handlePasswordChange} 
            />
            <button className="auth-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default AuthPage;
