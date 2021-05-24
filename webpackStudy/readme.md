    "webpack": "^5.24.4",

​    "webpack-cli": "^3.3.12",

​    "webpack-dev-server": "^3.11.2"

1. 初始化

```
npm init -y
```

2. 安装webpack和webpack-cli包

```
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

3. 打包

```
npx webpack [,配置文件名]  //默认配置文件 webpack.config.my.js
或
yarn webpack
或
npm run webpack
```

> 默认打包
>
> 打包的文件所在目录固定为dist
>
> 打包文件名默认为main.js

4. 打包js文件配置（webpack默认只能打包js文件，如果要打包其他文件，则要引入插件）

> 默认配置的文件名为：`webpack.config.js`

```js
let path = require('path');
module.exports = {
    mode:'development', //模式 默认两种 production development
    entry: './src/index.js',    //入口
    output: {                   //出口
        filename: 'bundle.[hash:6].js',  //打包后的文件名(hash:更新文件则产生不同的文件名)
        path: path.resolve(__dirname, 'build')  //路径（必须是绝对路径）
    }
};
```

```js

(() => { // webpackBootstrap
    var __webpack_modules__ = ({
        "./src/index.js":
            (() => {
            eval("console.log('hello world');\n\n//# sourceURL=webpack://webpackStudy/./src/index.js?");
        })
    });
    var __webpack_exports__ = {};
    __webpack_modules__["./src/index.js"]();
})();
```
5. webpack的两种模式，在项目中，一般将webpack文件集中到build文件夹中。
```
由于webpack有两种模式，开发模式和生产模式

这样就可以将所有的webpack文件，统一放到build文件夹中，分为：
    -build
        -webpack.base.js  webpack公共文件夹（用于存放webpack公共配置和整合开发环境配置和生产环境配置）
        -webpack.dev.js  webpack开发环境配置文件
        -webpack.prod.js webpack生产环境配置文件
    
那么如何实现这种分类管理呢？
    1. 在package.json中配置开发打包命令和生产打包命令
        "build": "webpack --env.production --config ./build/webpack.base.js" //生产 
        "dev": "webpack --env.development --config ./build/webpack.base.js" //开发
        
        env是环境变量，env.produvtion/development是给env挂载属性，用于区分是开发开始生产  
        --config用于指定执行的文件是哪一个，默认执行的是webpack.config.js文件，要指定到build文件夹中的文件，统一指定到base文件中，在base文件中在区分是开发还是生产
    
    2. 在build中分别配置3个文件
        【base】
        const dev = require('./webpack.dev');
        const prod = require('./webpack.prod');
        const path = require('path');
        const {merge} = require('webpack-merge');
        const { output } = require('../webpack.config1');
        //导出函数返回模块
        module.exports = (env)=>{ //env是环境变量
            let isDev = env.developemt;
            const base = {
                entry: path.resolve(__dirname,'../src/index.js'),
                output:{
                    filename:'bundle.js',
                    path: path.resolve(__dirname,'../dist')
                }
            };
            //根据给env挂载的变量区分是开发还是生产
            if(isDev){
                return merge(base,dev); 
            }else{
                return merge(base,prod);
            }
        }
        
        webpack-merge模块中的merge方法可以用来合并模块，将base模块和dev/prod模块合并
        【dev】
        module.exports = {
        mode:"development"
        }
        【prod】
        module.exports = {
        mode:"production"
        }
        
配置的命令
        开发环境打包
        "build": "webpack --env.production --config ./build/webpack.base.js",
        生产环境启动服务
        "dev": "webpack-dev-server --env.development --config ./build/webpack.base.js",
        生产环境打包
        "dev:build": "webpack --env.development --config ./build/webpack.base.js" 
```

6. 如果是开发环境，要使用webpack-dev-server,来提供静态服务

```js
/**
 *作用
 *	1. 为静态文件提供服务
 *	2. 自动更新和热替换
 */
    
//下载包
npm install webpack-dev-server --save-dev

//在package.json中配置命令
//生产环境下启动服务
"dev": "webpack-dev-server --env.development --config ./build/webpack.base.js", 

//命令使用
npx/yarn dev
//在内存中打包，不会产生文件

