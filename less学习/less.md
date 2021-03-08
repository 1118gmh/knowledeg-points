### less

> 它是css预编译语言，和它类似的还有sass、stulus
>
> css是标记语言，不是编程语言，没有类、实例、函数、变量等东西；而less等预编译语言就是让css具备面向对象编程的思想；但是浏览器不能直接识别和渲染less代码，需要我们把less代码预先编译为正常的css后，交给浏览器渲染解析；

### less的编译

- 在开发环境下编译（产品还没有开发完，正在开发中，这个是开发环境）
> 导入less.js即可

```html
<!-- 1. less引入 -->
<link rel="stylesheet/less" href="css/demo1.less">
<!-- 2. 导入JS文件即可 -->    
<script src="js/less.min.js"></script>
```

- 在生产环境下编译（参评开发完成了，需要部署到服务器上）

> 项目上线，不能把less部署，这样用户每一次打开页面都需要重新的编译非常耗性能，我们部署到服务器上的是编译后的css

```
1. 在当前电脑的全局环境下安装less模块	
	$ npm install less -g

	验证是否安装成功：$ lessc -v

2. 基于命令把我们的less编译成css
	$ lessc xxx/xxx.lexx xxx/xxx.min.css -x
	把指定目录中的less编译成css（并且实现代码压缩），把编译后的css存入到具体指定路径中的文件中；上线前在HTML中导入css文件。
```

- 目前基于webpack和框架实现工程化开发的时候，我们都是在webpack配置文件中，配置出less的编译（需要安装less/less-loader等模块）

  这样不管是开发环境下的预览，还是部署到生产环境下，都是基于webpack中的less模块编译的。

### less基础操作

1. 变量

> 用变量存储一个公共值，后期需要使用这个值，直接调取变量即可，以后如果这个值需要修改，只需要更改变量的值，那么所有用到这个变量的地方都跟着修改了

```less
- 设置公共颜色
	@color: red;
	color: @color;
- 设置公共目录部分，然后通过`@{}`拼接到字符串中
	@bg-src:"../img";
	background: url("@{bg-src}/1.jpg") no-repeat;
```

2. 嵌套

```less
@H:200;
.pub{
    @H:300;
    .bg{ /*.pub .bg*/
        a{
            width: @h; //500
        }
        @H:500;
    }
    & > .bg{ /*.pub > .bg*/

    }
    &.bg{/*.pub.bg*/

    }
    &:hover{/*.pub:hover*/

    }
}
```

3. 函数

```less
//=>新建一个common.less文件,用于保存所有函数
.centerPos(@w:100,@h:100){
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: unit(-(@h/2),px);
    margin-left: unit(-(@w/2),px);
}
.transition(@property:all,@duration:.5s,@timing-function:linear,@delay:0s){
    -webkit-transition: @arguments;
    transition: @arguments;
}

//=>使用函数时先导入
@import (reference) "common";//reference：只导入内容，不编译
//=>导入后使用
.cc{
    .transition;//默认值
    .transition( @duration:1s)
}
.box{
	.centerPos(200, 200);
}
```



