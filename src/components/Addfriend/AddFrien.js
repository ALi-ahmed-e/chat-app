import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { collection, where, query, getDocs, arrayUnion, doc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { chataction } from '../../store/reducers/chatreducer'

function AddFrien() {
    // const dispatch = useDispatch()
    const [people, setPeople] = useState();
    const [friends, setfriends] = useState([]);
    const [value, setvalue] = useState();

    const userdata = JSON.parse(localStorage.getItem('user'))
    const [smode, setsmode] = useState('name');
    const [glow, setglow] = useState();
    const [glow2, setglow2] = useState();
    const navigate = useNavigate()
    const si = useRef()
    // const { chatid } = chataction
     const [nousers, setnousers] = useState('');


    useEffect(() => {

        if (smode == 'name') {
            setglow('glow')
            setglow2('')
        } else {
            setglow2('glow')
            setglow('')
        }
    }, [smode]);






    const sby = (mode) => {
        setsmode(mode)
    }



    const searchpeople = async (e) => {
        e.preventDefault()
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
        let list = []
        if (value) {
            if (smode == 'name') {




                const q = query(collection(db, "users"), where("name", "==", value));

                const querySnapshot = await getDocs(q);
                if (querySnapshot.docs != '') {
                    querySnapshot.forEach((doc) => {

                        list.push(doc.data())

                    })
                    setPeople('')
                    setfriends(list)
                    setvalue('')
                } else {
                    setPeople()
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

        } else {

            setPeople('')
            setnousers(<div></div>)


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
        navigate('/settings')
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
        si.current.value = ''
        navigate('/settings')
    }






    return (
        <div className='   h-screen w-fafaf'>
            <form onSubmit={(e) => searchpeople(e)}>
                <span className='flex justify-center items-center mx-auto  mt-2 w-[90%]'>
                    <input ref={si} className=' bg-slate-700 py-1 h-8 px-2 rounded-l-md mt-2 text-white outline-none w-[100%]' type="text" onChange={(e) => setvalue(e.target.value)} placeholder='search for friends...' />
                    <div className='  text-white h-8 mt-2  bg-slate-700 flex items-center px-2 rounded-r-md'>
                        {value ? <i className="fa-solid fa-xmark cursor-pointer" onClick={() => {
                            si.current.value = ''
                            setvalue()
                        }}></i> : <i className="fa-solid fa-magnifying-glass cursor-pointer" onClick={searchpeople}></i>}
                    </div>
                </span>
            </form>






            <span>
                <button className={`text-sm bg-emerald-500 m-1 py-2 px-3 rounded-lg text-white hover:bg-emerald-600 ${glow}`} id='name' onClick={(e) => sby(e.target.id)}>Search by name</button>
                <button className={`text-sm bg-emerald-500 m-1 py-2 px-3 rounded-lg text-white hover:bg-emerald-600  ${glow2}`} id='id' onClick={(e) => sby(e.target.id)}>Search by id</button>
            </span>










            {friends.map(e => <div key={Math.random()}  className={`w-[95%]  h-[50px] mx-auto flex bg-[#1d2835] items-center my-4 rounded-md text-white hover:bg-slate-600 shadow-sm  hover:text-white transition-colors justify-between cursor-pointer`}>
                <div className='flex items-center'><img src={e.image} className='w-[40px] h-[40px] rounded-full ml-3' alt="" />
                    <span className=' ml-2'>{e.name}</span></div>
                {e.uid != userdata.uid ? e.friends.includes(userdata.uid) ? <button className=' bg-green-600 mr-4 text-white px-2 rounded-sm hover:bg-green-700 transition-all' onClick={() => removefriend(e.uid)}>Remove</button> : <button className=' bg-indigo-700 mr-4 text-white px-2 rounded-sm hover:bg-indigo-800' onClick={() => addfriend(e.uid)}>Add</button> : <button className=' bg-sky-700 mr-4 text-white px-2 rounded-sm hover:bg-sky-800' >You</button>}
            </div>)}



            {people}









        </div>
    )
}

export default AddFrien