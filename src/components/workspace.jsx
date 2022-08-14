import React from 'react'
import workSpace from '../services/workplace_services'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/workspace.css'
import queryString from 'query-string'

const Workspace = ({id}) => {
  const [service, setService]=useState({})
  const [totalQueue, settotalQueue]= useState()
  const [customerInfo, setCustomerInfo] = useState(null)
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
    workSpace.serVice(`/api/workspace/getbyID/${id}?date=${date}`)
             .then(response =>{
              setService(response.service)
              setCustomerInfo(response.customer)
  })
}

const clickReset = () =>{
  workSpace.reset(`/api/workspace/getbyID/reset/${id}`)
           .then(services =>{
              setService(services)
              setCustomerInfo(null)
            })
}

const displayCustomerInfo = () =>{
  return(
      <div class="box">
        <div className='info'>
          <h4 className='white'>Tên Khách Hàng: </h4><h4>{customerInfo.name}</h4>
          <h4 className='white'>Số Điện Thoại: </h4><h4>{customerInfo.phonenumber}</h4>
        </div>
      </div>
  )
}

  return (
    <div className='container-setup'>
      <div className='wrapper' >
        <h1 >{service.name}</h1>
        <div className='box1'>
          <div className='info'>
            <h4>Số Thứ Tự: {service.currentNumber}</h4>
            <h4>Tổng Khách Hàng: {totalQueue}</h4>
          </div>
        </div>
        {customerInfo && displayCustomerInfo()}
      </div>
      
      <button className='btn btn-primary' onClick={clickNext}>NEXT</button>
      <div className='resetBtn'><button className='btn btn-primary' onClick={clickReset}>RESET</button></div>
    </div>
  )
}

export default Workspace