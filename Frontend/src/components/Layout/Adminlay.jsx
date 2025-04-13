import React from 'react'
import Sidebar from '../Admin/Sidebar'
import { Outlet } from 'react-router-dom'

const Adminlay = () => {
  return (
    <div className='flex w-full h-screen'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Adminlay