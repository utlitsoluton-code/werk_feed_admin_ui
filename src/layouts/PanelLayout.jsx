import { CssBaseline, Tooltip } from '@mui/material';
import SidebarMenu from '../components/shared/SidebarMenu';
import { Outlet, useLocation } from 'react-router-dom';
import { PiSignOut } from 'react-icons/pi';
import { useContext, useState } from 'react';
import { AdminContext } from '../contexts';

const PanelLayout = () => {

    // states
   
    return (
        <>
            <CssBaseline />
            <div className='h-screen w-full flex'>
                <div className='w-[200px] h-full shadow-md'>
                    <SidebarMenu />
                </div>
                <div className='flex-1 bg-[#f2f2f2] flex flex-col'>
            
                    </div>
                </div>
            </div>
        </>
    );
}

export default PanelLayout;
