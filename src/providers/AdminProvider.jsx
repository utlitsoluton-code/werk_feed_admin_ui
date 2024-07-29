import { useEffect, useState } from 'react';
import { AdminContext } from '../contexts';
import Cookies from 'js-cookie';
import authApi from '../api/auth';
import staticPageApi from '../api/staticPage';

const AdminProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(true);
    // const [termInfo, setTern] = useState();


    // logout
    const logout = async() => {
        const userKey = localStorage.getItem('adminKey');
        if (!userKey) {
           return false
        }else{
            localStorage.removeItem('adminKey') // Remove token from local storage
        await authApi.logout();
        setAdmin(false)
        window.location.pathname = '/';
        }
        
       

    }

    useEffect(() => {
        if (localStorage.getItem('adminKey')) {
            (async () => {
                try {
                    //  const res = await staticPageApi.readAll();
                    // const res = await authApi.logout();
                    // setTern(res)
                     setAdmin(true);
                } catch (err) {
                    setAdmin(null);
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setAdmin(null);
            setLoading(false);
        }
    }, []);

    return (
        <AdminContext.Provider value={{ loading, admin, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminProvider;
