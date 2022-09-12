import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { collection, where, query, getDocs, arrayUnion, doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { chataction } from '../../store/reducers/chatreducer'

function Chats() {
    const dispatch = useDispatch()
    const [people, setPeople] = useState();
    const [friends, setfriends] = useState([]);
    const [value, setvalue] = useState();
    const userdata = JSON.parse(localStorage.getItem('user'))
    const [smode, setsmode] = useState('name');
    const [glow, setglow] = useState();
    const [glow2, setglow2] = useState();
    const navigate = useNavigate()
    const si = useRef()
    const { chatid } = chataction
    useEffect(() => {

        if (smode == 'name') {
            setglow('glow')
            setglow2('')
        } else {
            setglow2('glow')
            setglow('')
        }
    }, [smode]);


    const fetchfriens = async () => {
        if (userdata) {

            setPeople(<>
                <div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                    <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                    <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
                </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
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
    useEffect(() => {

        fetchfriens()


    }, []);



    const sby = (mode) => {
        setsmode(mode)
    }



    const searchpeople = async (e) => {
        e.preventDefault()
        setPeople(<>
            <div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div><div className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800  shadow-sm  hover:text-white transition-colors'>
                <div className='w-[40px] h-[40px] rounded-full ml-3 bg-slate-500 animate-pulse'></div>
                <span className='ml-2 w-[50px] h-[10px] bg-slate-500 animate-pulse'></span>
            </div></>)
        let list = []
        if (smode == 'name') {


            if (value) {

                const q = query(collection(db, "users"), where("name", "==", value));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    list.push(doc.data())

                })
                setPeople('')
                setfriends(list)
                setvalue('')
            }
        } else {
            const q = query(collection(db, "users"), where("id", "==", value));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                list.push(doc.data())

            })
            setPeople('')
            setfriends(list)
            setvalue('')
        }
    }

    const addfriend = async (fid) => {
        const meRef = doc(db, "users", userdata.uid);

        await updateDoc(meRef, {
            friends: arrayUnion(fid)
        })
        const himRef = doc(db, "users", fid);

        await updateDoc(himRef, {
            friends: arrayUnion(userdata.uid)
        })
        si.current.value = ''
        fetchfriens()
    }


    const removefriend = async (fid) => {
        const meRef = doc(db, "users", userdata.uid);

        await updateDoc(meRef, {
            friends: arrayRemove(fid)
        })
        const himRef = doc(db, "users", fid);

        await updateDoc(himRef, {
            friends: arrayRemove(userdata.uid)
        })
        fetchfriens()
    }

    return (
        <div>
            <form onSubmit={(e) => searchpeople(e)}>
                <span className='flex justify-around items-center  mt-2'>
                    <input ref={si} className=' bg-sky-200 py-2 px-2 rounded-md outline-none' type="text" onChange={(e) => setvalue(e.target.value)} placeholder='search for friends...' />
                    <button onClick={searchpeople} className=' transition-all bg-teal-400 text-white py-2 px-3 rounded-lg hover:bg-teal-600'><i className="fa-solid fa-magnifying-glass"></i></button>
                </span>
            </form>
            <span>
                <button className={`text-sm bg-emerald-500 m-1 py-2 px-3 rounded-lg text-white hover:bg-emerald-600 ${glow}`} id='name' onClick={(e) => sby(e.target.id)}>Search by name</button>
                <button className={`text-sm bg-emerald-500 m-1 py-2 px-3 rounded-lg text-white hover:bg-emerald-600  ${glow2}`} id='id' onClick={(e) => sby(e.target.id)}>Search by id</button>
            </span>
            {friends.map(e => <div key={Math.random()} onClick={() => {
                const action = chatid(e.uid)
                dispatch(action)
                sessionStorage.setItem('chatid', e.uid)
                navigate('chatwindow')
            }} className='w-full  h-[50px] flex items-center my-4 bg-slate-300 rounded-r-md text-gray-800 hover:bg-slate-400 shadow-sm  hover:text-white transition-colors justify-between cursor-pointer'>
                <div className='flex items-center'><img src={e.image} className='w-[40px] h-[40px] rounded-full ml-3' alt="" />
                    <span className=' ml-2'>{e.name}</span></div>
                {e.uid != userdata.uid ? e.friends.includes(userdata.uid) ? <button className=' bg-green-500 mr-4 text-white px-2 rounded-md hover:bg-green-800 h-6 text-xs' >friends</button> : <button className=' bg-indigo-700 mr-4 text-white px-2 rounded-md hover:bg-indigo-800' onClick={() => addfriend(e.uid)}>add</button> : ''}
            </div>)}



            {people}









        </div>
    )
}

export default Chats