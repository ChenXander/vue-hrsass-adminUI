<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index" class="swiper-item">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'

export default {
  name: 'DetailSwiper',
  components: { Swiper, SwiperItem },
  props: {
    topImages: { // 轮播图数据
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
