import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    return (
        <div className=' overflow-hidden'>
            <div style={{ direction: 'rtl' }}>
                <Outlet />
                <h3 className=' text-white text-xl mt-40 underline cursor-pointer hover:text-blue-200' onClick={()=>navigate('/Addfriend')}> ! start chatting now</h3>
            </div>
      
        </div>
    )
}

export default Home;