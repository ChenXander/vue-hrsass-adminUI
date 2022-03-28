<template>
  <div id="detail">
    <detail-nav-bar />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'

export default {
  name: 'Detail',
  components: { DetailNavBar },
  props: {},
  data () {
    return {
      iid: null
    }
  },
  methods: {},
  created () {
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>
</style>
