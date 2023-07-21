import { useState } from "react"
import {auth,googleProvider} from "../config/firebase"
import{createUserWithEmailAndPassword,signInWithPopup,signOut} from"firebase/auth"
export const Auth = ()=>{
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const singIn =async()=>{
  
  await createUserWithEmailAndPassword(auth,email,password)
 }
  
  const handleGoogleSingIn =async()=>{
  
  await signInWithPopup(auth,googleProvider)
 }
 const handleLogOut =async()=>{
  
  await signOut(auth)
 }

   
  

  
  return(
    <div>
      <input type="email" placeholder="E-mail"  onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password.." onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={singIn}>Sign in</button>
      <button onClick={handleGoogleSingIn}>sign in with google</button>
      <button onClick={handleLogOut}>logout</button>
    </div>
  )
  }

