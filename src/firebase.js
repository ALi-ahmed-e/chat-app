import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC6rd368lyUoxccODQzhH6ef1fqiN_I9Ek",
    authDomain: "chat-app-3476a.firebaseapp.com",
    projectId: "chat-app-3476a",
    storageBucket: "chat-app-3476a.appspot.com",
    messagingSenderId: "272935409218",
    appId: "1:272935409218:web:7f4f9158fccbb22603ffdb"
  };





  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
  export const storage = getStorage(app);
  export const db = getFirestore(app);
  