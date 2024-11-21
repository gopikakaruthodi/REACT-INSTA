import React from 'react'
import './Password.scss'

const Password = () => {
  return (
    <div className='body'>
    <div className="form-container">
        <h2>Password</h2>
        <form id="forms">
        <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="username" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" required />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
                <span id="passwordError" className="error"></span>
            </div>
            <button type="submit" className="submit-btn" id="submitBtn">Login</button>
        </form>
    </div>
    </div>
  )
}

export default Password