<template>
  <div id="home" class="wrapper">
    <!-- 首页顶部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />

    <!-- 滚动插件组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />

      <!-- 推荐栏 -->
      <recommend-view :recommends="recommends" />

      <!-- 本周流行 -->
      <feature-view />

      <!-- 分类控制栏 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{ fixed: isTabFixed }"
      />

      <!-- 商品列表 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 返回顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

// 公共的工具函数
import { debounce } from 'common/utils'

// 数据请求
import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [], // 轮播图数据
      recommends: [], // 推荐
      goods: {
        pop: { page: 0, list: [] }, // 流行页数据
        new: { page: 0, list: [] }, // 新品页数据
        sell: { page: 0, list: [] } // 精选页数据
      },
      currentType: 'pop', // 当前选中的分类
      isShowBackTop: false, // 返回顶部按钮显示与隐藏
      tabOffsetTop: 0, // 分类控制栏的滚动
      isTabFixed: false, // 用于判定是否tabControl吸顶
      saveY: 0
    }
  },
  computed: {
    // 计算商品分类的选中项
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata() // * 一定要加this，否则调用的是导入进来的函数而不是methods中封装的

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // 3.监听item图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 分类控制栏的点击事件
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 占位的tabControl和原tabControl同步
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 返回顶部按钮的点击事件
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    // 判断滚动距离决定是否显示返回顶部按钮
    contentScroll (position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    // 上拉加载更多事件
    loadMore () {
      // 上拉加载获取更多数据
      this.getHomeGoods(this.currentType)
    },

    // 轮播图的图片加载
    swiperImageLoad () {
      // 实现tabControl的吸顶效果
      // 所有组件都有一个元素$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关方法
    */
    // 获取主页数据
    getHomeMultidata () {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 获取商品数据
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 上拉加载更多完成
        this.$refs.scroll.finishPullUp()
      })
    }

  },
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    overflow: hidden;
  }
</style>
