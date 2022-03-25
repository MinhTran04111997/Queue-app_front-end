import React from 'react'
import workSpace from '../services/workplace_services'
import { useState, useEffect } from 'react'
import '../styles/workspace.css'

const Workspace = ({id}) => {
  const [service, setService]=useState({})
  const [totalQueue, settotalQueue]= useState()
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      workSpace.setToken(user.token)
    }
    workSpace
        .getAll(`/api/workspace/getbyID/${id}`)
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
      <button className='btn btn-primary' onClick={clickNext}>Tiep Theo</button>
    </div>
  )
}

export default Workspace