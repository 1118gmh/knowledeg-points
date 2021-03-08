### NODE基础概念

> node并不是一门语言，它是一个开发工具或者环境
>
> 之所以称node为服务器端语言，是因为node给予了JS操作服务器的能力：我们在服务器端安装node，只用js完成服务器需要处理的事情，最后把写好的js代码交给了node环境运行即可。

**node安装完成后**

- 当前电脑上自动安装了npm(node Package Manager)：一个JS模块（所有封装好可以供其他人调取使用的都可以称之为模块或者包）管理的工具，基于npm可以下载JS模块
- 它会生成一个node执行的命令（可以在DOS窗口或者终端命令中执行）：node xxx.js

**node解析JS代码**

- REPL（在DOS命令窗口直接输入node回车）
- 直接基于node来执行JS文件
  - 在DOS窗口 & 终端窗口
  - VS中的terminal中执行node命令
  - VS中右键run code

**特点**

- 基于V8渲染和解析JS的（快）
- 单线程（劣势）
- 异步无阻塞I/O操作（对文件的读写）
- 事件驱动：类似于发布订阅或者回调函数
- 。。。

**在node环境中把JS代码执行**（3种方式）

- REPL命令（Read-Evaluate-Print-Loop：输入-求值-请求-循环）

- 基于node xxx.js命令执行：

  > 在命令行窗口输入命令，则相当于在node环境下执行代码执行代码

- 基于WB、VS这类编辑工具直接执行

**JS运行在客户端浏览器中=>"前端"**

> 浏览器给JS提供可很多全局的属性和方法：例如：window.xxx(setInterval、setTimeout、eval、alert、JSON...)
>
> 前端（浏览器运行JS）是限制IO操作的

**JS运行在服务器端的node中=>“后台”**

> node也给JS提供了很多内置属性和方法，例如：http、fs、url、path...等对象中都提供很多API供JS操作
>
> node中运行JS是不需要限制I/O操作的

### NODE

> NODE本身是基于CommonJS模块规范设计的，所以模块是NODE的组成
>
> - 内置模块：NODE天生提供给JS调取使用的
> - 三方模块：别人写好的，我们可以基于NPM安装使用
> - 自定义模块：自己创建一些模块

**CommonJS**模块化设计的思想（AMD、CMD、ES6 MODULE都是模块设计思想）

```
1. CommonJS规定：每一个JS都是一个单独的模块（模块是私有的：里面涉及的值和变量以及函数都是私有的，和其他JS文件中的内容是不冲突的）
2. CommonJS中可以允许模块中的方法互相调用
	B模块想要调取A模块中的方法
	- A导出
	- B导入
	【导出】
	CommonJS给每个模块（每个JS）都设置了内置的变量、属性和方法
		module:代表这个模块对象
		module.exports：模块的export属性是用来导出属性和方法
		exports:是内置的一个"变量"，也是用来导出属性和方法的
		虽然exports是变量，module.exports是属性，不是一个东西，但是对应的值都是对象，指向同一个地址（module.exports === exports）
	【导入】
	require：CommonJS提供的内置变量，用来导入模块的（其实导入的就是module.exports暴露出来的东西）；导入的值也是[object]类型的。
	require导入规则：
		require('./xxx') 到当前目录下查找模块 
		require('../xxx') 到上级目录下查找模块
		require('/xxx') 到下级目录下查找文件
		require('xxx') 首先到当前项目的node_modules中查找模块，找不到再到node提供的内置模块中查找。
	【特点】
		1.所有代码都运行在模块作用域，不会污染全局作用域（每一个模块都是私有的，包括里面的东西都是私有的，不会和其他模块产生干扰）
        2. 模块可以多次加载，但是只会在第一次加载运行一次，然后运行结果就被缓存了，以后再加载，就直接读取及诶过。想让模块再次运行，必须清除缓存。
        3. 模块加载的顺序，按照在代码出现的顺序。CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
        
__filename：模块中这个内置变量是当前模块所在的绝对路径（具体到盘符:物理路径）（加当前模块）d:\js学习\案例\test\A.js
__dirname:绝对路径，不加当前模块d:\js学习\案例\test

```

```js
//test.js
let a = 12,
    fn = b => {
        return a + b;
    };
console.log(1);
exports.fn = fn; //将当前模块的函数放到exports导出对象中（这样可以基于equire在其他模块中导入）
console.log(2);
```

```js
//test2.js
//reuqire导入的时候，首先把test模块中的代码自上而下执行，把exports对应的堆内存导入进来，所以接收到的结果是一个对象（require是一个同步操作）
console.log(3);
let test1 = require('./test'); //=>./是当前文件的某个模块；.js可以省略；
console.log(4);
console.log(test1.fn(10));
//结果：1 2 3 4 22
```

```js
//reuqire导入的是module.exports导出的对象（exports只是提供的快捷方式，exports=module.exports）
moudle.exports = { //重定向自己的堆内存，实现导出
    fn1:fn1
};
exports.fn2 = 100;//无法导出，此时exports和module.exports已经不是同一个堆内存了

```

