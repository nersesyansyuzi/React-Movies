import { initializeApp } from "firebase/app";
import {getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth"
import {getFirestore,setDoc,doc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAfbeLyt6pPaUM62yJdb7MWnApwr_Zp4Wk",
  authDomain: "movie-33345.firebaseapp.com",
  projectId: "movie-33345",
  storageBucket: "movie-33345.appspot.com",
  messagingSenderId: "980645595340",
  appId: "1:980645595340:web:5e3ee08a2152ebcb501a69",
  measurementId: "G-RFV2PFNNPX"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)

export const createUser= async (auth,email,password)=>{
    const user=await createUserWithEmailAndPassword(auth,email,password)
    setDoc(doc(db,"favoritesMovie",email),{
        favorite:[]
    })
}


export const signinUser= async (auth,email,password)=>{
    const user=await signInWithEmailAndPassword(auth,email,password)
    return user
}

export const resetPassword= async (auth,email)=>{
    const user=await sendPasswordResetEmail(auth,email)
}


