import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import signup from './components/Home/Signup'
import Nav from './components/nav/Nav'
import Signin from './components/signin/Signin'
import Password from './components/password/Password'
import Email from './components/email/Email'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' Component={Signin}/>
          <Route path='/signup' Component={signup}/>
          <Route path='/password' Component={Password}/>
          <Route path='/email' Component={Email}/>

        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
