import axios from 'axios'
const baseUrl = ''

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/api/workspace`, config)
  return request.then(response => response.data)
}

const serVice = (newCustomer) =>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(`${baseUrl}/api/workspace`, newCustomer, config)
  return request.then(response => response.data)
}

const editService = (editContent)=>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/api/workspace`, editContent, config)
  return request.then(response => response.data)
}

const toggleButton = (toggle)=>{
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/api/workspace/toggle/change`, toggle, config)
  return request.then(response => response.data)
}
export default{
  getAll: getAll,
  serVice: serVice,
  editService: editService,
  toggleButton: toggleButton,
  setToken: setToken
}