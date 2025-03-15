import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const condition = import.meta.env.VITE_NODE;

console.log("Server: ",condition === 'development' ? API_BASE_URL : 'https://farmisto.onrender.com')

const instance = axios.create({
  baseURL: "https://farmisto.onrender.com"
});


export default instance;
