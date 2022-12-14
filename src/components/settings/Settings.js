import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore'
function Settings() {
    const [userdata, setuserdata] = useState();
    const [img, setImg] = useState();
    const [btnsave, setbtnsave] = useState('save');
    const { logout, deleteacc } = UserAuth()
    const et = useRef()
    const [pls, setpls] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                et.current.value = user.displayName
                setuserdata(user)
                setImg(user.photoURL)
                
            } else {

            }
        });

    }, []);





    const setimg = async () => {
        if (et.current.value) {
            console.log(et.current.value)
            updateProfile(auth.currentUser, {
                displayName: et.current.value,
                photoURL: img,

            }).then((user) => {
                const washingtonRef = doc(db, "users", userdata.uid);
                updateDoc(washingtonRef, {
                    name: et.current.value,
                    image: img
                    
                }).then(() => {
                    localStorage.setItem('user', JSON.stringify(auth.currentUser))
                    setuserdata(auth.currentUser)
                    setpls('')
                    window.location.reload()
                })


            }).catch((error) => {
                console.log(error)
            })
        }else{
            console.log(et.current.value)
        }
    }




    const uploadImg = async (file) => {
        setbtnsave(<i className="fa-solid fa-circle-notch animate-spin"></i>)

        // /** @type {any} */
        const metadata = {
            contentType: file.type
        };

        const storageRef = ref(storage, 'images/' + `${Date()}${file.name}`);
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
                    console.log('File available at', downloadURL);
                    setbtnsave('save')
                    setImg(downloadURL)
                });
            }
        );


    }


    const logut = () => {

        logout()


    }

    return (
        <div className='h-[100vh] w-fsfsg  overflow-hidden  text-white' >

            <div className=' bg-slate-900 w-[96%] h-96 mx-auto my-32 rounded-xl max-w-[700px] sm:w-[90%]  '>
                <div className='  bg-[#0c0c0c] h-20 w-full rounded-t-xl flex items-center justify-center'>


                    <div className=' flex items-center justify-center mt-20 '>


                        <label htmlFor="upload-photo" className=' bg-slate-600/50 absolute w-[97px] h-[97px] rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all'>
                            <div className=''>
                                <i className="fa-solid fa-pen-to-square text-2xl"></i>
                                <input type="file" className=' hidden' name="photo" id="upload-photo" onChange={(e) => uploadImg(e.target.files[0])} />

                            </div>
                        </label>


                        <img src={img} alt="" className=' border-slate-900 border-8 mx-auto my-5 rounded-full h-[112px] w-[112px] inline' />

                    </div>


                </div>
                <input type="text" className={`text-center bg-transparent border-b-2 border-white outline-none focus:border-sky-400 mt-20`} ref={et} onChange={() => setpls('animate-bounce')} />
                <h1>iD: {userdata&&userdata.uid.slice(0,9)}</h1>
                <button className={` ${pls} bg-indigo-500 py-1 px-3 rounded-md text-white hover:bg-indigo-700 block mx-auto my-5`} onClick={() => setimg()}>{btnsave}</button>
                <button className=' bg-red-600 py-1 px-3 rounded-md text-white hover:bg-red-700 block mx-auto my-5' onClick={() => logut()}>logout</button>
                <button className=' bg-red-600 py-1 px-3 rounded-md text-white hover:bg-red-700 block mx-auto my-5' onClick={() => deleteacc()}>Delete Account</button>
            </div>

        </div>
    )
}

export default Settings