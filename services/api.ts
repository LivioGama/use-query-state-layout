import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms))

api.interceptors.response.use(async response => {
  if (process.env.NODE_ENV === 'development') {
    await sleep()
  }
  return response
})

export default api
