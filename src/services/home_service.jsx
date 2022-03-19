import axios from 'axios'
const baseUrl = ''

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/services`)
    return request.then(response => response.data)
}

const cusTomer = (newCustomer) =>{
    const request = axios.post(`${baseUrl}/api/customer`, newCustomer)
    return request.then(response => response.data)
}

export default{
    getAll: getAll,
    cusTomer: cusTomer
}