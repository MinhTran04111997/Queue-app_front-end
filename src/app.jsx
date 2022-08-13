import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route, Routes, Navigate, useMatch  } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import SetUpworkPlace from './components/setUpworkPlace'
import Workspace from './components/workspace'

import './styles/nav.css'
 

  
const App = () =>{
    const [isAuthenticated, userHasAuthenticated] = useState(false)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
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
                <Link  id='home'  to="/">TRANG CHỦ</Link>
                <Link className='btn btn-primary' id='workspace' to={"/workspace"}>TRANG DÀNH CHO CÁN BỘ</Link>
                </div>
                <Link id='c2' className='btn btn-primary'  to="/login">ĐĂNG NHẬP</Link>
                <button id='c2' className='btn btn-primary' onClick={()=>{logOutListener()}}>ĐĂNG XUẤT</button>
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
