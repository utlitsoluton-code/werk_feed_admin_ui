import { CssBaseline, Tooltip } from '@mui/material';
import SidebarMenu from '../components/shared/SidebarMenu';
import { Outlet, useLocation } from 'react-router-dom';
import { PiSignOut } from 'react-icons/pi';
import { useContext, useState } from 'react';
import { AdminContext } from '../contexts';

const PanelLayout = () => {

    // states
    const [heading, setHeading] = useState('');
    const location = useLocation();

    // context
    const { logout } = useContext(AdminContext);

    return (
        <>
            <CssBaseline />
            <div className='h-screen w-full flex'>
                <div className='w-[200px] h-full shadow-md'>
                    <SidebarMenu />
                </div>
                <div className='flex-1 bg-[#f2f2f2] flex flex-col'>
                    <div className='flex justify-between items-center px-5 shadow-xl py-4 bg-[#853095] text-white'>
                        <h1 className='text-2xl font-semibold text-white'>{heading}</h1>
                        <Tooltip title='Logout'>
                            <button onClick={logout} className='text-sm font-medium flex items-center gap-2 text-[#fff] bg-[#dfdfdf] bg-opacity-60 rounded-md px-5 py-2'>
                                <PiSignOut className='w-5 h-5' />
                                Logout
                            </button>
                        </Tooltip>
                    </div>
                    <div className='flex-1 px-5 py-5 h-full overflow-y-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PanelLayout;
