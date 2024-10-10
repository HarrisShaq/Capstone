// frontend/src/services/apiServices.js
const API_URL = 'http://localhost:3000/api';  // Base URL for the integrated API

// Fetch clothing items
export const fetchClothing = async () => {
    try {
        const response = await fetch(`${API_URL}/clothing`);
        if (!response.ok) throw new Error('Failed to fetch clothing data');
        return response.json();
    } catch (error) {
        console.error('Error fetching clothing:', error);
        throw error; // Re-throw the error for further handling
    }
};

// Fetch shoes
export const fetchShoes = async () => {
    try {
        const response = await fetch(`${API_URL}/shoes`);
        if (!response.ok) throw new Error('Failed to fetch shoes data');
        return response.json();
    } catch (error) {
        console.error('Error fetching shoes:', error);
        throw error; // Re-throw the error for further handling
    }
};

// Fetch accessories
export const fetchAccessories = async () => {
    try {
        const response = await fetch(`${API_URL}/accessories`);
        if (!response.ok) throw new Error('Failed to fetch accessories data');
        return response.json();
    } catch (error) {
        console.error('Error fetching accessories:', error);
        throw error; // Re-throw the error for further handling
    }
};

// Fetch users
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error('Failed to fetch users data');
        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error for further handling
    }
};

// Function to fetch all data at once
export const fetchAllData = async () => {
    try {
        const [clothing, shoes, accessories, users] = await Promise.all([
            fetchClothing(),
            fetchShoes(),
            fetchAccessories(),
            fetchUsers()
        ]);
        return { clothing, shoes, accessories, users };
    } catch (error) {
        console.error('Error fetching all data:', error);
        throw error; // Re-throw the error for further handling
    }
};
