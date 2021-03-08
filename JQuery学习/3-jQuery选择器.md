### jQuery选择器

```js
//=>JQ选择器：基于各种选择器创建一个JQ实例（JQ对象）
//1. selector：选择器的类型（一般都是字符串，但是支持函数或者元素对象）
//2. context：基于选择获取元素时候指定的上下文（默认document）
//JQ对象：一个类数组结构（JQ的实例），这个类数组集合中包含了获取到的元素
/**
 * JQ选择器的selector可以是字符串，字符串这种格式也有两种
 * 1. 选择器
 * 2。 HTML字符串拼接的结构，把拼接号的HTML字符串转换为JQ对象
 */
$('<div id = "AA"></div>').appendTo(document.body);
console.log($('.tab'));
console.log($('.tab>ul>li'));
/**
 * 获取页面中的元素对象
 * 1. 基于原生JS提供的属性和方法获取=>原生JS对象
 *      可以调取使用内置的JS属性和方法
 *      className
 *      onclick
 *      ...
 * 2. 基于JQ选择器对象获取 => "JQ对象"
 *      可以调取JQ原型上提供的属性和方法
 *      add
 *      find
 *      ...
 * =>将JQ对象和原生JS对象相互转换
 *      [JQ -> JS]
 *      JQ对象是一个类数组集合，集合中每个索引对应的都是原生JS对象，
 *      let $tab = $('.tab');变量名前面是以$开始的，一般代表基于JQ选择器获取的结果
 *      let tab = $tab[0];基于类数组索引，获取原生JS对象（好一点）
 *      let tab = $tab.get(0);基于jQuery对象中的get方法，返回原生JS对象
 *      $tab.eq(0);基于索引获取某一项，返回的是JQ对象
 *      
 *      [JS -> JQ]
 *      let tab = document.querySelector('.tab');原生JS对象
 *      
 *      $(tab); 直接使用选择器将JS对象包裹起来，就会把JS转化为JQ对象（因为$()就是创建一个JQ的实例）
 * 
 */
/**
 * selector传递的值支持三种类型
 * 1. string 基于选择器获取元素
 * 2. 元素对象 selector.nodeType 把JS对象转换为JQ对象
 * 3. 函数：把传递的函数执行，把JQ当做实参传递给函数
 * 
 */
//一种写法：可以防止$被占用
var $ = 'hahh';
//$('tab');报错，$被占用
jQuery(function($) {
    //=>$：传递进来的JQuery
    //函数执行，形成闭包
    console.log($('tab'));
});

jQuery(() => {
    //函数会在当前页面中的HTML结构都加载完成后执行执行
    //函数执行会形成一个闭包
});
//平时项目中，使用这种方式，把自己的代码包起来
$(function(){
    //自己的代码
});
```

