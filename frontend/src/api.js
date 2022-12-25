import axios from 'axios';

const API_ROOT =  
  process.env.NODE_ENV === "production" 
    ? "http://localhost:4001/api"
    : "http://localhost:4001/api";

const api = axios.create({ baseURL: API_ROOT });

export default api;