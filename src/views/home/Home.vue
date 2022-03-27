<template>
  <div id="home">
    <!-- 首页顶部导航 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        购物街
      </template>
    </nav-bar>

    <home-swiper :banners="banners" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'

import { getHomeMultidata } from 'network/home'

export default {
  name: 'Home',
  components: { NavBar, HomeSwiper },
  data () {
    return {
      banners: [], // 轮播图数据
      recommends: [] // 推荐
    }
  },
  created () {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.banner.list
      this.recommends = res.recommend
    })
  },
  methods: {}
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
