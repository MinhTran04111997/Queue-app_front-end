import axios from 'axios'
const baseUrl = ''

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/workspace`)
  return request.then(response => response.data)
}

const currentCount= ()=>{
  const request = axios.get(`${baseUrl}/api/customer`)
  return request.then(response => response.data)
}

const serVice = (newCustomer) =>{
  const request = axios.post(`${baseUrl}/api/workspace`, newCustomer)
  return request.then(response => response.data)
}

const editService = (editContent)=>{
  const request = axios.put(`${baseUrl}/api/workspace`, editContent)
  return request.then(response => response.data)
}
export default{
  getAll: getAll,
  serVice: serVice,
  editService: editService,
  currentCount: currentCount
}