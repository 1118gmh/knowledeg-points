module.exports = {
  devServer: {
    // 跨域请求：PROXY代理
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
    },
  },
}