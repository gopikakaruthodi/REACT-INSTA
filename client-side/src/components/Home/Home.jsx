import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({setUser,setProfile}) => {
  const navigate=useNavigate()
    const token=localStorage.getItem("token")
    useEffect(()=>{
        getUser();
    },[])
    const getUser=async()=>{
            if(token){
             try {
                const res=await axios.get("http://localhost:3001/api/getuser",{headers:{"authorization":`Bearer ${token}`}})
                // console.log(res.data.profile);
                if(res.status==200){
                setUser(res.data.username)
                  if(res.data.profile){
                    setProfile(res.data.profile)
                  }
                }
                else if(res.status==403){
                  alert(res.status.msg)
                  navigate('/signin')
                  
                }
                else{
                  navigate('/signin')
                }
             } catch (error) {
                console.log(error);
                navigate('/signin')
             }

            }
            else{
              navigate('/signin')
            }
          
          }
  return (
    <div>Home</div>
  )
}

export default Home