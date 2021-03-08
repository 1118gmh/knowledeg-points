### AJAX

1. async javascript and xml AJAX是异步的JS和XML

```
	在AJAX中的异步不是我们理解的同步异步编程，而是泛指“局部刷新”，但是我们在以后的AJAX请求中尽可能使用异步获取数据（因为异步获取数据不会阻塞下面的代码的执行）
	
	XML是一种文件格式（我们可以把HTML理解为XML的一种）：可扩展标记语言，它的作用是用自己扩展的一些语义标签来存储一些数据和内容，这样存储的好处是清晰的展示出数据的结构
	
	在以前，AJAX刚刚兴起的时候，客户端从服务器端获取数据，服务器为了清晰表达数据结构，都是返回XML格式的内容，当下，我们获取的数据一般都是JSON格式的内容，JSON相对于XML来说，也能清晰表达数据结构，而且访问里面数据的时候操作起来比XML更简便（但是现在某些项目中，服务器返回给客户端的数据不单纯是数据，而是数据和需要展示的结构拼接好的结果（类似于我们做的字符春拼接），换句话说，是服务器端把数据和结构拼接好返回给我们，此时返回的数据格式一般都是XML格式的字符串）
```

全局刷新：

![](D:\knowledeg-points\AJAX\img\全局刷新1.png)

> 在服务器渲染时代，当时没有AJAX，页面向服务器发送一个请求（通过浏览器地址问好传参的方式发送给服务器），服务器获取请求后，不管是否存在，不管存在不存在，都要给用户一个提示（原始展示的页面需要发生改动），服务器需要把带提示的内容重新拼接，然后返回给客户端，客户端重新渲染最新的内容（只能整体刷新），这就叫全局刷新

局部刷新

![](D:\knowledeg-points\AJAX\img\局部刷新.png)

2. AJAX操作

```
1. 创建AJAX实例：（IE6不兼容）
	let xhr = new XMLHttpRequest();

2. 打开请求：发送请求之前的一些配置项
	xhr.open([http method],[url],[async],[username],[userpass]);
	
	[http method]:请求方式
		GET/DELETE/HEAD/OPTIONS/TRACE/CONNECT/POST/PUT
	[url] :项服务器发送请求的API接口地址
	[async]:设置AJAX请求的同步异步，默认是异步
	[username/userpass]:用户名、密码，一般不用

3. 事件监听：一般监听的都是ready-state-change事件（AJAX状态改变事件），基于这个事件可以获取服务器返回的响应主体内容
	xhr.onreadystatechange = ()=>{
		if(xhr.readyState === 4 && xhr.status === 200){
		xhr.responseText;
		}
	};
    
4. 发送AJAX请求，从这步开始，当前AJAX任务开始执行（如果AJAX是同步的，后续的代码不会执行，要等到AJAX状态成功后在执行，反之异步不会）
	xhr.send([请求主体内容]);
```

3. 关于HTTP请求方式的一点学习

```
【常用的请求方式】
GET: 从服务器端获取数据（给的少拿的多）
POST: 向服务器端推送数据（给的多拿的少）
DELETE: 删除服务器端的某些内容（一般是删除一些文件）（用的少）
PUT: 向服务器上存放一些内容（一般也是存放文件）（用的少）
HEAD: 只想获取服务器返回的响应头信息，不要响应主体中的内容
OPTION: 一般使用它向服务器发送一个探测性请求，如果服务器端返回信息了，说明当前客户端和服务器端简历了连接，我们可以继续执行其他请求了（TRACE是赶这件事的，但是axio这个AJAX类库在基于cross domain进行跨域请求的时候，就是先发送OPTIONS请求进行探测尝试，如果能联通服务器，才会继续发送其他的请求）

【GET VS POST】
	- 传递给服务器信息的方式不一样
		GET是基于URL地址“问好传参”的方式把信息传递给服务器
			xhr.open('GET','xxx/temp/list?xxx=xxx,xxx=xxx');
		POST是基于“请求主体”把信息传递给服务器
        	xhr.send("xxx=xxx&xxx=xxx");
	- GET拿的多，给的少；POST拿的少，给的多；（如果POST用问号传参的方式，回导致URL很少，浏览器对URL的长度有最大限定（谷歌8KB，火狐7KB，IE2KB...）,超过的部分会被浏览器给截掉。因此GET请求可基于URL传参而POST都是使用请求主体传递（请求主体无限制，真实项目中我们会自己做大小限制，防止上传过大信息导致请求迟迟完不成））
	- GET不安全，POST相对安全
		因为GET是基于问好传参吧信息传递给服务器的，容易被骇客进行URL劫持，POST是基于请求主体进行传递的，相对来说不好被劫持:所以登录、注册等涉及安全性的交互操作，我们都应该用POST请求；
	- GET会产生不可控的缓存，POST不会
		不可控，不是想要就要，想不要就不要，这是浏览器自主记忆的缓存，我们无法基于JS控制，真实项目中我们都会把这个缓存干掉（不产生缓存）
		Get产生缓存是因为：连续多次向相同的地址（并且传递的参数信息也是相同的）发送请求，浏览器会把之前获取的数据从缓存中拿到返回，导致无法获取服务器的最新数据（POST不会）
		解决方案：xhr.open('GET','/temp/list?lx=1000&_=${Math.random()}');//=>保证每次请求的地址不完全一致：在每一次请求的末尾追加一个随机数即可（使用_作为属性名就是不想和其他的属性名冲突）
		
```

