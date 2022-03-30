<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品详情信息 -->
      <detail-base-info :goods="goods" />
      <!-- 店家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品具体数据 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <!-- 商品参数 -->
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <!-- 评论 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <!-- 推荐商品列表 -->
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar'

// 公共组件
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop'

// 网络请求
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail.js'

import { itemListenerMixin } from 'common/mixin'
import { debounce } from 'common/utils'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  props: {},
  data () {
    return {
      iid: null, // 商品id
      topImages: [], // 顶部图片
      goods: {}, // 商品详情信息数据
      shop: {}, // 店铺信息
      detailInfo: {}, // 商品真人秀数据
      paramInfo: {}, // 商品参数
      commentInfo: {}, // 评论数据
      recommends: [], // 推荐数据
      themeTopYs: [], // 标题内容对应的y值
      getThemeTopY: null, // 防抖
      currentIndex: 0, // 当前滚动到第几个主题
      isShowBackTop: false

    }
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad () {
      this.$refs.scroll.refresh()
      // 获取4个主题的offsetTop
      this.getThemeTopY()
    },
    // 点击标题，滚动到对应内容
    titleClick (index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    // 监听滚动到哪个主题
    contentScroll (position) {
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY和主题中值进行对比
      // [0，7938，9120，9452]
      // positionY 在 0 和 7938 之间，index=0
      // positionY 在 7938 和 9120 之间，index=1
      // positionY 在 9120 和 9452 之间，index=2

      // positionY 大于等于 9452值，index=3
      const length = this.themeTopYs.length
      // **法一 普通做法
      /*   for (let i = 0; i < length; i++) {
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])(
        // console.log(i);
        //}
        // 判断this.currentIndex != i 避免频繁打印

        if (
          this.currentIndex != i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      } */
      // **法二 hack做法，引入一个最大值与最后一个值进行比较
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 3.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
    },
    // 点击backtop回到顶部
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 加入购物车
    addToCart () {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2.将商品添加到购物车里面
      this.addCart(product).then(res => {
        this.$toast.show()
      })
    }
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

      // 商品真人秀数据
      this.detailInfo = data.detailInfo

      // 获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [] // 先清空，不然不止4个值
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE) // js里面number的最大值
    }, 100)
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
