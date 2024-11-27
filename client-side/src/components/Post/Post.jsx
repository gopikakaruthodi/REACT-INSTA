import React, { useState } from 'react'
import './Post.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Post = () => {
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const[description,setDescription]=useState("")
    const [postedTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [postedDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [images,setImages]=useState([])

    const handleChange=(e)=>{
        setDescription(e.target.value)
    }

    const handleFile=async(e)=>{
        const arr=Object.values(e.target.files)
        console.log(arr);
        arr.map(async(img)=>{
          const image=await convertBase64(img)
        //   console.log(image);
          setImages((pre)=>([...pre,image]))
        })
    }
    function convertBase64(file){
        return new Promise((resolve,reject)=>{
            const fileReader=new FileReader()
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror=(error)=>{
                reject(error)
            }
        })
    }
    // console.log(description);
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const res= await axios.post("http://localhost:3001/api/addpost",{description,images,postedTime,postedDate},{headers:{"authorization":`Bearer ${token}`}})
        // console.log(res);
        if(res.status==201){
            alert(res.data.msg)
            navigate('/profile')
        }
        else{
            alert(res.data.msg)
        }
    }


  return (
    <div className='Post'>
      <h2>Add Post</h2>
      <form >
      <div>
          <label>Photo:</label>
          <input type="file" onChange={handleFile} accept="image/*" multiple />
           <img src='' alt="Profile" style={{ width: '100px', height: '100px', marginTop: '10px',objectFit:'cover' }} />
        </div>
        <div>
          <label>Description:</label>
          <textarea  name='description' onChange={handleChange}  placeholder="Description" />
        </div>
        
        <button type="submit" onClick={handleSubmit} >Add Post</button>
      </form>
    </div>
  )
}

export default Post