import React, { useEffect, useState } from 'react'
import './Profile.css'
import person_icon from './person.png'
import userimg from './image.png'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Profile = () => {
    const navigate=useNavigate()
    const token=localStorage.getItem("token")
    const[usrData,setUsrData]=useState({})
    const[proData,setProData]=useState({})
    const[post,setPost]=useState([])
    const[proBool,setProBool]=useState(false)

    useEffect(()=>{
        fetchData()
    },[])
    const fetchData= async()=>{
        const res= await axios.get("http://localhost:3001/api/getuserdata",{headers:{"authorization":`Bearer ${token}`}})
        console.log(res);
        if(res.status==200){
            setUsrData(res.data.userData)

            res.data.profileData?setProData(res.data.profileData):setProData({})
            res.data.profileData?setProBool(true):setProBool(false)

            res.data.post?setPost(res.data.post):setPost([])
        }
    }
    const deleteUser=async()=>{
        if(confirm("Do you want to delete this user")){
            try {
                const res=await axios.delete(`http://localhost:3001/api/deleteuser/${usrData._id}`)
                console.log(res);
                if(res.status==200){
                    localStorage.removeItem('token')
                    alert(res.data.msg)
                    navigate('/signin')
                }
                
            } catch (error) {
                console.log(error);
                alert(error.response.data.msg) 
            }
        }
        
    }
    const logout=()=>{
        localStorage.removeItem('token')
        navigate('/signin')
    }

    console.log(post);
    
  return (
    <div className="containers">
        <div className="left" id="left">
        <img src={proBool?proData.profile:userimg} alt="pro pic" id="profile-" />
            <h2 id="username">{usrData.username}</h2>
            <div className="details">
                <h5>Email:</h5>
                <div id="email">{usrData?usrData.email:"-"}</div>
            </div>
           
            <div className="details">
                <h5>Gender:</h5>
                <div id="gender">{proBool?proData.gender:'-'}</div>
            </div>
            {/* <div className="details">
                <h5>Pincode:</h5>
                <div id="pincode">-</div>
            </div> */}
            <div className="details">
                <h5>Phone:</h5>
                <div id="phone">{proBool?proData.phone:'-'}</div>
            </div>
            <div className="details">
                <h5>Bio:</h5>
                <div className="bioo" >{proBool?proData.bio:'-'}</div>
            </div>
           <div>
            <Link to={'/edit'} ><button className='butn1'>{proBool?'Edit':'Create'}</button></Link>
            <button className='butn2' onClick={deleteUser} >Delete</button>
           </div>
           <button className='logout-btn'onClick={logout} >Logout</button>
        </div>
        <div className="right">
            <Link to={'/addpost'} ><button className='newpost'>New Post</button></Link>
          
            <div className="cards">
            {post.map((pst)=> <Link to={`/postdetails/${pst._id}`}>
                <div className="card">
                        <img src={pst.images[0]} alt="" />
                    </div>
                </Link>)}
            </div>
        </div>
        
    </div>
  )
}

export default Profile