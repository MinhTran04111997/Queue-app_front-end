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
import validator from 'validator' 
import {format} from 'date-fns'

const Home = () => {
    const [services,setServices] = useState([])
    const [newPhonenumber, setnewPhonenumber]= useState('')
    const [name, setName]= useState('')
    const [verify, setVerify]=useState(null)
    const [active, setActive]= useState('')
    const [selectedDay, setSelectedDay] = useState();
    const [errorMessage, seterrorMessage] = useState()
    const [registerMessage, setRegisterMessage] = useState()
    const activeList = ['service1', 'service2', 'service3']
    
    
    useEffect(()=>{
        homeService
            .getAll()
            .then(initialServices =>{
                setServices(initialServices)
            })
    },[])

    const handleNumberChange =  (event) => {
        console.log(event.target.value)
        setnewPhonenumber(event.target.value)
    }

    const handleNameChange =  (event) => {
        console.log(event.target.value)
        setName(event.target.value)
    }

    const addNewcustomer = async (event)=>{
        const date = new Date()
        const dateFormat = format(date, 'MM-dd-yyyy')
        event.preventDefault()
        if( verify !== null && validator.isMobilePhone(newPhonenumber) && newPhonenumber.length>5 ){
            seterrorMessage()
            const customerObject ={
                name: name,
                phonenumber: newPhonenumber,
                services: services[verify].name,
                verify: verify,
                date: dateFormat
            }
            homeService
                .cusTomer(customerObject)
                .then((response)=>{
                    setRegisterMessage(response.message)
                    setnewPhonenumber('')
                    setName('')
                })
        }else{
            seterrorMessage('Số điện thoại không hợp lệ hoặc chưa chọn dịch vụ')
        }   
        
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
                <h4>Dịch Vụ Công: {serviceList[verify]}</h4>
                 <br/>
                 <p>{descriptionList[verify]}</p>               
                <br />
                <h4>Số Hiện Tại: {services[verify].currentNumber}</h4>
                </button>
            </div>
        )
       }
   }
    const displayService =()=>{
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title={verify === null? "Chọn Dịch Vụ": serviceList[verify]}>                
                {services.map((service,i)=>{
                    if(service.isActive){
                        return(
                            <Dropdown.Item required key={i} className={active===activeList[i]? 'service active': 'service'} onClick={()=> {
                                setActive(activeList[i])
                                setVerify(i)
                                }}>{service.name.toUpperCase()}</Dropdown.Item>
                        )
                    }
                    return <div></div>
                })}
                <Dropdown.Item onClick={()=>{
                    setVerify(null)
                }}>Trống</Dropdown.Item>
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
                fromDate={date} toDate={date}
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
            {/* <div className='popup'>{calendarPopup()}</div> */}
        </div>
        {descriptionDisplay()}
        {registerMessage && <h4 className='success'>{registerMessage}</h4>}
        <form className='form' onSubmit={addNewcustomer} >
            <div>
                <h1>Vui Lòng Diền Thông Tin</h1>
                <div className='input'>
                    <input value={newPhonenumber} onChange={handleNumberChange} placeholder='Số Điện Thoại' required />                    
                </div>
                <div className='input2'>
                    <input value={name} onChange={handleNameChange} placeholder='Tên' required />
                </div>
            </div>
            <button className='btn btn-primary' type='submit'>Đăng Kí</button>
        </form>
        {errorMessage && <p className='error'>{errorMessage}</p>}
    </div>
  )
}

export default Home

