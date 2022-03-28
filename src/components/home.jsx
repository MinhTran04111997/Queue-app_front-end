import React, { useState, useEffect } from 'react'
import homeService from '../services/home_service'
import '../styles/home.css'
import {  Dropdown, DropdownButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaRegCalendarAlt } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import fi from 'date-fns/locale/fi'

const Home = () => {
    const [services,setServices] = useState([])
    const [newPhonenumber, setnewPhonenumber]= useState('')
    const [verify, setVerify]=useState(null)
    const [active, setActive]= useState('')
    const [selectedDay, setSelectedDay] = useState(Date);
    const activeList = ['service1', 'service2', 'service3']
    
    
    useEffect(()=>{
        homeService
            .getAll()
            .then(initialServices =>{
                setServices(initialServices)
            })
    },[])
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setnewPhonenumber(event.target.value)
    }

    const addNewcustomer = (event)=>{
        event.preventDefault()
        console.log(selectedDay)
        console.log(selectedDay.toISOString())
        const customerObject ={
            phonenumber: newPhonenumber,
            services: services[verify].name,
            verify: verify,
            date: selectedDay
        }
        homeService
            .cusTomer(customerObject)
            .then(()=>{
                setnewPhonenumber('')
            })
    }

   const serviceList =[]
   const descriptionList = []
   services.forEach(service => {
       serviceList.push(service.name.toUpperCase())
       descriptionList.push(service.description)
    } )
   const descriptionDisplay = () =>{
       if(verify !== null){
        return(
            <div>
                <button className='service_detail'>
                <h4>Service Name: {serviceList[verify]}</h4>
                 <br/>
                {descriptionList[verify]}
                </button>
            </div>
        )
       }
   }
    const displayService =()=>{
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title="Choose a service">                
                {services.map((service,i)=>{
                    if(service.isActive){
                        return(
                            <Dropdown.Item key={i} className={active===activeList[i]? 'service active': 'service'} onClick={()=> {
                                setActive(activeList[i])
                                setVerify(i)
                                }}>{service.name.toUpperCase()}</Dropdown.Item>
                        )
                    }
                    return <div></div>
                })}
            </DropdownButton>
            </div>
        )
    }
    
    const calendarPopup = () =>{
        const date = new Date
        return (
            <Popup trigger={<button className='btn btn-primary'> <FaRegCalendarAlt/></button>} 
              position="right center">
            <DayPicker className='datepicker'
                fromDate={date} toYear={2030}
                mode="single"
                required
                selected={selectedDay}
                onSelect={setSelectedDay}
                captionLayout="dropdown"
                locale={fi}
            />         
            </Popup>
        )
    }
  return (
    <div className='container-home'>
        <div className='btnList'>
            {displayService()}
            <div className='popup'>{calendarPopup()}</div>
        </div>
        
        {descriptionDisplay()}
        
        <form className='form' onSubmit={addNewcustomer} >
            <div>
                <h1>PHONE NUMBER</h1>
                <input value={newPhonenumber} onChange={handleNumberChange} placeholder='Phone Number' required />
            </div>
            <button className='btn btn-primary' type='submit'>submit</button>
        </form>
        
    </div>
  )
}

export default Home

