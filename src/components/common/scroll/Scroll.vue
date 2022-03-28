<template>
  <!-- 页面滚动组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入BetterScroll滚动插件
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  components: {},
  props: {
    probeType: { // BScroll中监测是否触发滚动scroll事件
      type: Number,
      default: 0
    },
    pullUpLoad: { // 上拉加载更多
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null // 滚动数据
    }
  },
  methods: {
    // 滚动时的参数
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 上拉加载更多
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    // 刷新上拉加载图片的高度
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 获取页面已滚动的距离
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted () {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true, // 开启对 content 以及 content 子元素 DOM 改变的探测
      probeType: this.probeType, // 监测是否触发滚动scroll事件
      pullUpLoad: this.pullUpLoad // 上拉加载更多
    })

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
