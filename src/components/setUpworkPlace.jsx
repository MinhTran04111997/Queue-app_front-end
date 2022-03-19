import React from 'react'
import { useState, useEffect } from 'react'
import setUp from '../services/setupworkplacement_services'
import { BrowserRouter as Router,  Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import '../styles/setupworkspace.css'

const SetUpworkPlace = () => {
  const [serviceName, setserviceName]=useState('')
  const [serviceList, setserviceList]=useState([])
  const [currentCount, setcurrentCount]=useState([])

  useEffect(()=>{
    setUp
        .getAll()
        .then(services =>{
            setserviceList(services)
        })
  },[])

  useEffect(()=>{
    setUp
        .currentCount()
        .then(count =>{
            setcurrentCount(count)
        })
  },[])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setserviceName(event.target.value)
  } 

  const addService=()=>{
    const newObject ={
      name: serviceName
    }
    setUp
        .serVice(newObject)
        .then(()=>{
            setserviceName('')
        })
  }
  const editOut = oldName =>{
    const newObject ={
      oldName,
      name: serviceName,
      currentNumber: 0
    }
    setUp
        .editService(newObject)
        .then(()=>{
            setserviceName('')
        })
  }
  const disPlay =()=>{
      return(
        serviceList.map((service,i) =>
            <li key={i}>
              <Link className='btnWorkspace' to={`/workspace/${service.id}`}>
                Service Name: <h1>{service.name.toUpperCase()}</h1>  Total Queue: <h2>{currentCount[i]}</h2>
              </Link>
              <Popup trigger={<button className='btn btn-primary'> EDIT </button>} 
              position="right center">
                  <form onSubmit={()=>{editOut(service.name)}} >
                    <div>
                    Service Name  
                    <input value={serviceName} onChange={handleNameChange} placeholder='Service Name' required />
                    </div>
                    <button className='btn btn-primary' type='submit'>SAVE</button>
                  </form>
              </Popup>
            </li>
        )
      )
  }
  return (
    <div>
      <form onSubmit={addService} >
            <div>
                Service Name  
                <input value={serviceName} onChange={handleNameChange} placeholder='Service Name' required />
            </div>
            <button className='btn btn-primary' type='submit'>ADD</button>
        </form>
        <div>{disPlay()}</div>
    </div>
  )
}

export default SetUpworkPlace