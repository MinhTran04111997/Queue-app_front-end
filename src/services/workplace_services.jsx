import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = (baseUrl) => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const serVice = (baseUrl) =>{
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.put(baseUrl, config)
    return request.then(response => response.data)
}

export default{
    getAll: getAll,
    serVice: serVice,
    setToken: setToken
}