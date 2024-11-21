import React from 'react'
import './Email.css'
import email_icon from './email.png'
import { Link } from 'react-router-dom'



const Email = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Email Verification</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" id='email' name='email' />
        </div>
      </div>
      <div className="submit-containers">
        <Link><div className="submit">verify</div></Link>
      </div>
     </div>
  )
}

export default Email