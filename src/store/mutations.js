import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type.js'

export default {
  // 数量+1
  [ADD_COUNTER] (state, payload) {
    payload.count++
  },
  // 新添加商品
  [ADD_TO_CART] (state, payload) {
    payload.checked = false // 是否选中
    state.cartList.push(payload)
  }
}
