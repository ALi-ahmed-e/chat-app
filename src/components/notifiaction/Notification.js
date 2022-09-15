import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

function Notification() {
    const [md, setmd] = useState();








    const fme = async () => {
        const q = query(collection(db, "messages"), where("reciverId", '==', JSON.parse(localStorage.getItem('user')).uid));

        onSnapshot(q, (querySnapshot) => {


            querySnapshot.forEach(e => {
                setmd(e.data())
            })








        });
    }



    useEffect(() => {
        fme()
        if (md) {
            console.log(md)
        }


    }, []);
    useEffect(() => {
        if (md) {
            console.log(md)
        }


    }, [md]);

    return (
        <>

        </>
    )
}

export default Notification