import React, { useState, useEffect } from 'react'
import homeService from '../services/home_service'
import '../styles/home.css'
import {  Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [services,setServices] = useState([])
    const [newPhonenumber, setnewPhonenumber]= useState('')
    const [verify, setVerify]=useState(null)
    const [active, setActive]= useState('')
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
        const customerObject ={
            phonenumber: newPhonenumber,
            services: services[verify].name,
            verify: verify
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
   const testDisplay = () =>{
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
  return (
    <div className='container-home'>
        <div className='btnList'>
            {displayService()}
        </div>
        {testDisplay()}
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

/*
<Dropdown.item key={i} className={active===activeList[i]? 'service active': 'service'} onClick={()=> {
                        setActive(activeList[i])
                        setVerify(i)
                        console.log(verify)
                        }}><h1>{service.name.toUpperCase()}</h1>
                        </Dropdown.item>
                         Service Name: <h1>{copyServices[1].name.toUpperCase()}</h1> 
 */