//开发服务器的配置webpack.config.js
const webpack = require('webpack');
module.exports = {
    devServer: { 
        open:true, //自动打开浏览器
        port: 3000, //设置启动时的运行端口
        progress: true, //
        contentBase: './build', //指定托管的根目录
        compress: true, //gzip 可以提升返回页面的速度
        hot:true, //启动热更新（第一步）
        proxy:{   //proxy代理
            '/':{
                target:'http://127.0.0.1:3001', //代理服务器
                changeOrigin:true //允许跨域
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin() //new一个热更新的模块对象，这是启动热更新的（第三步） 
    ]
};
```

7. 打包 html文件配置

```js
//安装html-webpack-plugin模块
npm install html-webpack-plugin -D

//配置webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins:[
        new HtmlWebpackPlugin({
            template:'../public/index.html', //原文件路径
            filename:'index.html', //打包后文件
            minify: {
            	removeAttributeQuotes: true, //去掉双引号
            	collapseWhitespace: true //压缩成一行
            },
            hash: true //给引入的js文件添加hash值
        })
    ]
}
//静态资源文件模板，通过html-webpack-plugin可以自动在模板中引入js文件并且打包html文件
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

8. 打包之前先清除文件夹中所有文件，之后再打包
```
npm i clean-webpack-plugin -D

在生产环境中清空
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

new CleanWebpackPlugin(), 

每次打包之前先清空dist目录下所有文件,

```
9. 处理css、less、sass、stylus文件配置

```js
//安装loader模块 
npm install css-loader style-loader -D
npm install less less-loader -D

module.exports = {
    //规则 
    //css-loader 解析css语法
    //style-loader 它是把css插入到head的标签中
    //loader的特点：希望单一
    //loader的用法：
    //      =>字符串只用一个loader
    //      =>多个loader需要[]
    //loader的顺序：默认重右往左执行 冲下往上执行
    //loader还可以写成对象方式
    module: { //模块
        rules: [ //规则
            {	//第一个规则可以处理css文件
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
                    'css-loader' //@import 解析路径
                ]
            },
            {
                //可以处理less文件
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                }, 'css-loader', 'less-loader'] //先执行less-loader，将less转为css,在执行css-loader，将@import解析，最后执行style-loader，将css插入到head标签中
            }
        ]
    }
}
//开发环境，就直接使用css-loader
//如果是生产环境，可以使用mini-css-extract-plugin抽离css样式

//1. 安装模块
npm install mini-css-extract-plugin
//2. 引入模块
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
//3. 创建实例new
    plugins:[
      !isDev && new MiniCssExtractPlugin({ //如果是开发环境，就不用抽离样式
        filename:'css/main.css'
      })
    ].filter(Boolean) //如果是false，则不行，要过滤掉
//4. 使用loader
     module: {
        rules: [{
            test: /\.css$/,
            //是不是开发环境，如果是就用styleloader，不是就抽离css样式
            use: [isDev?'style-loader':MiniCssExtractPlugin.loader, 'css-loader']
        }]
    },
//5. 生产环境需要压缩，使用optimize-css-assets-webpack-plugin，
//使用这个插件压缩css，会导致js压缩取消，需要引入额外插件压缩，terser-webpack-plugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
  mode:"production",
  optimization:{ //优化项
    minimizer:[ //可以添加压缩方案
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }
}
```

10. 图片的打包 file-loader、url-loader
```
        {//图标的转换
          test:/\.(woff|ttf|eot|svg)$/,
          use:'file-loader'
        },
        {//图片的转换
          test:/\.(jpe?g|png|gif)$/,
          use:{
            loader:'url-loader',
            //如果大于1k的图片，会使用file-loader
            options:{
              name:'image/[contentHash].[ext]',
              limit:1024
            }//file-loader的作用是拷贝
            //url-loader可以将比较小的图片转换成base64 比以前大，但好处是不用再发送http请求
          }
        }
```

