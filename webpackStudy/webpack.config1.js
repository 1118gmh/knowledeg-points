let path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer: { //开发服务器的配置
        // open: true,
        port: 3000,
        progress: true,
        contentBase: './build',
        compress: true,
        hot: true
    },
    mode: 'development', //模式 默认两种 production development
    entry: './src/index.js', //入口
    output: { //出口
        filename: 'bundle.js', //打包后的文件名
        path: path.resolve(__dirname, 'build') //路径（必须是绝对路径）
    },
    // plugins: [
    //     new HotModuleReplacementPlugin(),
    //     new HtmlWebpackPlugin({ //
    //         template: './src/index.html',
    //         filename: 'index.html',
    //         minify: {
    //             removeAttributeQuotes: true, //去掉双引号
    //             collapseWhitespace: true //压缩成一行
    //         },
    //         hash: true //给引入的js文件添加hash值
    //     })
    // ],
    // module: {
    //     rules: [{
    //         test: /\.css$/,
    //         use: ['style-loader', 'css-loader']
    //     }, {
    //         test: /\.less$/,
    //         use: ['style-loader', 'css-loader', 'less-loader']
    //     }]
    // }
    // module: { //模块
    //     rules: [ //规则 css-loader接续@import这种语法
    //         //style-loader 它是把css插入到head的标签中
    //         //loader的特点：希望单一
    //         //loader的用法：
    //         //      =>字符串只用一个loader
    //         //      =>多个loader需要[]
    //         //loader的顺序：默认重右往左执行 冲下往上执行
    //         //loader还可以写成对象方式
    //         {
    //             test: /\.css$/,
    //             use: [{
    //                     loader: 'style-loader',
    //                     options: {
    //                         insertAt: 'top'
    //                     }
    //                 },
    //                 'css-loader' //@import 解析路径
    //             ]
    //         },
    //         {
    //             //可以处理less文件
    //             test: /\.less$/,
    //             use: [{
    //                 loader: 'style-loader',
    //                 options: {
    //                     insertAt: 'top'
    //                 }
    //             }, 'css-loader', 'less-loader']
    //         }
    //     ]
    // }

};