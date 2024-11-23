import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Password from './components/password/Password'
import Email from './components/email/Email'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import { useState } from 'react'

function App() {
  const [user,setUser]=useState("")
  console.log(`app ${user}`);
  

  return (
    <>
      <div>
        <BrowserRouter>
        {user&&<Nav user={user} />}
        <Routes>
          <Route path='/' element={<Home setUser={setUser}/>}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/password' Component={Password}/>
          <Route path='/email' Component={Email}/>
          <Route path='/signin' Component={Signin}/>

        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
