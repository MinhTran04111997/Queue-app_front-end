import React, { useState, useEffect } from 'react'
import homeService from '../services/home_service'
import '../styles/home.css'

const Home = () => {
    const [services,setServices] = useState([])
    const [newPhonenumber, setnewPhonenumber]= useState('')
    const [verify, setVerify]=useState()
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

    const displayService =()=>{
        return (
            services.map((service,i)=>{
                if(service.isActive){
                    return(
                        <button key={i} className={active===activeList[i]? 'service active': 'service'} onClick={()=> {
                        setActive(activeList[i])
                        setVerify(i)
                        console.log(verify)
                        }}><h1>{service.name.toUpperCase()}</h1>
                        </button>
                    )
                }
            })
        )
    }
  return (
    <div>
        <div className='btnList'>
            {displayService()}
        </div>
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

/*<button className={active==='service1'? 'service active': 'service'} onClick={()=> {
                setActive('service1')
                setVerify(0)
                console.log(verify)
                }}><h1>{services[0]}</h1></button>
            <button className={active==='service2'? 'service active': 'service'} onClick={()=> {
                setActive('service2')
                setVerify(1)
                console.log(verify)
                }}><h1>{services[1]}</h1></button>
            <button className={active==='service3'? 'service active': 'service'} onClick={()=> {
                setActive('service3')
                setVerify(2)
                console.log(verify)
                }}><h1>{services[2]}</h1></button>*/