import { useContext, createContext, useEffect, useState } from 'react'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    deleteUser
} from "firebase/auth";
import { setDoc, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase';



const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {


    const [User, setUser] = useState({});

    const googleSignIn = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(({ user }) => {
            setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                image: user.photoURL,
                friends: [],
                mode: 'light',
                uid: user.uid,
                id: user.uid.slice(0,9)

            })

        }).then(() => {
            localStorage.setItem('user', JSON.stringify(User))
            window.location.reload()

        })
    };


    const logout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('user')
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        });
    }
    const deleteacc = () => {
        deleteUser(User).then(() => {
            deleteDoc(doc(db, "users", User.uid)).then(() => {
                localStorage.removeItem('user')
                window.location.reload()
            })
        }).catch((error) => {
            console.log(error)
        });
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            return () => {
                unsubscribe()
            }
        })

    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logout, User, deleteacc }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};