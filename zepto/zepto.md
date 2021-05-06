### zepto

zepto VS JQ

- zepto是专门为移动端开发的小型类库，没有考虑浏览器的兼容，也仅仅是把JQ中的一些常规方法实现了，很多方法也没有实现（slideDown/show...在zepto中都没有）
- zepto中提供快乐移动端专门操作的事件方法，这些方法都是基于移动端的touch和gesture事件模型封装好的方法，JQ中并没有提供这些方法=>zepto更适合移动端

```js
//zepto中提供的专门供移动端操作的事件方法
$box.tap(ev=>{
    //点击
})
$box.singleTap(ev=>{
    //单机
});
$box.doubleTap(ev=>{
   	//双击
});
$box.longTap(ev=>{
    //长按
});

//=>滑动方法
//swipe / swipeLeft / swipeRight / swipeUp / swipeDown...
//=>缩放方法
//pinchIn / pinchOut
```

