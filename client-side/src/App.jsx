import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Password from './components/password/Password'
import Email from './components/email/Email'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import { useState } from 'react'
import Profile from './components/profile/Profile'
import Edit from './components/Edit/Edit'
import Post from './components/Post/Post'
import PostDetails from './components/PostDetails/PostDetails'

function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")
  // console.log(`app ${user}`);
  console.log(`profile ${profile}`);
  
  return (
    <>
      <div>
        <BrowserRouter>
        {user&&<Nav user={user} profile={profile} />}
        <Routes>
          <Route path='/' element={<Home setUser={setUser} setProfile={setProfile} />}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/password' Component={Password}/>
          <Route path='/email' Component={Email}/>
          <Route path='/signin' Component={Signin}/>
          <Route path='/profile' Component={Profile}/>
          <Route path='/edit' Component={Edit}/>
          <Route path='/addpost' Component={Post}/>
          <Route path='/postdetails/:_id' Component={PostDetails}/>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
