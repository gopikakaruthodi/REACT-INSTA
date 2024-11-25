import React from 'react'
import './Profile.css'
import person_icon from './person.png'
import { Link } from 'react-router-dom'


const Profile = () => {
  return (
    <div className="containers">
        <div className="left" id="left">
        <img src={person_icon} alt="pro pic" id="profile-" />
            <h2 id="username">uontse</h2>
            <div className="details">
                <h5>Email:</h5>
                <div id="email">--</div>
            </div>
           
            <div className="details">
                <h5>Gender:</h5>
                <div id="address">--</div>
            </div>
            {/* <div className="details">
                <h5>Pincode:</h5>
                <div id="pincode">-</div>
            </div> */}
            <div className="details">
                <h5>Phone:</h5>
                <div id="phone">--</div>
            </div>
            <div className="details">
                <h5>Bio:</h5>
                <div className="bioo" >--</div>
            </div>
           <div>
            <Link to={'/edit'} ><button className='butn1'>Edit</button></Link>
            <button className='butn2'>Delete</button>
           </div>
           <button className='logout-btn'>Logout</button>
        </div>
        <div className="right">
           
        </div>
        
    </div>
  )
}

export default Profile