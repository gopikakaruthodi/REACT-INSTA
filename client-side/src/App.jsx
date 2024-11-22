import './App.scss'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Password from './components/password/Password'
import Email from './components/email/Email'
import signup from './components/signup/signup'
import Signin from './components/signin/Signin'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
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
