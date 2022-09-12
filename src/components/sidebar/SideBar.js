import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import Chats from '../chats/Chats'
import { onAuthStateChanged } from 'firebase/auth'
function SideBar() {
    const [sidebar, setsidebar] = useState('-100');
    const navigate = useNavigate()
    const [userdata, setuserdata] = useState();
    const [prof, setprof] = useState();






    useEffect(() => {
        setprof(<>  <div className=' bg-slate-500 animate-pulse w-[40px] h-[40px] rounded-full'></div>
            <div className=' bg-slate-500 h-3 w-16 animate-pulse ml-1'></div>
        </>)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                setuserdata(user)
                setprof(<><img src={user.photoURL} className='w-[40px] h-[40px] rounded-full mr-3' alt="" />
                    <span className='text-md text-white'>{user.displayName}</span>
                </>)
            } else {

            }
        });

    }, []);


    const swtchsidebar = () => {
        if (sidebar == '0') {
            setsidebar('-100')
 
        } else {
            setsidebar('0')

        }
    }



    return (



        <div className={` z-50 h-[100vh] w-[260px] bg-slate-500 sm:translate-x-[0%] transition-all duration-200 translate-x-[${sidebar}%] fixed left-0 shadow-md shadow-black`}>
            <div className=' w-full h-12 flex items-center'>
                <span onClick={() => navigate('/')} className='bg-slate-800 py-[5px] px-[10px] rounded-md ml-3 cursor-pointer'><h4 className='text-green-400 text-xl'>TM</h4></span>

                <i onClick={() => swtchsidebar()} className="fa-solid fa-bars bg-slate-200 shadow-lg py-1 px-2 rounded-md relative left-[201px] hover:bg-slate-400 transition-colors block sm:hidden"></i>
            </div>


            <div className='h-[87vh] w-full bg-white overflow-scroll'>



                <Chats />




            </div>


            <div className=' w-[260px] h-[52px] bg-indigo-700 items-center flex justify-center'>

                <div className='flex items-center justify-center w-[50%]' onClick={() => navigate('/settings')}>
                    {prof}
                </div>
            </div>
        </div>


    )
}

export default SideBar