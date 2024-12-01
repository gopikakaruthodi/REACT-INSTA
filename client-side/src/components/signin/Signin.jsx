import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import email_icon from './email.png'
import password_icon from './password.png'
import './Signin.scss'
import axios from 'axios'

const Signin = () => {
  const navigate=useNavigate()
  const[loginData,setLogin]=useState({
    email:"",password:""
  })
  
  const handleChange=(e)=>{
    // console.log(e.target.name);
    // console.log(e.target.value);
    setLogin((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()

      const res=await axios.post("http://localhost:3001/api/signin",loginData)
      console.log(res);
      if(res.status==200){
        localStorage.setItem("token",res.data.token)
        alert(res.data.msg)
        navigate('/')
        
      }
      
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg)  
    }
    
  }
  

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" id='email' name='email' onChange={handleChange} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='password' name='password' onChange={handleChange} />
        </div>

      </div>
      <div className="submit-containers">
       <Link to={"/email"}> <div className="submit">Register</div></Link>
        <Link ><div className="submit" onClick={handleSubmit} >Login</div></Link>

      </div>
      <div><Link to={'/password'}><h4 className='head'> Forgot password </h4></Link></div>
     </div>
  )
}

export default Signin