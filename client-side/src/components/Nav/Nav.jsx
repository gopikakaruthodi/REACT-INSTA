import React from 'react'
import './Nav.css'

const Nav = ({user}) => {
    console.log(user);
    
  return (
    <div className='nav'>
        <h2>INSTA</h2>
        <h4>{user}</h4>
    </div>
  )
}

export default Nav