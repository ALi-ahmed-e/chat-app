import React, { useEffect, useRef, useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from '../../firebase';
import { useSelector } from 'react-redux'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase'


function ChatWindow() {
  const chatid = useSelector(state => state.chatidr)
  const [userdata, setuserdata] = useState();
  const [msg, setmsg] = useState();
  const mydata = JSON.parse(localStorage.getItem('user'))
  const [chatCode, setchatCode] = useState();
  const [chatCode2, setchatCode2] = useState();
  const [messages, setmessages] = useState([]);
  const mi = useRef()
  const [loading, setloading] = useState(<i className="fa-solid fa-photo-film text-lg"></i>);
  const [photo, setphoto] = useState();
  const [video, setvideo] = useState();
  const [type, settype] = useState();


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

    if (mi.current.value) {

      const d = new Date()
      const docRef = await addDoc(collection(db, "messages"), {
        msg:mi.current.value,
        time: d.toLocaleTimeString(),
        chatcode: chatCode,
        senderId: mydata.uid,
        reciverId: userdata.uid,
        timeStamp: serverTimestamp(),
        senderName: mydata.displayName,
        photo: photo ? photo : 'na',
        video: video ? video : 'na',
      }).then(() => {
        mi.current.value = ''
        fetchmsgs()
      setvideo()
      setphoto()
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



















  const uploadfile = (file) => {
    setloading(<i className="fa-solid fa-circle-notch animate-spin"></i>)
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.type
    };
    if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png" || file.type == "image/jpg") {
      settype('images')

    } else if (file.type == "video/mp4") {
      settype('videos')
    }

    const fileName = Date() + file.name

    const storageRef = ref(storage, `${type}/` + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png" || file.type == "image/jpg") {

            setphoto(downloadURL)
            setvideo()
          } else if (file.type == "video/mp4") {
            setvideo(downloadURL)
            setphoto()
          }
          setloading(<i className="fa-solid fa-photo-film text-lg"></i>)
        });
      }
    );
  }























  return (

    <div className=' w-fsfsg h-[100%] bg-black overflow-hidden fixed bottom-0'>

      <div className=' w-full h-[7.5%] bg-slate-500 flex items-center justify-start'>
        {userdata ? <><img src={userdata.image} alt="" className=' mr-3 w-[42px] h-[42px] rounded-full' /> <span className=' mr-3 text-white'>{userdata.name}</span></> : ''}
      </div>





      <div className='h-[85%] w-full bg-slate-200 overflow-y-scroll'>

        {messages && messages.map(e => e.senderId == mydata.uid ? <div key={Math.random()} className=' maxw w-fit pl-2 pr-2 pt-2 rounded-lg rounded-br-none mt-7 my-7 mr-3 bg-green-700 text-white'>

          <div>
            {e.photo != 'na' ? <img  src={e.photo} alt="" className=' rounded-md' /> : ''}
            {e.video != 'na' ? <video autoPlay={false} controls src={e.video} className=' rounded-md'></video> : ''}

          </div>

          {e.msg}

          <div className='text-5xs me'>
            {e.time.slice(0, 5)}{e.time.slice(8, 11)}

          </div>

        </div>
          : <div key={Math.random()} className=' direction-ltr'><div key={Math.random()} className=' maxw w-fit pl-2 pr-2 pt-2 rounded-lg rounded-bl-none mt-7 my-7 mr-3 bg-slate-600 text-white'>

            <div>
              {e.photo != 'na' ? <img src={e.photo} alt="" className=' rounded-md' /> : ''}
              {e.video != 'na' ? <video  controls src={e.video} className=' rounded-md'></video> : ''}

            </div>

            {e.msg}

            <div className='text-5xs him'>
              {e.time.slice(0, 5)}{e.time.slice(8, 11)}

            </div>

          </div></div>)}


      </div>




      <div className=' w-full h-[7.5%] bg-indigo-700 items-center flex justify-around'>

        <form onSubmit={(e) => sendmsg(e)} className='flex w-full justify-around items-center'>
          <button onClick={sendmsg} className=' bg-green-500  rounded-lg text-white hover:bg-green-600 h-10 w-10  flex items-center justify-center'><i className="fa-solid fa-paper-plane"></i></button>
          <span className=' w-[85%] flex items-center justify-center'>

            <label htmlFor="upload-photo" className=' bg-sky-100 h-[40px] px-3 flex items-center rounded-r-md cursor-pointer hover:bg-sky-200' >
              <div className=''>
                {loading}
                <input type="file" className=' hidden' name="photo" id="upload-photo" onChange={(e) => uploadfile(e.target.files[0])} />
              </div>
            </label>


            <input ref={mi}  type="text" className=' w-[90%] py-2 px-1 rounded-l-md bg-sky-100 outline-none text-center' placeholder='write a message' />
          </span>

        </form>
      </div>

    </div>


  )
}

export default ChatWindow