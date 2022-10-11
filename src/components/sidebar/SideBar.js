import React, {useEffect, useState, useRef } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux'
import { chataction } from '../../store/reducers/chatreducer'





function SideBar() {
    const [sidebar, setsidebar] = useState('hide');
    const navigate = useNavigate()
    const [prof, setprof] = useState()


    const dispatch = useDispatch()
    const [people, setPeople] = useState();
    const [friends, setfriends] = useState([]);
    const userdata = JSON.parse(localStorage.getItem('user'))
    const { chatid } = chataction





    useEffect(() => {
        setprof(<>  <div className=' bg-slate-500 animate-pulse w-[40px] h-[40px] rounded-full'></div>
            <div className=' bg-slate-500 h-3 w-16 animate-pulse ml-1'></div>
        </>)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                // setuserdata(user)
                setprof(<><img src={user.photoURL} className='w-[40px] h-[40px] rounded-full mr-3' alt="" />
                    <span className='text-md text-white'>{user.displayName}</span>
                </>)
            } else {

            }
        });

    }, []);


    const swtchsidebar = () => {
        if (sidebar == 'show') {
            setsidebar('hide')

        } else {
            setsidebar('show')

        }
    }



    const fetchfriens = async () => {
        if (userdata) {

            setPeople(<>
                <div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='mx-auto  h-[50px] flex items-center my-4 bg-slate-700 rounded-md w-[95%] text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div></>)
            const citiesRef = collection(db, "users")
            let lst = []
            const q = query(citiesRef, where('friends', 'array-contains', userdata.uid));

            const rss = await getDocs(q)
            rss.forEach(e => {
                lst.push(e.data())

            })

            setfriends(lst)
            setPeople()
        }
    }





    return (





        <div>
            <div className='fixed top-0 bottom-0 z-50 h-full bg-slate-900 w-[60px]' >

                <div onClick={() => setsidebar('hide')} className='  shadow-md shadow-black bg-slate-700  h-12 w-12 flex items-center justify-center mx-auto my-2 rounded-full border-indigo-900 border-[2px]  cursor-pointer'>
                    <h4 className='text-green-400 text-lg font-bold'>TM</h4>
                </div>


                <div className=' w-[70%] h-[2px] mx-auto bg-slate-700'></div>


                <NavLink to='Addfriend' onClick={() => setsidebar('hide')} className='shadow-md shadow-black text-green-500 bg-slate-700  h-12 w-12 flex items-center justify-center mx-auto my-2 rounded-full cursor-pointer  hover:rounded-lg trans-4 hover:bg-green-700 hover:text-white'>
                    <i className="fa-solid fa-user-plus  text-lg"></i>
                </NavLink>


                <div onClick={() => {
                    swtchsidebar()
                    fetchfriens()
                }} className={`shadow-md shadow-black    h-12 w-12 flex items-center justify-center mx-auto my-2 rounded-full cursor-pointer  hover:rounded-lg trans-4 hover:bg-indigo-700 hover:text-white ${sidebar == 'show' ? 'bg-indigo-700 text-white':'bg-slate-700 text-green-600'} `}>
                    <i className="fa-solid fa-comments  text-lg"></i>
                </div>




                <div className=' w-[70%] h-[2px] mx-auto bg-slate-700'></div>



                <NavLink onClick={() => setsidebar('hide')} to='/settings' className='shadow-md shadow-black text-white bg-slate-700  h-12 w-12 flex items-center justify-center mx-auto my-2 rounded-full cursor-pointer  hover:rounded-lg trans-4 hover:bg-green-700 hover:text-white'>
                    <img src={userdata&&userdata.photoURL} alt="" className=' border-[1px] border-white w-7  h-7 rounded-lg' />
                    <span className=' absolute'>
                        <i className="fa-solid fa-gear  text-md mt-6 ml-4"></i>
                    </span>

                </NavLink>


            </div>


            <div className={` z-40 h-[100%] w-[200px] bg-slate-800  transition-all duration-200  fixed left-[60px] shadow-md shadow-black ${sidebar}`}  onClick={() => swtchsidebar()}>


                {friends.map(e => <div key={Math.random()} onClick={(event) => {
                    const action = chatid(e.uid)
                    dispatch(action)
                    sessionStorage.setItem('chatid', e.uid)
                    navigate('/chatwindow')
                }} className={`w-[95%] bg-[#253141]  h-[50px] mx-auto flex items-center my-4 rounded-md text-white hover:bg-slate-600 shadow-sm  hover:text-white transition-colors justify-between cursor-pointer`}>
                    <div className='flex items-center'><img src={e.image} className='w-[40px] h-[40px] rounded-full ml-3' alt="" />
                        <span className=' ml-2'>{e.name}</span></div>
                </div>)}

                {people}
            </div>







        </div>




    )
}

export default SideBar