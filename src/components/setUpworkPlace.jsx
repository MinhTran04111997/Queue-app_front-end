import React from 'react'
import { useState, useEffect } from 'react'
import setUp from '../services/setupworkplacement_services'
import { BrowserRouter as Router,  Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import '../styles/setupworkspace.css'
import ToggleButton from 'react-toggle-button'
import update from 'react-addons-update';
import {  Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import fi from 'date-fns/locale/fi'
import { FaRegCalendarAlt } from 'react-icons/fa'
import queryString from 'query-string'

const SetUpworkPlace = () => {
  const [serviceName, setserviceName]=useState('')
  const [serviceDescription, setServiceDescription]=useState('')
  const [serviceList, setserviceList]=useState([])
  const [verify, setVerify]=useState(null)
  const [currentCount, setcurrentCount]=useState([])
  const [countbyDay, setcountbyDay]= useState([])
  const [dateStatus, setdateStatus]=useState()
  const [isActiveList, setIsActiveList] = useState ([])
  const [selectedDay, setSelectedDay] = useState(Date);
  
  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUp.setToken(user.token)
    }
    setUp
        .getAll()
        .then(response =>{
            setserviceList(response.workflowList)
            setcurrentCount(response.currentCount)
            setIsActiveList(response.isActiveList)
        })
  },[])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setserviceName(event.target.value)
  } 

  const handleContentChange = (event) => {
    console.log(event.target.value)
    setServiceDescription(event.target.value)
  } 

  const addService=()=>{
    const newObject ={
      name: serviceName,
      description: serviceDescription
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

  const setUpActive =  (id, i)=>{
    const copyIsActive = [...isActiveList]
    copyIsActive[i]= !copyIsActive[i]
    const toogleObject =  {
        id: id,
        toggle: copyIsActive[i]
    }
    setUp.toggleButton(toogleObject)
    setIsActiveList(update(isActiveList,{
      [i]:{
        $set: !isActiveList[i]
      }
    }))
  }

  const disPlay =()=>{
      return(
        <DropdownButton id="dropdown-basic-button" title={verify === null? "Chọn Dịch Vụ": serviceList[verify].name}>
        {serviceList.map((service,i) =>{
          return(
              <Dropdown.Item key={i}  onClick={()=> {
                setVerify(i)
                  }}>{service.name.toUpperCase()}</Dropdown.Item>
          )}
        )}
        <Dropdown.Item onClick={()=> {
                setVerify(null)
                }}>NONE</Dropdown.Item>
        </DropdownButton>
      )
  }

   const serviceListcopy =[]
   serviceList.forEach(service => {
       serviceListcopy.push(service.name.toUpperCase())
    })
   const descriptionDisplay = () =>{
       if(verify !== null){
        return(
            <div>
              <ToggleButton
              colors={{
              activeThumb: {
                base: 'rgb(250,250,250)',
              },
              inactiveThumb: {
                base: 'rgb(62,130,247)',
              },
              active: {
                base: 'rgb(207,221,245)',
                hover: 'rgb(177, 191, 215)',
              },
              inactive: {
                base: 'rgb(65,66,68)',
                hover: 'rgb(95,96,98)',
              }
            }}
            value={isActiveList[verify]}
            onClick={()=>{
              setUpActive(serviceList[verify].id, verify);
            }}
            />
            <Link className='btnWorkspace' to={`/workspace/${serviceList[verify].id}?date=${dateStatus == null? "":dateStatus}`}>
                Tên Dịch Vụ: <h1>{serviceListcopy[verify]}</h1>  Tổng Khách Hàng: <h2>{selectedDay==null? currentCount[verify]: countbyDay[verify]}</h2>
                Ngày: <h2>{dateStatus}</h2>
            </Link>
            <Popup trigger={<button className='btn btn-primary'> EDIT </button>} 
              position="right center">
                  <form onSubmit={()=>{editOut(serviceList[verify].name)}} >
                    <div>
                    Service Name  
                    <input value={serviceName} onChange={handleNameChange} placeholder='Service Name' required />
                    </div>
                    <button className='btn btn-primary' type='submit'>SAVE</button>
                  </form>
            </Popup>
            </div>
        )
       }
   }

   const pickDateListener = (selected)=>{
      const request =  {
        date: selected
      }
      setUp.countbyDate(request).then(response => {
        setcountbyDay(response.currentCount)
        setdateStatus(response.dateFormat)
      })
      console.log(request)
   }
   
   const calendarPopup = () =>{
    const date = new Date
    return (
        <Popup trigger={<button className='btn btn-primary'> <FaRegCalendarAlt/></button>} 
          position="right center">
        <DayPicker className='datepicker'
            fromDate={date} toDate={date}
            mode="single" 
            required
            onDayClick={(selected)=>pickDateListener(selected)}
            selected={selectedDay}
            onSelect={setSelectedDay}
            captionLayout="dropdown"
            locale={fi}
        />         
        </Popup>
    )
}

  return (
    <div className='container_setup'>
      <form onSubmit={addService} >
            <div>
                <h4>TÊN DỊCH VỤ</h4>
                <input value={serviceName} onChange={handleNameChange} placeholder='Tên Dịch Vụ' required />
                <textarea value={serviceDescription} onChange={handleContentChange} className='description' rows="7" placeholder='Mô Tả' required></textarea>
            </div>
            <button className='btn btn-primary' type='submit'>THÊM</button>
        </form>
        <div className='container_list'>
          {disPlay()}
          <div className='popup'>{calendarPopup()}</div>
          </div>
        <div className='service_detail_setup'>{descriptionDisplay()}</div>
        
    </div>
  )
}

export default SetUpworkPlace

