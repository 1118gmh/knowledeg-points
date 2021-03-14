### jQuery中常用的方法



添加

- append()：爸爸里面加儿子
- appendTo()：将JQ对象添加到指定容器中（儿子加到爸爸里面）
- html()：往元素中添加内容（类似innerHTML）
- add()：在一个jq集合中增加一些新的元素，类似于数组的拼接

筛选

- filter()：同级筛选
- children()：子集筛选
- find()：后代筛选

获取元素

- get():根据索引获取元素，返回JS对象（不传参，则可将类数组集合转换为数组）
- eq():根据索引获取元素，返回JQ对象

获取元素属性

- outerHeight()：获取元素高度（等同于JS中的offsetHeight属性）
- outerWidth()：获取元素高度（等同于JS中的offsetWidth属性）
- index（）：获取元素的索引
- attr('href')：获取元素的具体（href）属性
- 

DOM

- next()：弟弟
- nextAll()：所有弟弟
- offsetParent()：父级参照物
- parent()：当前元素的父亲
- parents()：当前元素的祖先
- prev()：哥哥
- prevAll()：所有哥哥
- siblings()：所有兄弟

排序

- sort()：类似于JS中的sort的使用

遍历

- each()

> JQ中each方法是用来进行遍历的（类似于数组的forEach方法）
>
> 【可遍历内容】
>
> - 数组
> - 对象
> - 类数组
>
> 【三种each】
>
> - 给jQuery设置私有属性：$.each()
> - 给实例设置公有属性：$([selector]).each()
> - 内置的each

```js
//遍历数组
$.each([12,23,34],(index,item)=>{
    //参数的顺序和内置的forEach相反
    console.log(index,item);
});
//遍历对象
$.each({name:'xiaoming',age:11},(key,value)=>{
    console.log(key,value);
});
//内置的each()：不用调取each，内置遍历方法
//JQ中的方法都采取了这种内置each方式，也就是说不用自己再调用each了
$('.tab li').on('click', function() {
    $(this).css({
        color: 'red'
    });
});
```

- $.ajax()

> 基于AJAX获取数据

```js
$.ajax({
    url:'json/product.json',
    methods:'GET',
    dataType:'json', //默认
    async:false,
    success:function(result){
        console.log(result);
    }
});
```

动画

- animate()

```js
let $box = $('#box');
$box.stop().animate({
    left:500,
    top:500
},5000,'linear',()=>{
    $box.css({
        background:'blue'
    });
});
```

- stop()：结束当前正在执行的动画，继续执行下一个动画，（从哪停的，从哪开始下一个动画）
- finish()：结束当前正在执行的动画，让元素立即运动到目标位置，从上一个动画的目标位置作为下一个动画的起始位置，

快捷动画

- show() / hide() / toggle()：展示，隐藏，当前展示就隐藏当前隐藏就显示
- fadeIn(time) /fadeOut() / fadeToggle() ：在xxxms内渐现动画，渐隐，当前展示就渐隐当前隐藏就渐现
- slideDown() / slideUp() / slideToggle():展开 ，卷起，当前显示就卷起当前隐藏就展开



- noConflict()

> 转让JQ使用$的权利，避免与其他框架的$重复

```js
jQuery.noConflict();//=>转让JQ使用$的权利
console.log($);//=>undefined
jQuery.noConflict(true);//深度转让；把jQuery这个名字也转让出去，返回结果赋值给一个变量，此时这个白能量
```

