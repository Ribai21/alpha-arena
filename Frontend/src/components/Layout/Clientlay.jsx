import React from 'react'
import Sidebar from '../Client/CSidebar'
import { Outlet } from 'react-router-dom'

const Clientlay = () => {
  return (
    <div className='flex w-full h-screen'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Clientlay