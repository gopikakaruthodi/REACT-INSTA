import React, { useState } from 'react'
import './Email.css'
import email_icon from './email.png'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Email = () => {
  const[email,setEmail]=useState("")

  const handleChange=(e)=>{
    console.log(e.target.value);
    setEmail(e.target.value)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log("kk");
    const res=await axios.post("http://localhost:3001/api/checkemail",{email})
    // console.log(res);
    if(res.status==200){
      localStorage.setItem("email",email)
      alert(res.data.msg)
    }
    else{
      alert("Something went wrong...!")
    }
  }
  return (
    <div className="container">
      <div className="header">
        <div className="text">Email Verification</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" id='email' name='email' onChange={handleChange} />
        </div>
      </div>
      <div className="submit-containers">
        <div className="submit" onClick={handleSubmit}>verify</div>
      </div>
     </div>
  )
}

export default Email