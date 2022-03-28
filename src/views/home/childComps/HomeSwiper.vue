<template>
  <!-- 首页轮播图 -->
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  components: { Swiper, SwiperItem },
  props: {
    banners: { // 轮播图数据
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false // 用于限制发送加载图片事件的次数
    }
  },
  methods: {
    // 轮播图的图片加载
    imageLoad () {
      // 如果已经发送则不再发送
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
</style>
