"use client"
import Link from "next/link";
import { useState } from "react";

const menuData = [
  { title: 'General', href: '#' },
  {
    title: 'Teams',
    subMenu: [
      { title: 'Banned Users', href: '#' },
      { title: 'Calendar', href: '#' },
    ],
  },
  { title: 'Billing', href: '#' },
  { title: 'Invoices', href: '#' },
  {
    title: 'Account',
    subMenu: [
      { title: 'Details', href: '#' },
      { title: 'Security', href: '#' },
      { title: 'Logout', href: '#' },
    ],
  },
];

const userData = {
  name: 'Eric Frusciante',
  email: 'eric@frusciante.com',
  profileImage:
    'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
};
 const SideMenu = ({  }) => {
const [open, setOpen] = useState(false)
  return (
    <div className="flex h-screen flex-col w-80 border-r justify-between bg-[#f4f7f6] sticky top-0">
    <div className="px-4 py-6 relative">
      <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
        Logo
      </span>

      <ul className="mt-6 space-y-1">
        {menuData.map((menuItem, index) => (
          <li key={index}>
            {menuItem.subMenu ? (
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium">{menuItem.title}</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  {menuItem.subMenu.map((subMenuItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subMenuItem.href}
                        className="block menu_side rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        {subMenuItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link
                href={menuItem.href}
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                {menuItem.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>

    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <Link href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt=""
          src={userData.profileImage}
          className="size-10 rounded-full object-cover"
        />
        <div>
          <p className="text-xs">
            <strong className="block font-medium">{userData.name}</strong>
            <span>{userData.email}</span>
          </p>
        </div>
      </Link>
    </div>
  </div>

  );
};
export default SideMenu