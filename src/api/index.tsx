import axios from "axios";

const ins = axios.create({
  baseURL: 'xxxx',
  timeout: 10*1000
})

ins.interceptors.request.use((config) => {
  // if (token) {
  //   config.headers.authorization = `Bearer ${token}`
  // }
  return config
}, err => {
  return Promise.reject(err)
})

ins.interceptors.response.use((res) => {
  return res
}, err => {
  return Promise.reject(err)
})

export default ins