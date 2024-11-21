import React from 'react'
import { Link } from 'react-router-dom'
import email_icon from './email.png'
import password_icon from './password.png'
import './Signin.scss'

const Signin = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" id='email' name='email' />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" id='password' name='password' />
        </div>

      </div>
      <div className="submit-containers">
        <Link to={"/email"}><div className="submit">Sign In</div></Link>
        {/* <Link ><div className="submit">Sign In</div></Link> */}
        <Link to={'/password'}><h4> Forgot password </h4></Link>

      </div>
     </div>
  )
}

export default Signin