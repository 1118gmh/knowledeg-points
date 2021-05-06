const path = require('path');

module.exports = {
  mode:"development",
  devServer: { //开发服务器的配置
    port: 3000,
    contentBase: path.resolve(__dirname,'../dist'),
    compress: true, //gzip 可以提升返回页面的速度
  },
  optimization:{
    usedExports:true 
  }
}