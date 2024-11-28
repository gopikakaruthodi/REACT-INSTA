import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './postdetails.css'

const PostDetails = () => {
    const {_id}=useParams()
    const[post,setPost]=useState({})
    const[images,setImages]=useState([])
    console.log(_id);

    useEffect(()=>{
        fetchData()
    },[])
    
    const fetchData=async()=>{
        const res=await axios.get(`http://localhost:3001/api/getpost/${_id}`)
        console.log(res);
        if(res.status==200){
            setPost(res.data)
            setImages(res.data.images)
        }
        else{
            alert("Connection Refused")
        }
        
    }
    console.log(post);
    console.log(images);
    
    
  return (
    <div className="post">
    <div className="viewport">
      <ul className="list">
        {images.map((img)=><li className="item"><img src={img} alt="" /></li>)}
        {/* <li class="item">1</li>
        <li class="item">2</li>
        <li class="item">3</li>
        <li class="item">4</li>
        <li class="item">5</li> */}
      </ul>
      <div className="post-details">
        <div className="dateTime">
            <h5>{post.postedTime}</h5>
            <h5>{post.postedDate}</h5>
        </div>
        <p>{post.description}</p>
      </div>
     
    </div>
    </div>
  )
}

export default PostDetails