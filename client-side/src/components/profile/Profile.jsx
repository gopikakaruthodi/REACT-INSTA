import React, { useEffect, useState } from 'react'
import './Profile.css'
import person_icon from './person.png'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Profile = () => {
    const token=localStorage.getItem("token")
    const[usrData,setUsrData]=useState({})
    const[proData,setProData]=useState({})
    const[proBool,setProBool]=useState(false)

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData= async()=>{
        const res= await axios.get("http://localhost:3001/api/getuserdata",{headers:{"authorization":`Bearer ${token}`}})
        // console.log(res);
        if(res.status==200){
            setUsrData(res.data.userData)
            res.data.profileData?setProData(res.data.profileData):setProData({})
            res.data.profileData?setProBool(true):setProData(false)
        }
    }
    console.log(usrData);
    
  return (
    <div className="containers">
        <div className="left" id="left">
        <img src={person_icon} alt="pro pic" id="profile-" />
            <h2 id="username">{usrData.username}</h2>
            <div className="details">
                <h5>Email:</h5>
                <div id="email">{usrData?usrData.email:"-"}</div>
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