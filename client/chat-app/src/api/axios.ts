import axios, { type InternalAxiosRequestConfig } from "axios";
// import { store } from "../store/slices/store";

const api = axios.create({
    baseURL: 'https://te325lnrid.execute-api.ap-south-1.amazonaws.com/dev/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token  = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
})

export default api;