import React, { useState } from 'react'
import './Signup.scss'
import user_icon from './person.png'
import email_icon from './email.png'
import password_icon from './password.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Signup = () => {
  const navigate=useNavigate()
  const email=localStorage.getItem("email")
  // console.log(email);
  
  const[regData,setReg]=useState({
    email,username:"",password:"",cpassword:""
  })
  const handleChange=(e)=>{
    setReg((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  console.log(regData);
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log("kk");
    const res=await axios.post("http://localhost:3001/api/signup",regData)
    console.log(res);
    if(res.status==201){
      localStorage.removeItem("email")
      alert(res.data.msg)
      navigate('/signin')
    }
    else{
      alert("Something went wrong...!")
    }
    

    // localStorage.setItem("email",email)
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" id='username' name='username'onChange={handleChange} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='password' name='password' onChange={handleChange} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='cpassword' name='cpassword' onChange={handleChange} />
        </div>

      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit} >Register</div>

      </div>
     </div>
  )
}

export default Signup