4. AJAX状态（readyState）

```
0 => UNSEND：刚开始创建xhr，还没有发送 
1 => OPENED：已经执行了OPEN这个操作
2 => HEADERS_RECEIVED 已经发送AJAX请求（AJAX任务开始），响应头信息已经被客户端接收了（响应头中包含了：服务器事件、返回的HTTP状态码...）
3 => LOADING：响应主体内容正在返回
4 => DONE：响应主体内容已经被客户端接收
```

5. HTTP状态码（status）

```
根据状态码能清楚的反应当前交互的结果及原因
	200 OK 成功（只能证明服务器成功的返回信息，但是信息不一定是业务需要的）
	301 Moved Permanently 永久转移（永久重定向）
		=>域名更改，访问原始域名重定向到新的域名
	302 Move Temporarily临时转移（临时重定向=>307）
		=>网站现在是基于HTTPS协议运作的，如果访问的是HTTP协议，会基于307重定向到HTTPS协议上
		=>302一般用作服务器负载均衡：当一台服务器达到最大并发数的时候，会把后续访问的用户临时转移到其他的服务器机组上处理
		=>偶尔真实项目中会把所有的图片放到单独的服务器上“图片处理服务器”，这样减少主服务器的压力，当用户向主服务器访问图片的时候，主服务器都是把它转移到图片服务器上处理
	304 Not Modified 设置缓存
		=>对于不经常更新的资源文件，例如：CSS/JS/HTML/IMG等，服务器会结合客户端设置304缓存，第一次加载过这些资源就缓存到客户端，下次再获取的时候，是从缓存中获取；如果资源更新，服务器会通过最后修改时间来强制让客户端从服务器重新拉取；基于CTRL+F5强制刷新，304做的缓存就没有用了。
	400 Bad Request 请求参数错误
	401 Unauthorized 无权限访问
	404 Not Found 找不到资源（地址不存在）
	413 Request Entity Too Large 和服务器交互的内容资源超过服务器最大限制
	500 Internal Server Error 未知的服务器错误
	503 Service Unavailable 服务器超负荷
```

6. 关于xhr的属性和方法

```
xhr.response 响应主体内容
xhr.responseText 响应主体的内容是字符串（JSON或者XHR格式字符串都可以）
xhr.responseXML 响应主体的内容是XML文档

xhr.status 返回的HTTP状态码
xhr.statusText 状态码的描述

xhr.timeout 设置请求超时的时间
xhr.withCredentials 是否允许跨域（默认false）

xhr.about() 强制中断AJAX请求
xhr.getAllResponseHeaders() 获取所有响应头信息
xhr.getResponseHeader([key]) 获取KEY对应的响应头信息，例如：xhr.getResponseHeader('date')就是在获取响应头中的服务器时间

xhr.open() 打开URL请求
xhr.send() 发送AJAX请求
xhr.setRequestHeader() 设置请求头（xhr.setRequestHeader('myName','xiaohui');设置的请求头信息不能出现中文，而且必须在open()后执行）
```

