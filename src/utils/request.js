// 拦截器
import axios from 'axios'

// 创建axios实例，设置api基地址
const service = axios.create({})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use()

export default service
