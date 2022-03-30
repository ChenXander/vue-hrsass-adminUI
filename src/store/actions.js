import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type.js'

export default {
  // 有判断逻辑建议放actions里面
  addCart (context, payload) {
    // 1.查找之前数组中是否有该商品
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
    }
  }
}
