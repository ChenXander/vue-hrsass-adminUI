<template>
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
    probeType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    }
  },
  mounted () {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      probeType: this.probeType
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll', position => {
      this.$emit('scroll', position)
    })
  }
}
</script>

<style lang="less" scoped>
</style>
