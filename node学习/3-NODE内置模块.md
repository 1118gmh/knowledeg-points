### node内置模块

1. fs内置模块

> 导入

```js
let fs = require('fs');
```

> 使用：实现I/O操作

```js
1. fs.mkdir / fs.mkdirSync：
	创建文件夹（异步、同步）（一般都是异步）
	fs.mkdir('./less',err=>{
        if(err){
            console.log(err);
            return;
        }
    });    
2. fs.readdir / fs.readdirSync:
	读取文件夹
    fs.readdir('./',(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(result);//返回一个数组 [ '1-NODE基础概念.md', '2-NPM模块管理.md', '3-NODE内置模块.md', 'fsTest', 'less' ]
    });

3. fs.rmdir 
	删除文件夹
    fs.rmdir('./less',err=>{
        if(err){
            console.log(err);
            return;
        }
    });
    
4. fs.readFile:
	读取文件中的内容
    fs.readFile('./less.js', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});
5. fs.writeFile:
	向文件中写入内容（覆盖写入）
    fs.writeFile('./less.js','haha','utf-8',err=>{
        if(err){
            console.log(err);
            return;
        }
    });

6. fs.appendFile:
	追加写入新内容，原有内容还在
	fs.appendFile('./fsTest.js', 'hshs',, err => {
    	if (err) {
        	console.log(err);
        	return;
    	}
	});

7. fs.copyFile:
	拷贝文件到新的位置
    fs.copyFile('./less.js','./less/less.js',err=>{
        if(err){
           console.log(err);
            return;
           }
        console.log('ok');
    });

8. fs.unlink:
	删除文件
    fs.unlink('./less.js',err=>{
        if(err){
            console.log(err);
            return;
        }
    });

```

2. path内置模块

> 导入

```js
let path = require('path');
```

> 使用

```js
1. path.resolve
	path.resolve():返回当前模块的绝对地址（不包含模块名称）<=> __dirname
	path.resolve([绝对路径],[相对路径]); =>拼接
    path.resolve([绝对路径],[绝对路径]); =>只取第二个
    
    path.resolve() VS __dirname
    __dirname:当前模块所在的绝对路径（和模块在哪执行的没有关系）
    path.resolve():当前模块中方法在哪个模块执行，那么对应的绝对路径就是执行模块的绝对路径
```

3. URL内置模块

> 传统URL模块  VS  WHATWG

```js
//传统API解析URL => 已废弃
const url = require('url');
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
	把一个URL地址进行解析，把地址中的每一部分按照对象键值对的方式存储起来。
    问题存在主机名欺骗问题，已弃用
    
//WHATWG的API解析URL  new URL(imput[,base]);
const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

myURL.href : https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash
myURL.protocol : https:
myURL.username : user
myURL.password : pass
myURL.origin : https://sub.example.com:8080
myURL.host : sub.example.com:8080
myURL.hostname:sub.host.com
myURL.port : 8080
myURL.pathname : /p/a/t/h
myURL.search : query:string
myURL.hash : #hash

myURL.toString() 与myURL.href返回值相同
myURL.toJSON() 与myURL.href返回值相同
```

4. HTTP内置模块

> 使用

```js
let server = http.createServer(); //创建web服务
server.linten(); //监听端口

1. server.js[server模块]应放在当前项目的根目录
注意：基于node创建后台程序，我们一般都创建一个server模块，在模块中实现创建WEB服务，和对于请求的处理（并且我们一般都会把server模块放到当前项目的根目录下）

2. 如何开启服务或结束正在运行的服务？
开启服务：yarn server
当服务创建成功，命令行中会一直存在光标闪烁，证明服务正在运行中（一定要保证服务是运行的），按ctrl+c可以结束正在运行的服务

3. 客户端如何向创建的服务器发送请求？
	对应好协议、域名、端口等信息，在浏览器中或者AJAX等中发送请求即可
    http://localhost:8686/... 服务在电脑上，localhost本机域名，也就是本机的客户端浏览器，访问本机的服务器端程序
	http://IP:8686/...IP做域名访问，如果内网IP，相同局域网下的用户可以访问这个服务，如果是外网IP，所有联网的基本都可以访问这个服务（局域网下访问，需要互相关掉防火墙）

4. 服务器上有一堆项目代码，这堆项目代码中程序代码既可能有服务器端的程序代码，也可能有客户端的程序代码，而客户端程序代码我们一般都放到static文件夹中
	static
    	都是服务器端需要返回给客户端，由客户端浏览器渲染和解析的（前端项目：包括页面、CSS、JS、图片等）
    server.js
		都是需要在服务器端基于node执行的（后端项目：一般只有JS）

5. 我们创建的web服务需要处理两类请求：
	- 静态资源文件的请求处理：想要文件
	- API接口的请求处理：想要数据
	区别：第一类请求地址中有后缀名，第二类没有后缀

```

> 基础操作

```js
//创建WEB服务
let port = 8686;
let handle = function(req,res){
    //当服务创建成功，并且客户端向当前服务器发送了请求，才会执行回调函数，并且发送一次请求，回调函数就会被触发执行一次
    //req:请求对象，包含了客户端请求的信息
    req.url //请求资源的路径地址及问好传参
    req.method //客户端的请求方式
    req.headers //请求头信息
    //...
    //res:响应对象，包含了一些属性和方法，可以让服务器端返回给客户端的内容
    res.write //基于这个方法，服务器端可以向客户端返回内容
    res.end //结束响应
    res.writeHead //重写响应头信息
    //...
};
http.createServer(handle).listen(port,()=>{
    //当服务创建成功，并且端口号也已经监听成功后，触发回调函数
    console.log(`server is success,listen on ${port}!`);
});

//Error: listen EADDRINUSE: address already in use :::80
//这种错误是由于端口号被占用了，我们需要修改端口号
```

5. child_process
```
创建一个shell，然后执行一个命令
child_process.exec(cmd[,options][,callback])
```

