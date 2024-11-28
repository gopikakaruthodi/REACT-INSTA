import axios from 'axios'
import heart from './heart.png'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = ({setUser,setProfile}) => {
  const[post,setPost]=useState([])
  const navigate=useNavigate()
    const token=localStorage.getItem("token")
    useEffect(()=>{
        getUser();
        getPost();
    },[])
    const getUser=async()=>{
            if(token){
             try {
                const res=await axios.get("http://localhost:3001/api/getuser",{headers:{"authorization":`Bearer ${token}`}})
                console.log(res);
                if(res.status==200){
                setUser(res.data.username)
                  if(res.data.profile){
                    setProfile(res.data.profile.profile)
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
          const getPost=async()=>{
            const res=await axios.get("http://localhost:3001/api/getallpost")
            console.log(res);
            if(res.status==200){
              setPost(res.data)
            }
            else{
              alert(res.data.msg)
            }
            
          }
          console.log(post);
          {post.map((item)=>console.log(item.description))}
          
  return (
    <>
 
    {post.map((data)=><>
         <div className="postx">
      <div className="viewportx">
      <ul className="listx">
        {data.images.map((img)=><li className="itemx"><img src={img} alt="" /></li>)}
      </ul>
      <div className='postdiv'>
            <table >
                <tbody>
                <tr>
                    <td className='img1'><img src={heart}/></td>
                    <td className='img2'><img src="https://i.pinimg.com/564x/08/9c/1e/089c1e73b72e371dfe5bb6fb8c02eb96.jpg"  /></td>
                    <td className='img3'><img src="https://i.pinimg.com/564x/71/06/1f/71061f7d75969ebf007ea045e5c7263c.jpg"   /></td>
                </tr>
                </tbody>
            </table>
             <p >{data.postedDate}</p> 
             <div className='description' > <h4>{data.description}</h4> <p>{data.postedTime}</p> </div>
            </div>
    </div>
    </div>
    </>)}
 
    </>
  )
}

export default Home