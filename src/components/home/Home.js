import React from 'react'
import SideBar from '../sidebar/SideBar';
import { Outlet } from 'react-router-dom'
function Home() {
    return (
        <div className=' overflow-hidden'>
            <SideBar />
            <div style={{direction:'rtl'}}>
              <Outlet />  
            </div>
            
        </div>
    )
}

export default Home;