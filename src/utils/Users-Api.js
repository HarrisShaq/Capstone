// frontend/src/services/User-Api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // This will contain user data and token
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMessage);
    }
};

// Log in a user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const { token, ...user } = response.data; // Assuming token and user data are returned
        localStorage.setItem('token', token); // Store token
        return user; // Return user data
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        throw new Error(errorMessage);
    }
};

// Fetch user profile
export const fetchUserProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Send token in the header
            }
        });
        return response.data; // Return user profile data
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch user profile';
        throw new Error(errorMessage);
    }
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('token'); // Remove token on logout
};

