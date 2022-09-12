import React, { useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
function Signup() {
    const { googleSignIn, User } = UserAuth()
    const navigate = useNavigate()

    const signup = async () => {

        try {
            await googleSignIn()





        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(() => {
        if (User) {
            if (User.uid) {

             navigate('/')
        }}
    }, [User]);



    return (
        <div>
            <div className='container bg-slate-300 w-96 mx-auto my-10 h-80 rounded-md'>
                <button className='bg-indigo-500 py-2 px-3 rounded-md text-white hover:bg-indigo-700 my-[30%]'
                    onClick={() => signup()}>signin with google <i className="fa-brands fa-google"></i></button>

            </div>


        </div>
    )
}

export default Signup