import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const condition = import.meta.env.VITE_NODE;

const instance = axios.create({
  baseURL: condition === 'development' ? API_BASE_URL : '',
});

console.log(condition);


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
