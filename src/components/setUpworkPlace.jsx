import React from 'react'
import { useState, useEffect } from 'react'
import setUp from '../services/setupworkplacement_services'
import { BrowserRouter as Router,  Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import '../styles/setupworkspace.css'
import ToggleButton from 'react-toggle-button'
import update from 'react-addons-update';

const SetUpworkPlace = () => {
  const [serviceName, setserviceName]=useState('')
  const [serviceList, setserviceList]=useState([])
  const [currentCount, setcurrentCount]=useState([])
  const [isActiveList, setIsActiveList] = useState ([])
  
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
        serviceList.map((service,i) =>
            <li key={i}>
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
              value={isActiveList[i]}
              onClick={()=>{
                setUpActive(service.id,i);
              }}
              />
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