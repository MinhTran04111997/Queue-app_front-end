import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async (baseUrl) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    const response = await request
    return response.data
}

const serVice = async (baseUrl) =>{
    const config = {
        headers: { Authorization: token },
    }
    const body= null
    const request = axios.put(baseUrl,body, config)
    const response = await request
    return response.data
}

export default{getAll, serVice, setToken}