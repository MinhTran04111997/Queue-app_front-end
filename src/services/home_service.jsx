import axios from 'axios'
const baseUrl = ''

const getAll = async () => {
    const request = axios.get(`${baseUrl}/api/services`)
    const response = await request
    return response.data
}

const cusTomer = async (newCustomer) =>{
    const request = axios.post(`${baseUrl}/api/customer`, newCustomer)
    const response = await request
    return response.data
}

export default{
    getAll: getAll,
    cusTomer: cusTomer
}