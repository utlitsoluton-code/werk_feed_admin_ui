import { Home, LocationCity,CardMembership } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { AiFillCar } from 'react-icons/ai';
import { FaCarSide, FaTram } from 'react-icons/fa';
import { FaArrowRightToCity } from 'react-icons/fa6';
import { RiLoopRightLine } from 'react-icons/ri';
import { FaQuora } from "react-icons/fa";
import SettingsIcon from '@mui/icons-material/Settings';

const NavMenu = ({ children, to, Icon }) => {
    return <NavLink to={to} className={({ isActive }) => `text-sm flex gap-x-2 leading-none items-center py-3 px-3 ${isActive && 'bg-[#f2f2f2] font-medium text-[#853095]'} duration-300 hover:bg-[#f2f2f2] rounded-l-lg`}>
        <Icon className='!w-5 !h-5' />
        <span className='mt-1'>{children}</span>
    </NavLink>
}

const SidebarMenu = () => {

    const navLinks = [
        {
            name: 'Home',
            to: '/',
            Icon: Home
        },
        {
            name: 'Plans',
            to: '/plans',
            Icon: CardMembership
        },
        {
            name: 'Blogs',
            to: '/blogs',
            Icon: BsFillPinAngleFill
        },
        {
            name: 'Faqs',
            to: '/faqs',
            Icon: FaQuora
        },
         {
            name: 'Settings',
            to: '/settings',
            Icon: SettingsIcon
        },
        // {
        //     name: 'Category',
        //     to: '/categories',
        //     Icon: BiSolidCategoryAlt
        // },
        // {
        //     name: 'Places',
        //     to: '/places',
        //     Icon: LocationCity
        // },
        // {
        //     name: 'Cabs',
        //     to: '/cabs',
        //     Icon: AiFillCar
        // },
        // {
        //     name: 'Attach Taxis',
        //     to: '/attach-taxis',
        //     Icon: FaCarSide
        // },
        // {
        //     name: 'One-Way Trip',
        //     to: '/one-way-trip',
        //     Icon: FaArrowRightToCity
        // },
        // {
        //     name: 'Round Trip',
        //     to: '/round-trip',
        //     Icon: RiLoopRightLine
        // },
        // {
        //     name: 'Local Trip',
        //     to: '/local-trip',
        //     Icon: FaTram
        // },
        // {
        //     name: 'Transfer Trip',
        //     to: '/transfer-trip',
        //     Icon: LocationCity
        // },
        // {
        //     name: 'Bookings',
        //     to: '/bookings',
        //     Icon: BiSolidCategoryAlt
        // },
        // {
        //     name: 'Settings',
        //     to: '/settings',
        //     Icon: Settings
        // },
    ];

    return (
        <div className='max-h-[100%] overflow-y-auto'>
            <div className='text-center mt-4'>
                <Link to='/' className='w-1/2 inline-block'>
                    {/* <img src={logo} alt='Elder Cabs Logo' className='w-full h-auto ' /> */}
                    <img src="http://resume.lillgreenz.in/img/core-img/werkfeed-logo.gif" alt='Werkfeed Logo' className='w-full h-auto ' />

                </Link>
            </div>
            <div className='flex flex-col gap-y-2 py-3 pl-2'>
                {navLinks.map(item => <NavMenu {...item} key={item.name}>{item.name}</NavMenu>)}
            </div>
        </div>
    );
}

export default SidebarMenu;
