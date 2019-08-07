import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.0.47:3333'
    //baseURL: 'http://localhost:3333'
    //baseURL: 'http://10.20.203.10:3333'
    baseURL: 'http://localhost:3333'

})

export default api;