module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 重命名文件路径，方便组件中使用
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}
