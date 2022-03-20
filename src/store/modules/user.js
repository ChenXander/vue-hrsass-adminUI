// 用户信息
import { getToken, setToken, removeToken } from '@/utils/auth'

// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// vuex持久化：Vuex和前端缓存相结合
const state = {
  token: getToken() // 设置token为共享状态
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    // vuex变化 => 缓存数据
    setToken(token) // vuex和 缓存数据的同步
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  }
}
// 执行异步
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
