const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 修改端口
  devServer: {
    host: '127.0.0.1',
    port: '8000'
  },
  // 修改标题
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '醉仙楼'
      return args
    })
  }
})
