import axios from 'axios';
const http =  axios.create({
    baseURL: 'http://localhost:8080'
})


export const toggleLed = () => http.post('/toggle')

export const setBrightness = (value) => http.post(`/brightness/${value}`)

export const getLedInfo = () => http.get('/led')