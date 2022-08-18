import axios from "axios";
import AuthService from "./auth";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ await AuthService.token()
    }
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status == 401) 
        {
            //Redirect User to Login
            new AuthService().login();
        }
        
        return Promise.reject(error);
    }
)

export default instance;