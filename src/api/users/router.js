import axios from 'axios';

const BASE_URL = 'http://localhost:8000/user/';

export const usersApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const loginUser = async (email, password) => {
    try {
        const response = await usersApi.post('login/', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await usersApi.post('register/', userData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await usersApi.get('users/');
        return response.data;
    } catch (error) {
        console.error('Get users error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await usersApi.get(`users/${userId}/`);
        return response.data;
    } catch (error) {
        console.error('Get user by ID error:', error.response ? error.response.data : error.message);
        throw error;
    }
};
