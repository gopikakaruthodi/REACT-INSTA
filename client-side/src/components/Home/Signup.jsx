import React from 'react'
import './Signup.scss'
import user_icon from './person.png'
import email_icon from './email.png'
import password_icon from './password.png'
import { Link } from 'react-router-dom'



const signup = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" id='username' name='username' />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='password' name='password' />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='cpassword' name='cpassword' />
        </div>

      </div>
      <div className="submit-container">
        <div className="submit">Register</div>

      </div>
     </div>
  )
}

export default signup