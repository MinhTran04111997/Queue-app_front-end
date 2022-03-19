import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Routes, Navigate, useMatch  } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import SetUpworkPlace from './components/setUpworkPlace'
import Workspace from './components/workspace'
import './styles/nav.css'
 

  
const App = () =>{
    const [user, setUser] = useState(null)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
        }
      }, [])
      const match=useMatch('/workspace/:id')
      const id = match? String(match.params.id):null
    
    return (
        <div className='container'>
            <nav id='wrapper'>
                <div id='c1'>
                <Link  id='home'  to="/">HOME</Link>
                <Link className='btn btn-primary' id='workspace' to={user? "/workspace":"/login"}>WORKSPACE</Link>
                </div>
                <Link id='c2' className='btn btn-primary'  to="/login">lOGIN</Link>
            </nav>
            <Routes>
                <Route path="/workspace/:id" element={<Workspace id={id} />} />
                <Route path="/workspace" element={<SetUpworkPlace/>} /> 
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={user? <Navigate replace to="/workspace" />:<Login/> }/>
            </Routes>
        </div>
    )
}

export default App