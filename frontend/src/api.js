import axios from 'axios';

const API_ROOT =  
  process.env.NODE_ENV === "production" 
    ? "/api"
    : "http://localhost:400 1/api";

const api = axios.create({ baseURL: API_ROOT });

export default api;