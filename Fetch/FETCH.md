### FETCH

> Fetch不是AJAX，它诞生的目的是为了代替AJAX，是JS中内置的API：基于Fetch可以实现客户端和服务器端的信息通信

**fetch API**

```js
const response = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,
  referrer: "about:client",
  referrerPolicy: "no-referrer-when-downgrade",
  mode: "cors", 
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  integrity: "",
  keepalive: false,
  signal: undefined
});
```

```
method:http请求方法
headers:一个对象，定制请求头
body：post 请求体
	
credentials
	same-origin:同源发送cookie，跨域不发送
	include:不管同源还是跨域都发送
	omit:一律不发送

```



#### 基础操作

1. fetch的坑

   - Fetch是ES2018规范中新增的API，所以浏览器兼容性不是很好（可以基于babel的最新语法解析包，把其进行解析），向要兼容性好一些，需要使用	fetch polyfill
   - cookie的传递：需要设置`credentials: 'include'`
   - 需要在服务器状态码后手动判断是否是4或者5开头，若是，则抛出异常。

   

2. 使用fetch发送请求

```js
fetch('...',{
    method:'GET',
    headers:{
        //设置请求头信息
        'content-type':'x-www-form-urlencode'
    },
    //不管同源还是跨域请求都带着cookie信息
    credentials:'include' 
}).then(result =>{
    //result:响应的数据，一个数组
	/*
	    body: (...) 
        bodyUsed: false
        headers: Headers {} 包含响应头信息
        ok: true 
        redirected: false 是否重定向
        status: 200 状态码
        statusText: "OK" 状态信息
        type: "basic" 请求方式 同源
        url: "http://127.0.0.1:5500/axios/json/data.json" 请求地址
        _proto_:Response
        	arrayBuffer()
        	blob()
        	json()
        	text
        	...
        	基于这些方法可以快速的把 服务器获取的结果找到
	*/
}).catch(msg => {
    
});
```

```js
//常用写法
//get
fetch('...').then(result => {
    //由于fetch在状态码4或5开头不报错，因此需要手动处理
    let {status} = result;
    if(/^(4|5)\d{2}$/.test(status)){
        throw new Error('query data is error!');
        return;
    }
    return result.json();
}).then(result =>{
    //...
}).catch(msg =>{
    //...
});
//post
//get
fetch('...',{
    method:'POST',
    body:'a=1&b=2'
}).then(result => {
    let {status} = result;
    if(/^(4|5)\d{2}$/.test(status)){
        throw new Error('query data is error!');
        return;
    }
    return result.json();
}).then(result =>{
    //...
}).catch(msg =>{
    //...
    console.log(msg); //如果发生4/5错误，在这里可以捕获到自己定义的错误信息
});
```