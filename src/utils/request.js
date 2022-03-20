// 拦截器
import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例，设置api基地址
const service = axios.create({
  // 这个代理只是给开发环境配置的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // axios默认加data
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
)

export default service
