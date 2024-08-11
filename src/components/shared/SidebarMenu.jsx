import { Home,CardMembership } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom';
import { BsFillPinAngleFill } from 'react-icons/bs';
import { FaQuora } from "react-icons/fa";
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import { TbCategory2 } from "react-icons/tb";
import { GrTemplate } from "react-icons/gr";
import { MdPrivacyTip } from "react-icons/md";



const NavMenu = ({ children, to, Icon }) => {
    return <NavLink to={to} className={({ isActive }) => `text-sm flex gap-x-2 leading-none items-center py-3 px-3 ${isActive && 'bg-[#f2f2f2] font-medium text-[#853095]'} duration-300 hover:bg-[#f2f2f2] rounded-l-lg`}>
        <Icon className='!w-5 !h-5' />
        <span className='mt-1'>{children}</span>
    </NavLink>
}

const SidebarMenu = () => {

    const navLinks = [
        {
            name: 'Dashboard',
            to: '/',
            Icon: Home
        },
        {
            name: 'Static Pages',
            to: '/static-pages',
            Icon: MdPrivacyTip
        },
        {
            name: 'Users',
            to: 'users',
            Icon: PeopleIcon
        },
        {
            name: 'Plans',
            to: '/plans',
            Icon: CardMembership
        },
        // {
        //     name: 'Blogs',
        //     to: '/blogs',
        //     Icon: BsFillPinAngleFill
        // },
        {
            name: 'Faqs',
            to: '/faqs',
            Icon: FaQuora
        },
        {
            name: 'Categories',
            to: '/categories',
            Icon: TbCategory2
        },
        {
            name: 'Templates',
            to: '/templates',
            Icon: GrTemplate
        },
         {
            name: 'Settings',
            to: '/settings',
            Icon: SettingsIcon
        },
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
