import React from 'react'
import SideBar from './SideBar'

const Layout = ({children}) => {
  return (
    <div className='flex'>
        <SideBar/>
        <main>{children}</main>
    </div>
  )
}

export default Layout