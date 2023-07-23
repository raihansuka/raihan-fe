import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gray-proud-chinchilla.cyclic.app/api', // Ganti dengan URL backend Anda
});

export default api;
