import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from  "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from"firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBwAimcWCU_o54BOdY3t_xDMv_T0BIf-sw",
  authDomain: "fir-learning-a1803.firebaseapp.com",
  projectId: "fir-learning-a1803",
  storageBucket: "fir-learning-a1803.appspot.com",
  messagingSenderId: "853385981676",
  appId: "1:853385981676:web:6d637ea48ebee967cdbfc9"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider
export const db =getFirestore(app)
export const storge= getStorage(app)