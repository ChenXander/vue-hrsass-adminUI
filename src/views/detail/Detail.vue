<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品详情信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店家信息 -->
      <detail-shop-info :shop="shop" />
    </scroll>
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'

// 公共组件
import Scroll from 'components/common/scroll/Scroll'

// 网络请求
import { getDetail, Goods, Shop } from 'network/detail.js'

export default {
  name: 'Detail',
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, Scroll },
  props: {},
  data () {
    return {
      iid: null, // 商品id
      topImages: [], // 顶部图片
      goods: {}, // 商品详情信息数据
      shop: {} // 店铺信息
    }
  },
  methods: {
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 轮播图数据
      this.topImages = res.result.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 店铺信息数据
      this.shop = new Shop(data.shopInfo)
    })
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;

    height: 100vh;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
