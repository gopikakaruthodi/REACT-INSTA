import React from 'react'
import './Edit.css'

const Edit = () => {
  return ( 
    <>
    <div className="body">
        <div className="cntner">
            <h2>Edit Information</h2>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="username" />
                <label htmlFor="bio">Bio:</label>
                <input type="text" id="bio" name="bio" placeholder="Edit here..." />
                <label htmlFor="gender"  >Gender:</label>
                <div className="gndr">
                    <input type="radio" id="gender" name="gender" value="Male" placeholder="Edit here..." />Male
                    <input type="radio" id="gender" name="gender" value="Female" placeholder="Edit here..." />Female
                    <input type="radio" id="gender" name="gender" value="Other" placeholder="Edit here..." />Other
                </div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="asd@gmail.com" />
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" placeholder="Edit here..." />
                <label htmlFor="phone">Profile:</label>
                <input type="file" id="profile" name="profile"  />
                <div id="pro"></div>
                <button type="submit">Edit</button>
            </form>
            <div className="footer">Please ensure all information is correct.</div>
        </div>
    </div>
    </>
  )
}

export default Edit