import axios from 'axios'

const getAll = (baseUrl) => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const serVice = (baseUrl) =>{
    const request = axios.put(baseUrl)
    return request.then(response => response.data)
}

export default{
    getAll: getAll,
    serVice: serVice
}