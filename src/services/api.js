import axios from 'axios';

const api = axios.create({
  baseURL: 'https://raihan-be.vercel.app/api', // Ganti dengan URL backend Anda
});

export default api;
