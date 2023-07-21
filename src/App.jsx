import { useEffect, useState } from 'react'
import { Auth } from './components/auth'
import { db,auth,storge } from './config/firebase'
import { getDocs,collection,addDoc,deleteDoc,doc,updateDoc } from 'firebase/firestore'

import './App.css'
import { ref,uploadBytesResumable } from 'firebase/storage'

function App(){
  const moviesCollectionref=collection(db,"Movies")
  const [movieList, setMovieList] = useState([])
  const [newMovieTitle,setNewMovieTitle]=useState("")
  const [newMovieRelease,setNewMovieRelease]=useState(0)
  const [isNewMovieOscar,setIsNewMovieOscar]=useState(false)
  const[updateTitle,setUpdatedTitle]=useState("")
  const[file,setFile]=useState("")



  const deleteMovie=async(movie_id)=>{
    const movieDoc=doc(db,"Movies",movie_id)
    await deleteDoc(movieDoc)

  }
  const UpdateTitle=async(movie_id)=>{
    const movieDoc=doc(db,"Movies",movie_id)
    await updateDoc(movieDoc,{title:updateTitle})

  }
  
  useEffect(()=>{
    
    const getMovieList=async()=>{
      try{
      const data =await getDocs(moviesCollectionref)
      const dataWeWant= data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      setMovieList(dataWeWant)
      }
      catch(err){
        console.error(err);
      }
    
  }
   
    getMovieList()

    })
    const content=movieList.map((movie)=>{
     return <div>
        <h1 style={{color:movie.RecivedAnOscar ? "green":"red"}}>{movie.title}</h1>
        <p>{movie.ReleaseDate}</p>
        <button onClick={()=>deleteMovie(movie.id)}>Delete movie</button>
        <input type="text" placeholder='new title' onChange={(e)=>setUpdatedTitle(e.target.value)}/>
        <button onClick={()=>UpdateTitle(movie.id)}>Update</button>
      </div>
    })
    const handleSubmitNewMovie=async()=>{
await addDoc(moviesCollectionref,{
  title:newMovieTitle,
  ReleaseDate:newMovieRelease,
  RecivedAnOscar:isNewMovieOscar,
  userId:auth?.currentUser?.uid


})
    }
    const handleUpload=async()=>{
      console.log(file);
      if(!file) return;
      const fileFolder=ref(storge,`Upload/${file.name}`)
      await uploadBytesResumable(fileFolder,file)
    
    }
  
  
  return (
    <div>

   <Auth />
   <div>
    <input type="text" name="" id="" placeholder='Movie title'onChange={(e)=>{setNewMovieTitle(e.target.value)}}/>
    <input type="date" name="" id="" placeholder='Movie Relase date' onChange={(e)=>{setNewMovieRelease(e.target.value)}}/>
    <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>{setIsNewMovieOscar(e.target.checked)}}/>
    <label >Recived an oscar</label>
    <button onClick={handleSubmitNewMovie}>Submit</button>

   </div>
   {content}
   <div>
    <input type="file"  onChange={(e)=>setFile(e.target.files[0])}/>
    <button onClick={handleUpload}>Upload file</button>
   </div>
    </div>
  )
}

export default App
