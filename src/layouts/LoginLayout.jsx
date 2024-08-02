import { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import authApi from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const LoginLayout = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target,
            email = form.email.value,
            password = form.password.value;
  
        setLoading(true);
        setError('');
        try {
            const result = await authApi.login(email, password);
            if(result.data.meta.status){
                toast.success("Login");
                localStorage.setItem('adminKey', result.data?.token)
                 form.reset();
                 window.location.reload();
               }else{
                setError(result.data.meta.msg);
        
                toast.error(result.data.meta.msg);
               }

          
        } catch (err) {
            if (err.response?.status === 404 || err.response?.status === 401) {
                setError(err.response.data.message);
            } else {
                console.error(err);
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='h-screen w-full grid place-items-center bg-[#f2f2f2]'>
            <form onSubmit={handleLogin} className='px-4 py-6 bg-white shadow-xl rounded-lg min-w-[450px]'>
                <h2 className='text-2xl text-center mb-5 font-medium'>login</h2>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth size='small'
                        type='email'
                        name='email'
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth size='small'
                        name='password'
                        required
                    />
                    {error && <p className='text-center text-red-500 py-1 text-sm font-medium'>{error}</p>}
                    <Button
                        variant="contained"
                        color="primary" type="submit"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={16} />}
                    >Login</Button>
                </Box>
            </form>
        </div>
    );
}

export default LoginLayout;
