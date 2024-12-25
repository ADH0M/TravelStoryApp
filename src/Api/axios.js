import axios from "axios";

const BASE_URL =import.meta.env.VITE_BASE_URL  
export default axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json',
    },
});

const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export {privateRequest};
