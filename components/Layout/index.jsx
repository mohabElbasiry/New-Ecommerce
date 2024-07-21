import React from 'react'
import SideMenu from './sidemenu'

export default function CustomLayout({children}) {
  return (
    <div className='flex w-full'>
    <SideMenu />
    <div className='flex-1'>
      {children}</div>
    </div>
  )
}
