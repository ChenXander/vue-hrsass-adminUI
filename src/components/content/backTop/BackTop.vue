<template>
  <!-- 返回顶部 -->
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  components: {},
  props: {},
  data () {
    return {}
  },
  methods: {
    backClick () {
      this.$emit('backClick')
    }
  }
}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
