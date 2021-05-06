const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  mode:"production",
  optimization:{ //优化项
    minimizer:[ //可以添加压缩方案
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins:[
    new CleanWebpackPlugin(), //默认清空所有文件
    new BundleAnalyzerPlugin(),
]
}