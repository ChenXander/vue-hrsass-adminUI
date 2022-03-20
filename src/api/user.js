// 用户api
import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 用户token
export function getInfo(token) {

}
// 用户登出
export function logout() {

}
