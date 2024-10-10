// Users-Service.js
import { createUser } from './Users-Api';

export const registerUser = async (userData) => {
    try {
        const result = await createUser(userData);
        const token = result.token; // Assuming the token is returned in the response
        saveToken(token); // Function to save the token (localStorage, sessionStorage, etc.)
        return result; // Return user data or any additional information
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Propagate error for further handling
    }
};

const saveToken = (token) => {
    localStorage.setItem('authToken', token); // Save token to localStorage
};

export const getToken = () => {
    return localStorage.getItem('authToken'); // Retrieve token from localStorage
};

export const clearToken = () => {
    localStorage.removeItem('authToken'); // Clear token from localStorage
};
