// vuex快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token// 在根级的getters上开放子模块的属性
}
export default getters
