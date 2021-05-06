const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");

// const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

//费时分析
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();

module.exports = (env) => {
  //env是环境变量
  let isDev = env.development;
  const base = {
    // entry: path.resolve(__dirname,'../src2/index.js'),
    entry: {
      a: path.resolve(__dirname, "../src3/a.js"),
      b: path.resolve(__dirname, "../src3/b.js"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.tsx?$/,
          use: "babel-loader",
        },
        {
          test: /\.js$/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          //是不是开发环境，如果是就用styleloader，不是就抽离css样式
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
        },
        {
          //图标的转换
          test: /\.(woff|ttf|eot|svg)$/,
          use: "file-loader",
        },
        {
          //图片的转换
          test: /\.(jpe?g|png|gif)$/,
          use: {
            loader: "url-loader",
            //如果大于1k的图片，会使用file-loader
            options: {
              name: "image/[contentHash].[ext]",
              limit: 1024,
            }, //file-loader的作用是拷贝
            //url-loader可以将比较小的图片转换成base64 比以前大，但好处是不用再发送http请求
          },
        },
      ],
    },
    output: {
      // filename:'bundle.js',
      filename: "[name].js", //同步打包的名字
      // chunkFilename: '[name].min.js', //同步动态加载文件的名字
      path: path.resolve(__dirname, "../dist"),
    },
    // externals:{
    //   'jquery':'$'
    // },
    optimization: {
      splitChunks: {
        //一般都抽离
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          vue:{ //引入次数为1时，单独抽离vue模块
            test: /[\\/]node_modules[\\/](vue)/,
            priority: -2,
            name:'vue', //给抽离的模块命名
            reuseExistingChunk: true
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
        },
      },
    },
    plugins: [
      // new HtmlWebpackExternalsPlugin({
      //   externals: [
      //     {
      //       module: "jquery",
      //       entry: "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js",
      //       // entry: "../jquery/dist/jquery.js",
      //       global: "jQuery",
      //     },
      //   ],
      // }),
      !isDev &&
        new MiniCssExtractPlugin({
          //如果是开发环境，就不用抽离样式
          filename: "css/main.css",
        }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"), //原文件路径
        filename: "index.html", //打包后文件
        minify: !isDev && {
          //不是开发环境就压缩
          removeAttributeQuotes: true, //去掉双引号
          collapseWhitespace: true, //压缩成一行
        },
        chunks: ["a", "b"],
        // hash: true //给引入的js文件添加hash值
      }),
      // new HtmlWebpackPlugin({
      //   template:path.resolve(__dirname,'../public/login.html'),
      //   filename:'login.html',
      //   minify: !isDev && {
      //     removeAttributeQuotes: true,
      //     collapseWhitespace: true
      //   },
      //   chunksSortMode:'manual', //手动设置引入模块的顺序
      //   chunks:['b','a'] //打包的顺序（先b后a）
      // }),
      !isDev &&
        new PurgecssPlugin({
          paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
            nodir: true,
          }),
        }),
    ].filter(Boolean),
  };
  if (isDev) {
    return smw.wrap(merge(base, dev));
  } else {
    return smw.wrap(merge(base, prod));
  }
};
