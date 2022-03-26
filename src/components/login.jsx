import React, { useState, useEffect } from 'react'
import loginService from '../services/login_services'
import Notification from './notification'
import { Navigate, Link } from "react-router-dom";
import { render } from '@testing-library/react';

const Login = ()=> {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null) 

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)
    try {
        const user = await loginService.login({
          username, password,
        })
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        )
        setUser(user)
        setUsername('')
        setPassword('')
        window.location.reload();
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  }
  return(
      <div>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='btn btn-primary' type="submit">login</button>
      </form>
      </div>
  )
}
export default Login