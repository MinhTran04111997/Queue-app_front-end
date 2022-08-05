import React from 'react'
import workSpace from '../services/workplace_services'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/workspace.css'
import queryString from 'query-string'

const Workspace = ({id}) => {
  const [service, setService]=useState({})
  const [totalQueue, settotalQueue]= useState()
  const location = useLocation()
  const date = queryString.parse(location.search).date
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      workSpace.setToken(user.token)
    }
    workSpace
        .getAll(`/api/workspace/getbyID/${id}?date=${date}`)
        .then(services =>{
            setService(services.service)
            settotalQueue(services.totalQueue)
        })
  },[])
  console.log(service)

const clickNext=()=>{
    workSpace.serVice(`/api/workspace/getbyID/${id}`)
             .then(services =>{
              setService(services)
  })
}
  return (
    <div >
      <div className='wrapper' >
        <h1 >{service.name}</h1>
        <h3>{service.currentNumber}</h3>
        <h3>{totalQueue}</h3>
      </div>
      <button className='btn btn-primary' onClick={clickNext}>NEXT</button>
    </div>
  )
}

export default Workspace