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
const SideMenu = ({}) => {
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      className={cn(
        open ? 'w-80' : 'w-20',
        'transition-all duration-700 flex h-screen flex-col   justify-between   sticky top-0',
      )}
    >
      <div className=" py-6 relative">
        <button
          type="button"
          onClick={toggleMenu}
          className="absolute text-white top-1/4 -right-4 w-8 h-8 flex justify-center items-center  bg-gray-500 rounded-full"
        >
          {open ? <ChevronsLeft /> : <ChevronsRight />}
        </button>
        <span className="grid h-10 w-full place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          Logo
        </span>

        <ul className="mt-6 space-y-1">
          {menuData.map((menuItem, index) => (
            <li key={index}>
              {menuItem.subMenu ? (
                <details
                  className="group [&_summary::-webkit-details-marker]:hidden
               transition-all duration-700"
                >
                  <MenuList cn={cn} menu={menuItem.subMenu} open={open} />
                </details>
              ) : (
                <Link
                  href={menuItem.href}
                  className="flex gap-2 items-center  rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <div className="w-10 h-10   rounded-full flex justify-center items-center text-white">
                    {/* {menuItem.Icon} */}
                  </div>{' '}
                  <p
                    className={cn(
                      open ? 'block' : 'hidden',
                      'transition-all duration-700 delay-1000   truncate ...',
                    )}
                  >
                    {menuItem.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
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
              <strong className="block font-medium">{userData.name}</strong>
              <span> {userData.email}</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default SideMenu;
