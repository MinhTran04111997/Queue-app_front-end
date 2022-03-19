import React from 'react'
import workSpace from '../services/workplace_services'
import { useState, useEffect } from 'react'
import '../styles/workspace.css'

const Workspace = ({id}) => {
  const [service, setService]=useState({})
  useEffect(()=>{
    workSpace
        .getAll(`/api/workspace/${id}`)
        .then(services =>{
            setService(services)
        })
  },[])
  console.log(service)

const clickNext=()=>{
    workSpace.serVice(`/api/workspace/${id}`)
             .then(services =>{
              setService(services)
  })
}
  return (
    <div >
      <div className='wrapper' >
        <h1 >{service.name}</h1>
        <h3>{service.currentNumber}</h3>
      </div>
      <button className='btn btn-primary' onClick={clickNext}>Tiep Theo</button>
    </div>
  )
}

export default Workspace