### swiper

> 这是一个插件，可以实现手机、电脑网页大部分滑动的功能，焦点图、tab、触摸导航等

#### swiper使用

1. 引入两个文件

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="dist/css/swiper-bundle.min.css">
</head>
<body>
    ...
    <script src="dist/js/swiper-bundle.min.js"></script>
    ...
</body>
</html>
```

2. html内容

```html
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
导航等组件可以放在container之外
```

3. 设置样式

```css
.swiper-container {
    width: 600px;
    height: 300px;
    .swiper-wrapper{
        ...
    }
}  
```

4. 初始化swiper

```js

<script>        
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        
  </script>
```

5. 现在已经可以正常切换了

   如果作为CommonJs 或ES 模块引入

```js
//CommonJs
var Swiper = require('swiper');    
var mySwiper = new Swiper('.swiper-container', { /* ... */ });

//ES
import Swiper from 'swiper';    
var mySwiper = new Swiper('.swiper-container', { /* ... */ });
```

#### swiper 配置项

```

【循环播放】
loop:true;
【自动轮播】
autoplay:{
	delay:3000;
} //每3秒切换一次

【切换效果】
effect: fade | cube | overflow | flip

【事件】
on：{
	init:function(){} 
	transitionEnd:function(){} 
	
}

【分页器】
pagination:{
	el:'.swiper-pagination' //分页器的容器
	type:'bullets'|'fraction'|'progressbar'//分页器种类(默认圆点)
}
```

#### swiper私有属性和公有方法

```js
let swiper = new Swiper('...'); 

//私有属性
swiper.activeIndex:当前展示的slide的索引
swiper.slides:获取所有的slide（数组）
...

//公有方法
swiper.slideTo(index[,speed]):切换到指定索引的slide,
...
```