```js
let xhr = new XMLHTTPRequest(),
    data = null;
xhr.open('GET','...');
//xhr.setRequestHeader('myName','xiaohui');//可以在此设置设置请求头
xhr.onreadystatechange = ()=>{//=>兼听AJAX状态改变事件
    if(!/^(2|3)\d{2}$/.test(xhr.status)) return;//如果不是2或者3开头的状态码，则代表请求失败，则return；
    if(xhr.readyState === 2){
        //响应头信息已经被客户端接收
        let time = xhr.getResponseHeader('date');//获取的结果是格林尼治时间格式的字符串
        console.log(new Date(time));//转换为标准的北京时间并输出到控制台
    }
    if(xhr.readyState === 4 && xhr.status === 200){
        data = xhr.responseText();//获取到响应主体的内容字符串
    }
};
xhr.send(null);//=>发送AJAX请求：这个执行才证明AJAX任务开始
```

7. 封装AJAX库

```
url：请求的API的接口地址
method：请求的是方式
data：传递噶诶服务器的信息可以翻到data中
		如果是get请求是基于问好传参过去的
		如果是post请求是基于请求主体传递的data值可以是对象也可以是字符串（一般是常用对象）
		如果是对象类型，JQ就会把对象转换为xxx=xxx&xxx=xxx的模式（x-www-form-urlencoded）
		如果是字符串，我们写的是什么就传递什么
dataType：预设置获取结果的数据格式
		TEXT / JSON / JSONP / HTML / SCRIPT / XML
		服务器返回给客户端的响应主体中的内容一般都是字符串【JSON格式居多】，而设置dataType='JSON'，JQ会内部把获取的字符串转为JSON格式的对象
async：设置同步异步（TRUE => 同步  false => 异步）
cache：设置get请求下是否建立缓存
		（默认 true => 建立缓存，false => 不建立缓存）
		当我们设置false，并且当前请求是get请求，JQ会在当前请求的URL地址末尾追加随机数（时间缀）
success：回调函数，当AJAX请求成功执行，JQ执行回调函数的时候会把响应主体中获取的结果（可能二次处理了）当做参数传递给回调函数
error：请求失败后执行的回调函数
```

```js
//其他都可以省略，则为默认值
$.ajax({
    url:'...',
    success:result=>{}
});
```

```js
~ function(window) {
    function AJAX(options) {
        return new init(options);
    }
    let init = function(options = {}) {
        let {
            url,
            method = 'GET',
            data = null,
            dataType = 'JSON',
            async = true,
            cache = true,
            success,
            error
        } = options;
        //=>MOUNT:把配置项挂在到实例上
        ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 'error'].forEach(item => {
            this[item] = eval(item);
        });
        this.sendAJAX();
    };
    AJAX.prototype = {
        constructor: AJAX,
        init,
        //发送AJAX请求
        sendAJAX() {
            this.handleCache();
            this.handleData();
            let {
                url,
                method,
                async,
                dataType,
                data,
                success
            } = this;
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    //error
                    if (!/^(2|3)\d{2}$/.test(xhr.status)) {
                        error && error(xhr.statusText, xhr);
                        return;
                    }
                    //success

                    let result = this.handleDataType(xhr);
                    success && success(result, xhr);
                }
            };
            xhr.send(data);
        },
        //处理dataType
        handleDataType(xhr) {
            let dataType = this.dataType.toUpperCase(),
                result = xhr.responseText;
            switch (dataType) {
                case 'TEXT':
                    break;
                case 'JSON':
                    result = JSON.parse(result);
                    break;
                case 'XML':
                    result = xhr.responseXML;
                    break;
            }
            return result;
        },
        //处理cache
        handleCache() {
            let {
                url,
                method,
                cache
            } = this;
            if (/^GET$/i.test(method) && (cache === false)) {
                url += `${this.check()}_=${+new Date()}`;
                this.url = url;
            }
        },
        //处理data
        handleData() {
            let { data, method } = this;

            if (!data) return;
            //
            if (typeof data === 'object') {
                //转换为urlencoded格式
                let str = ``;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        str += `${key}=${data[key]}&`;
                    }

                }
                data = str.substring(0, str.length - 1);

            }
            //GET请求
            if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
                this.url += `${this.check()}${data}`;
                this.data = null;
                return;
            }
            //POST请求
            this.data = data;
        },
        //检测url中是否存在？
        check() {
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    };
    init.prototype = AJAX.prototype;
    window.ajax = AJAX;
}(window);
```

8. 