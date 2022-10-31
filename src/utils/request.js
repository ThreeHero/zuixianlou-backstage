import axios from 'axios'
// import store from '@/store'
// import router from '@/router'

const request = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3600
})

// 请求拦截器
request.interceptors.request.use(function(config) {
  return config
})

// 响应拦截器

export default request
