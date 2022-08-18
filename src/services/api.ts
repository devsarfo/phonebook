import axios from "axios";
import AuthService from "./auth";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create();

// Request interceptor for API calls
instance.interceptors.request.use(
    async config => {
        const accessToken = await AuthService.token();
        config.headers = { 
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            
        }
        return config;
    },
    error => Promise.reject(error));
    
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status == 401) 
        {
            //Redirect User to Login
            new AuthService().login();
        }
        
        return Promise.reject(error);
    });
        
export default instance;