11. es6转es5
```
vue-cli基于babel6来实现的

babel7
在配置babel-loader规则后，默认会调用@babel/core转换代码，转换的时候，需要用@babel/presets-env转换成es5
@babel/core @babel/preset-env babel-loader

实现：
1. 安装模块
    @babel/core @babel/preset-env babel-loader
2. 配置规则
          {
            test:/\.js$/,
            use:"babel-loader"
          },
3. 配置.babelrc文件（也可以写在规则中的options中）
{
  "presets": [ //presets(插件包)从下往上执行
    ["@babel/preset-env",{
      //使用的api会自动转换，并且是按需加载
      "useBuiltIns":"usage",
      //preset-env的补丁，可以解析高级的语法(需要安装模块npm install core-js@2 -D)
      "corejs":2
    }]
}

4. 草案语法需要安装一起其他的插件

    - 解析装饰器
    ["@babel/plugin-proposal-decorators",{"legacy":true}], //解析装饰器（必须卸载类属性插件前面，且legacy(保留装饰器)为true时，loose必须为true）

    - 解析类属性
    ["@babel/plugin-proposal-class-properties",{"loose":true}] // 解析类属性插件（宽松语法）

5. 使用import语法，在打包的时候，会将代码复制一次过来，造成代码冗余
    npm install --save @babel/runtime //在生产环境中安装这个
    npm install --save-dev @babel/plugin-transform-runtime //在开发环境中安装这个，用来调生产环境中的@babel/runtime

    在插件中配置
  "plugins": [ //plugins(插件)从上往下执行
    "@babel/plugin-transform-runtime"
  ]
```
12. eslint代码校验
```
安装eslint
    npm install eslint
初始化配置文件
    npx eslint --init 
使用规则
{
    test:/\.js/,
    enforce:'pre',
    use:'eslint-loader'
},

配置`eslint-loader`可以实时校验js文件的正确性,`pre`表示在所有`loader`执行前执行
```
13. 配置ts环境
```
1. 使用ts-loader来配置

(1)安装ts-loader模块
    npm install typescript ts-loader --save-dev
(2)生成ts的配置文件
    npx tsc --init
(3)配置ts-loader
    {
        test:/\.tsx?/,
        use: ['ts-loader'],
        exclude: /node_modules/
    }
(4)将入口文件更改成ts文件
    let a:string = 'hello';
    console.log(a);
(5)执行npm run dev发现已经可以正常的解析ts文件啦！

2. 使用preset-typescript来配置（不需要借助typescript）
(1)安装模块
    npm install @babel/preset-typescript
(2)配置
    {
        "presets": [
            ["@babel/preset-env",{
                "useBuiltIns":"usage",
                "corejs":2 
            }],
            "@babel/preset-react",
            ["@babel/preset-typescript",{
                "allExtensions": true  
            }]
        ],
        "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties",{"loose":true}],
            "@babel/plugin-transform-runtime"
        ]
    }
(3)使用typescript来校验代码是否符合规范
    npm install typescript //安装typescript（仅仅用来校验）
    npx typescript --init //初始化typescript的配置文件
    这样之后，写代码时就可以实时校验了

```
14. 配置 ts + vue 环境
```
(1)ts环境配置（参考13）
(2)增加vue-shims.d.ts，可以识别.vue文件（就是将.vue文件标识为vue模块，这样就可以在文件中引入vue了）
    declare module '*.vue' {
        import Vue from 'vue';
        export default Vue;
    }

    import App from './App.vue';
    相当于原来的
    import App from './App';
(3)但是.vue现在也识别不了，需要安装模块来识别
    安装模块
    npm install vue-loader  vue-template-compiler --save-dev
    vue-loader //解析vue文件
    vue-template-compiler //解析vue文件中的template

    配置规则
    {
    test:/\.vue$/,
    use:'vue-loader'
    },

    引入插件
    const VueLoaderPlugin = require('vue-loader/lib/plugin');
    new VueLoaderPlugin();
(4)但是.vue文件中的ts语法不认识，需要配置allExtensions为true，将vue文件转化为ts文件，在通过"@babel/preset-typescript"转为js文件
    //使用preset-typescript来配置ts环境（不需要借助typescript）（allExtensions将所有其他文件转换为ts文件，再通过这个插件包转为js文件）
    ["@babel/preset-typescript",{
      "allExtensions": true  
    }]

```
15. 配置 ts + react 环境
```
安装react的模块，和校验react的模块
    npm i @babel/preset-react --save-dev # 解析jsx语法
    npm i react @types/react @types/react-dom react react-dom typescript 
    
    react react-dom 用来写react语法的
    @types/react @types/react-dom typescript 用来校验react语法的
    @babel/preset-react 用来解析jsx语法的（需要改配置文件："jsx": "react"）

```
16. 优化方案
```
【删除无用的css样式】
    npm install purgecss-webpack-plugin glob -D # 删除无用css样式 搜索文件 这两个配合着用

    const glob = require('glob');
    const PurgecssPlugin = require('purgecss-webpack-plugin');

    !isDev && new PurgecssPlugin({
    paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, { nodir: true }) // 不匹配目录，只匹配文件
    })

    动态加载的样式可能会也会去掉，因此要指定文件目录，防止被去掉

【图片压缩插件】（测试出了点bug，暂时没搞懂哪错了）
    npm install image-webpack-loader --save-dev

    在file-loader之前使用图片压缩插件压缩

    rules: [{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
        'file-loader',
        {
        loader: 'image-webpack-loader',
        options: {
            mozjpeg: {
            progressive: true,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
            enabled: false,
            },
            pngquant: {
            quality: [0.65, 0.90],
            speed: 4
            },
            gifsicle: {
            interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
            quality: 75
            }
        }
        },
    ],
    }]

【CDN加载文件】
    (1)通过cdn方式引入资源
        - 可以直接在公共静态html文件中添加script标签引入
            <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
        - 也可以通过add-asset-html-cdn-webpack-plugin插件添加
            const AddAssetHtmlCdnPlugin = require('add-asset-html-cdn-webpack-plugin')
            new AddAssetHtmlCdnPlugin(true,{
                'jquery':'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
            })
    (2)由于import的时候，还会打包一次，因此需要在配置文件中标注jquery是外部的，这样打包时就不会将jquery打包了
        externals:{
            'jquery':'$'
        }
    
    上面这两步，可以通过html-webpack-externals-plugin插件一步搞定
    npm install html-webpack-externals-plugin -D
    const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
    plugins: [
        new HtmlWebpackExternalsPlugin({
          externals: [{
            module: 'jquery',
            entry: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
            global: 'jQuery'
          }]
        })
    ],
    这个插件完成了两步，一是添加jquery模块到externals对象中用来将其排除，并且在window对象上挂载了jQuery的全局对象；二是添加<script type="text/javascript" src="https://unpkg.com/jquery@3.2.1/dist/jquery.min.js"></script>到html文件中
【tree-shaking && Scope-Hoisting】
(1)tree-shaking
    就是将没有用的东西摇晃掉（webpack默认）

    main.js
        import { minus } from "./calc";
        console.log(minus(1,1));


    calc.js
        import {test} from './test';
        export const sum = (a, b) => {
        return a + b + 'sum';
        };
        export const minus = (a, b) => {
        return a - b + 'minus';
        };


    test.js
        export const test = ()=>{
            console.log('hello')
        }
        console.log(test());

    上述代码其实我们主要使用`minus`方法，`test.js`代码是有副作用的!
    webpack在production打包时会自动tree-shaking，将没用的代码过滤掉，但是会有副作用（就是test.js的代码还是会执行的）
    
    在package.json中配置
        "sideEffects":false,
    这样test.js（副作用代码）的代码就不会执行了，但是会导致import './style.css'导入的css文件也不会，因此
        "sideEffects":["**/*.css"]
    这样就可以正常导入css了

    在开发环境下默认`tree-shaking`不会生效,可以配置标识提示（就是在dev:build打包后，添加点提示的代码）
        optimization:{ //优化项
            usedExports:true 
        }
(2)Scope-Hoisting（也是webpack内置的）
    作用域提升,可以减少代码体积，节约内存
        let a = 1;
        let b = 2;
        let c = 3;
        let d = a+b+c
        export default d;
        // 引入d
        import d from './d';
        console.log(d)
    最终打包后的结果会变成 `console.log(6)`
    - 代码量减少
    - 减少多个函数后内存的占用
    
【DllPlugin && DllReferencePlugin】（就是通过dll将第三方模块单独打包，在开发时由于第三方模块已经打包好了，就不用打包了，节约开发环境时打包的时间）（一般只用到开发环境上）
    每次构建时第三方模块都需要重新构建，这个性能消耗比较大，我们可以先把第三方库打包成动态链接库，以后构建时只需要查找构建好的库就好了，这样可以大大节约构建时间
        import React from 'react';
        import ReactDOM from 'react-dom';

        ReactDOM.render(<h1>hello</h1>,document.getElementById('root'))
    (1)将`react`、`react-dom`单独进行打包，需要单独创建`webpack.dll.js`
        const path = require('path');
        const DllPlugin = require('webpack/lib/DllPlugin');
        module.exports = {
            entry:['react','react-dom'],
            mode:'production',
            output:{
                filename:'react.dll.js',
                path:path.resolve(__dirname,'dll'),
                library:'react'
            },
            plugins:[
                new DllPlugin({
                    name:'react',
                    path:path.resolve(__dirname,'dll/manifest.json')
                })
            ]
            }
        执行`"webpack --config webpack.dll.js`命令，可以看到dll目录下创建了两个文件分别是`manifest.json`,`react.dll.js`
        通过`manifest.json`找到`react.dll.js`文件中的模块进行加载

    (2)在我们的项目中可以引用刚才打包好的动态链接库
        const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
        const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
        // 构建时会引用动态链接库的内容
        new DllReferencePlugin({
            manifest:path.resolve(__dirname,'dll/manifest.json')
        }),
        // 需要手动引入react.dll.js
        new AddAssetHtmlWebpackPlugin(
            { filepath: path.resolve(__dirname,'dll/react.dll.js') }
        )

