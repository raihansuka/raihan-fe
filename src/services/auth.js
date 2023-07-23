import axios from 'axios';

const API_URL = 'https://raihan-7t21kgq1x-raihansuka.vercel.app';

export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token, role } = response.data;
        return { token, role };
    } catch (error) {
        throw error;
    }
};

