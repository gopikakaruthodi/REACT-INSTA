import React,{useState} from 'react'
import './Nav.css'
import person_icon from './person.png'
import { Link, useNavigate } from 'react-router-dom'

const Nav = ({user,profile}) => {
  const navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/signin')
  }
    // console.log(user);
    // console.log(profile);
    
  return (
    <div className='nav'>
        <Link to={'/'}><h2>INSTA</h2></Link>
        <div className='usrinfo'>
          <h4>{user}</h4>
          <div className="prof">
            <img src={profile} alt="" onClick={toggleDropdown} />
           
            <div className="profile-dropdown">   
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                   <Link to={'/profile'}><h5>Profile</h5></Link> 
                  </li>
                  <hr />
                  <li>
                  <button id='log' onClick={logout}>Logout</button>
                    
                  </li>
                </ul>
                )}
                </div>
          </div>
        </div>
    </div>
  )
}

export default Nav