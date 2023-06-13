import axios from 'axios';
const api = axios.create ({
  baseURL: 'https://fuentes-clinic.onrender.com', // Replace with your server URL
});

export default api;
