<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'

// 网络请求
import { getDetail } from 'network/detail.js'

export default {
  name: 'Detail',
  components: { DetailNavBar, DetailSwiper },
  props: {},
  data () {
    return {
      iid: null, // 商品id
      topImages: [] // 顶部图片
    }
  },
  methods: {
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>
</style>
