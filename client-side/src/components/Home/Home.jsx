import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = ({setUser}) => {
    const token=localStorage.getItem("token")
    useEffect(()=>{
        getUser()
    },[])
    const getUser=async()=>{
        try {
            const res=await axios.get("http://localhost:3001/api/getuser",{headers:{"authorization":`Bearer ${token}`}})
            // console.log(res.data);
            setUser(res.data)
     
        } catch (error) {
            console.log(error);
            
        }
          }
  return (
    <div>Home</div>
  )
}

export default Home