import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Routes, Navigate, useMatch, Switch  } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import SetUpworkPlace from './components/setUpworkPlace'
import Workspace from './components/workspace'

import './styles/nav.css'
 

  
const App = () =>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, userHasAuthenticated] = useState(false)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          userHasAuthenticated(true)
        }
      }, [])
      const match=useMatch('/workspace/:id')
      const id = match? String(match.params.id):null
      const logOutListener = () =>{
        console.log("loged out")
        window.localStorage.removeItem('loggedNoteappUser')
        window.location.reload()
      }
    return (
        <div className='container'>
            <nav id='wrapper'>
                <div id='c1'>
                <Link  id='home'  to="/">HOME</Link>
                <Link className='btn btn-primary' id='workspace' to={"/workspace"}>WORKSPACE</Link>
                </div>
                <Link id='c2' className='btn btn-primary'  to="/login">lOG IN</Link>
                <button id='c2' className='btn btn-primary' onClick={()=>{logOutListener()}}>LOG OUT</button>
            </nav>
            <Routes>
                <Route path="/workspace/:id" element={isAuthenticated? <Workspace id={id} />: <Navigate to= "/login"/>} />
                <Route path="/workspace" element={isAuthenticated? <SetUpworkPlace/>: <Navigate to= "/login"/> } /> 
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={isAuthenticated? <Navigate to= "/workspace"/>: <Login/> }/>
            </Routes>
        </div>
    )
}
export default App
