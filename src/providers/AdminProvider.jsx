import { useEffect, useState } from 'react';
import { AdminContext } from '../contexts';
import Cookies from 'js-cookie';
import authApi from '../api/auth';

const AdminProvider = ({ children }) => {

    // const [termInfo, setTern] = useState();


    // logout
    const logout = async() => {
        if (!userKey) {
           return false
        }else{
            localStorage.removeItem('adminKey') // Remove token from local storage
        await authApi.();
        setAdmin(false)
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
=            {children}
        </AdminContext.Provider>
    );
}

export default AdminProvider;
