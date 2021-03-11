## PromiseA+

### 复习promise

```js
new Promise((resolve,reject)=>{//在这个函数中可以管控异步操作
    //resolve(); 成功
    //reject(); 失败
}).then(result=>{ 	//每一次调取then方法，都会返回一个新的promise实例
    //成功则执行resolve
}).catch(reason=>{ //相当与.then(null,reason=>{})
	//失败执行    
});

```

### 封装基础版Promise库

原理

![](D:\knowledeg-points\Promise A+\promise原理.png)

```js

```



