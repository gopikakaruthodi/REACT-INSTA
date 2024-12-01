import React, { useEffect, useState } from 'react'
import './Edit.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
  const token=localStorage.getItem("token")
  const navigate=useNavigate()

  const[updateData,setUpdateData]=useState({})
  const[proBool,setProBool]=useState(false)

  useEffect(()=>{
      fetchData()
  },[])

  const fetchData= async()=>{
      const res= await axios.get("http://localhost:3001/api/getuserdata",{headers:{"authorization":`Bearer ${token}`}})
      res.data.profileData?setProBool(true):setProBool(false)
      
      // console.log(res);
      if(res.status==200){
        // console.log(res.data);
        if(res.data.profileData){
          const data={username:res.data.userData.username,email:res.data.userData.email,bio:res.data.profileData.bio,phone:res.data.profileData.phone,gender:res.data.profileData.gender,profile:res.data.profileData.profile}
          setUpdateData(data)
        }
        else{
          setUpdateData(res.data.userData)
        }
      }
  }

 const handleChange=(e)=>{
  // console.log(e.target.value);
  // console.log(e.target.name);
    setUpdateData((pre)=>({...pre,[e.target.name]:e.target.value}))
 }
 const handleSubmit=async(e)=>{
   try {
    e.preventDefault()
    const res=await axios.post("http://localhost:3001/api/edituserdata",updateData,{headers:{"authorization":`Bearer ${token}`}})
    console.log(res);
    if(res.status==201){
      alert(res.data.msg)
      navigate('/profile')
    }
    else if(res.status==403){
      alert(res.data.msg)
    }
    else{
      alert("Something went wrong")
    }
    
   } catch (error) {
    console.log(error);
    alert(error.response.data.msg)
   }
  
 }
     // profile
     const handleFile=async(e)=>{
      console.log(e.target.files[0]);
      const profile=await convertBase64(e.target.files[0])
      console.log(profile);
      setUpdateData((pre)=>({...pre,profile:profile}))
      
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

//  console.log(proBool);
 console.log(updateData);

  return ( 
    <>
    <div className="body">
        <div className="cntner">
            <h2>Edit Information</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={updateData.username} placeholder="username" onChange={handleChange} />
                <label htmlFor="bio">Bio:</label>
                <input type="text" id="bio" name="bio" value={proBool?updateData.bio:null} placeholder="Edit here..." onChange={handleChange} />
                <label htmlFor="gender"  >Gender:</label>
                <div className="gndr">
                    <input type="radio" checked={updateData.gender==="Male"} name="gender" value="Male"  onChange={handleChange} />Male
                    <input type="radio" checked={updateData.gender==="Female"} name="gender" value="Female" onChange={handleChange} />Female
                    <input type="radio" checked={updateData.gender==="Other"} name="gender" value="Other" onChange={handleChange} />Other
                </div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={updateData.email} placeholder="asd@gmail.com" onChange={handleChange} />
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={proBool?updateData.phone:null} placeholder="Edit here..." onChange={handleChange} />

                <label htmlFor="phone">Profile:</label>
                <div className='usr-img'>
                <input type="file" id="profile" name="profile" onChange={handleFile}  />
                <div id="pro"><img src={updateData.profile} alt="User Image" /></div>
                </div>

                <button type="submit" onClick={handleSubmit}>{proBool?'Edit':'Create'}</button>
            </form>
            <div className="footer">Please ensure all information is correct.</div>
        </div>
    </div>
    </>
  )
}

export default Edit