【动态加载文件】
    实现点击后动态加载文件
        let btn = document.createElement('button');
        btn.innerHTML = '点击加载视频';
        btn.addEventListener('click',()=>{
            import('./video').then(res=>{
                console.log(res.default);
            });
        });
        document.body.appendChild(btn);

    给动态引入的文件增加名字
        output:{
        chunkFilename:'[name].min.js'
        }
        import(/* webpackChunkName: "video" */ './video').then(res=>{
            console.log(res.default);
        })
    这样打包后的结果最终的文件就是 `video.min.js`

【多入口】
    (1)设置入口为多入口
        entry:{
        'a':path.resolve(__dirname,'../src3/a.js'),
        'b':path.resolve(__dirname,'../src3/b.js'),
        },
    
    (2)设置出口为多出口
        filename:'[name].js', //表示打包后的名字a.js / b.js

    (3)多个静态页面引入多个模块（可以指定引入顺序）
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'), //原文件路径
            filename:'index.html', //打包后文件
            minify: !isDev && { //不是开发环境就压缩
            removeAttributeQuotes: true, //去掉双引号
            collapseWhitespace: true //压缩成一行
            },
            chunks:['a']
            // hash: true //给引入的js文件添加hash值
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/login.html'), 
            filename:'login.html',
            minify: !isDev && { 
            removeAttributeQuotes: true, 
            collapseWhitespace: true 
            },
            chunksSortMode:'manual', //手动设置引入模块的顺序
            chunks:['b','a'] //打包的顺序（先b后a）
        }),

