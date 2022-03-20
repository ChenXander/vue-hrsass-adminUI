import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/) // 读取所有.svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req) // 将svg目录下所有svg文件引入项目中
