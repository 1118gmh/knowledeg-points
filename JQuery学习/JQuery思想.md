### jQuery思想

1. 不需要new，普通函数执行方式创建JQuery的实例

   ```js
   //问题：当new JQuery()执行时，创建了JQuery的实例，并且执行了代码，但是返回new JQuery();又创建一个JQuery的实例，执行JQuery方法；一直循环。
   let JQuery = function(){
       return new JQuery();
   };
   new JQuery();
   //解决：直接用普通函数执行的方式创建JQuery的实例
   //1. 创建一个init类
   //2. 让init原型指向JQuery类的原型（两个类公用一共原型）
   //3. 在JQuery类中，返回init的实例
   let JQuery = function(){
       return new init();
   }
   let init= function(){}
   init.prototype = JQuery.prototype;
   ```
   
2. 通过jQuery传递函数的方式，形成闭包

   ```js
   $(function(){
       //自己的代码
   });
   ```
   
3. 通过jQuery传递箭头函数 的方式，形成闭包，并且让函数在HTML结构加载完成后执行（这种方式还可以避免全局环境下的$被占用）
   
```js
   jQuery(() => {
    //函数会在当前页面中的HTML结构都加载完成后执行执行
       //函数执行会形成一个闭包
});
   ```
   
   
   
   
   
   
   
   
   
