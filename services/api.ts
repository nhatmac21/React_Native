import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-domain.com/api', // Thay bằng domain backend thật
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
