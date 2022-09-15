import React from 'react'
import SideBar from '../sidebar/SideBar';
import { Outlet } from 'react-router-dom'
import Notification from '../notifiaction/Notification';
function Home() {
    return (
        <div className=' overflow-hidden'>
            <SideBar />
            <div style={{direction:'rtl'}}>
              <Outlet />  
            </div>
            <Notification />
        </div>
    )
}

export default Home;