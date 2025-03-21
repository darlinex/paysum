import axios from 'axios';

// Create Axios instance
const instance = axios.create({
    baseURL: 'https://payrum-1.onrender.com/api',
    timeout: 100000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Create an authenticated Axios instance
export const authInstance = axios.create({
    baseURL: 'https://payrum-1.onrender.com/api',
    timeout: 100000,
    headers: {
        "Content-Type": "application/json"
    }
});

// **Add an Interceptor for Authorization**
authInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(token)
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
