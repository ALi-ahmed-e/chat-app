import React, { useEffect, useRef, useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux'



function ChatWindow() {
  const chatid = useSelector(state => state.chatidr)
  const [userdata, setuserdata] = useState();
  const [msg, setmsg] = useState();
  const mydata = JSON.parse(localStorage.getItem('user'))
  const [chatCode, setchatCode] = useState();
  const [chatCode2, setchatCode2] = useState();
  const [messages, setmessages] = useState([]);
  const mi = useRef()




  const gett2data = async () => {
    const docRef = doc(db, "users", sessionStorage.getItem('chatid'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setuserdata(docSnap.data())
      setchatCode(docSnap.data().uid.slice(0, 9) + mydata.uid.slice(0, 9))
      setchatCode2(mydata.uid.slice(0, 9) + docSnap.data().uid.slice(0, 9))

    } else {

      console.log("No such document!");
    }
  }

  useEffect(() => {
    gett2data()

  }, [chatid])






  const sendmsg = async (e) => {
    e.preventDefault()

    if (msg) {

      const d = new Date()
      const docRef = await addDoc(collection(db, "messages"), {
        msg,
        time: d.toLocaleTimeString(),
        chatcode: chatCode,
        senderId: mydata.uid,
        reciverId: userdata.uid,
        timeStamp: serverTimestamp()
      }).then(() => {
        mi.current.value = ''
        fetchmsgs()
      })

    }

  }


  const fetchmsgs = async () => {

    let lst = []
    const q = query(collection(db, "messages")
      , orderBy('timeStamp')
      , where("chatcode", 'in', [chatCode, chatCode2]));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lst.push(doc.data())


    })
    setmessages(lst)

  }


  useEffect(() => {
    if (userdata) {
      fetchmsgs()
    }
  }, [userdata]);


  useEffect(() => {
    if (userdata) {
      const q = query(collection(db, "messages")
        , orderBy('timeStamp')
        , where("chatcode", 'in', [chatCode, chatCode2]));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const change = [];
        querySnapshot.forEach((doc) => {
          change.push(doc.data());
        });
        setmessages(change)

      });

    }
  }, [userdata]);


  return (
    <>
      <div className=' w-fsfsg h-[100vh] bg-black overflow-hidden'>

        <div className=' w-full h-[7%] bg-slate-500 flex items-center justify-start'>
          {userdata ? <><img src={userdata.image} alt="" className=' mr-3 w-[42px] h-[42px] rounded-full' /> <span className=' mr-3 text-white'>{userdata.name}</span></> : ''}
        </div>

        <div className='h-[85%] w-full bg-slate-200 overflow-y-scroll'>

          {messages && messages.map(e => e.senderId == mydata.uid ? <div key={Math.random()} className=' min-w-16 w-fit pl-4 pr-2 pt-2 rounded-lg rounded-tr-none mt-7 my-7 mr-3 bg-green-700 text-white'>{e.msg}  <div className='text-5xs me'>{e.time.slice(0, 5)}{e.time.slice(8, 11)}</div></div>
            : <div key={Math.random()} className=' direction-ltr'><div key={Math.random()} className=' min-w-16 w-fit pr-4 pl-2 pt-2 rounded-lg rounded-tl-none my-7  bg-slate-600 text-white'>{e.msg}   <div className='text-5xs him'>{e.time.slice(0, 5)}{e.time.slice(8, 11)}</div></div></div>)}


        </div>

        <div className=' w-full h-[8%] bg-indigo-700 items-center flex justify-around'>

          <form onSubmit={(e) => sendmsg(e)} className='flex w-full justify-around items-center'>
            <button onClick={sendmsg} className=' bg-green-500 py-2 px-1 rounded-lg text-white hover:bg-green-600 h-10 text-xs sm:text-base'>send <i className="fa-solid fa-paper-plane"></i></button>
            <input ref={mi} onChange={(e) => setmsg(e.target.value)} type="text" className=' w-[87%] py-2 px-1 rounded-md bg-sky-100 outline-none text-center' placeholder='write a message' />

          </form>
        </div>

      </div>
      <div className='  w-full bg-indigo-700 h-[0.3vh] fixed bottom-0'></div>
    </>
  )
}

export default ChatWindow