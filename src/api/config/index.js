import axios from "axios";
import Cookies from "js-cookie";


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8110/api/admin',
    headers: {
         "Content-Type": 'application/json',
        //  Authorization: `Bearer ${Cookies.get('adminKey')}`,
        authkey: `${localStorage.getItem('adminKey')}`

    }
});

export default instance;