【打包文件分析工具】
    在生产环境中配置，在打包后可以开启一个本地8888端口服务，可以分析打包后的文件
    npm install --save-dev webpack-bundle-analyzer
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
    mode !== "development" && new BundleAnalyzerPlugin()

【抽离第三方模块，公共模块splitChunks】（可以在开发或生产环境下使用）
    在优化项中配置splitChunks的默认行为，可以抽离第三方模块（需要去掉cdn加载文件配置）（不要和dll一起使用）
        optimization: { //优化项
            splitChunks: {
                //async 异步 initial 同步 all 都支持 ,一般都支持
                chunks: 'async', // 默认支持分割异步模块
                minSize: 30000, // 分割的文件最小大小
                maxSize: 0, 
                minChunks: 1, // 引用次数
                maxAsyncRequests: 5, // 最大异步请求数
                maxInitialRequests: 3, // 最大初始化请求数
                automaticNameDelimiter: '~', // 抽离的命名分隔符
                automaticNameMaxLength: 30, // 名字最大长度
                name: true,
                cacheGroups: { // 缓存组
                    vue:{ //引入次数为1时，单独抽离vue模块
                        test: /[\\/]node_modules[\\/](vue)/,
                        priority: -2,
                        name:'vue', //给抽离的模块命名
                        reuseExistingChunk: true
                    },
                    vendors: { // 先抽离第三方
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                        reuseExistingChunk: true
                    },
                    default: { //默认抽离引入超过2次的模块
                        minChunks: 2,  //就是只要引入了2次或以上就单独打包
                        priority: -20, // 优先级
                        reuseExistingChunk: true
                    }
                }
            }
        },
【费时分析】
    可以在打包时用来分析各方面费时
        npm install speed-measure-webpack-plugin -D
        const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
        const smw = new SpeedMeasureWebpackPlugin();
        module.exports =smw.wrap({...});
```