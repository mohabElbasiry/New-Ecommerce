'use client';
import { cn } from '@/lib/utils';
import { ChevronsLeft, ChevronsRight, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import './index.css';
import { MenuList } from './menuiList';
const menuData = [
  { title: 'General', href: '#', Icon: <User size={24} /> },
  {
    title: 'Teams',
    subMenu: [
      { title: 'Banned Users', href: '#', Icon: <User size={24} /> },
      { title: 'Calendar', href: '#', Icon: <User size={24} /> },
      { title: 'Banned Users', href: '#', Icon: <User size={24} /> },
      { title: 'Calendar', href: '#', Icon: <User size={24} /> },
      { title: 'Banned Users', href: '#', Icon: <User size={24} /> },
      {
        title: 'Calendar',
        subMenu: [
          { title: 'Banned Users', href: '#', Icon: <User size={24} /> },
          { title: 'Calendar', href: '#', Icon: <User size={24} /> },
          {
            title: 'Banned Users',
            subMenu: [
              { title: 'Banned Users', href: '#', Icon: <User size={24} /> },
              { title: 'Calendar', href: '#', Icon: <User size={24} /> },
              { title: 'Banned Users', href: '#', Icon: <User size={24} /> },
            ],
          },
        ],
      },
    ],
    Icon: <User size={24} />,
  },
  { title: 'Billing', href: '#', Icon: <User size={24} /> },
  { title: 'Invoices', href: '#', Icon: <User size={24} /> },
  {
    title: 'Account',
    Icon: <User size={24} />,
    subMenu: [
      { title: 'Details', href: '#', Icon: <User size={24} /> },
      { title: 'Security', href: '#', Icon: <User size={24} /> },
      { title: 'Logout', href: '#', Icon: <User size={24} /> },
    ],
  },
];

const userData = {
  name: 'Eric Frusciante',
  email: 'eric@frusciante.com',
  profileImage:
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
};
const SideMenu = ({children}) => {
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  return (
  <div> 


<div className='flex'>
      
      <div
        className={cn(
          open ? 'w-80' : 'w-20',
          'transition-all duration-700 flex h-screen flex-col   justify-between   z-[30] sticky top-0',
        )}
      >
        <div className=" py-6 relative">
        
          <div  className='flex justify-between items-center px-3'>
          <span className="grid h-10
     w-fit  place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            Logo
          </span>
          <button
            type="button"
            onClick={toggleMenu}
            className=""
          >
            {open ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
          </div>
           <MenuList cn={cn} menu={menuData} open={open} />
        </div>
  
      
      </div>
  
  <div className='w-full'>
  <div className='header flex justify-between items-center px-1'>
      <div className='title'>
        Products
       </div>

       <div className='right flex items-center gap-1'>

      <div className='icon'>
       <img src='/sidemenu/se.png' width={40} height={40}/>
      </div>
      <div className='icon'>
       <img src='/sidemenu/plus.png' width={40} height={40}/>
      </div>
   

       <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <Link
            href="#"
            className="flex items-center gap-2   p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src={userData.profileImage}
              className="size-10 rounded-full object-cover"
            />
            <div
              className={cn(
                open ? 'w-auto opacity-100' : ' w-0 opacity-0 ',
                'overflow-hidden transition-all duration-300',
              )}
            >
              <p className="text-xs">
                <strong className="block font-medium">Welcom back</strong>
                <span> {userData.name}</span>
              </p>
            </div>
          </Link>
        </div>
       </div>
    </div>
      {children}
  </div>
      </div>
  </div>
  );
};
export default SideMenu;
