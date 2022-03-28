import axios from 'axios'
const baseUrl = ''

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/api/workspace`, config)
  const response = await request
  return response.data
}

const getbyDate = async () =>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/api/workspace/date`, config)
  const response = await request
  return response.data
}

const serVice = async (newCustomer) =>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(`${baseUrl}/api/workspace`, newCustomer, config)
  const response = await request
  return response.data
}

const editService = async (editContent)=>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/api/workspace`, editContent, config)
  const response = await request
  return response.data
}

const toggleButton = async (toggle)=>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/api/workspace/toggle/change`, toggle, config)
  const response = await request
  return response.data
}
export default{getAll, getbyDate, serVice, editService, toggleButton, setToken}