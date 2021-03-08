### 一个完整URL的组成、客户端与服务器端的交互

1. URL / URN / URI

```
URI:统一资源标识符
URL：统一资源定位符
URN：统一资源名称

一个完整的URI：（传输协议+标识+域名+端口号+请求路径名称+问好传参及哈希值）
http://www.zhufengpeixun.cn:80/stu/index.html?name=xxx&age=25#teacher

【传输协议】
	用来传输客户端和服务器端交互的信息的（类似于快递小哥）
	HTTP：超文本传输协议（除了传递普通的文本，还可以传递文件流或进制编码等信息），是目前最常用的web传输协议。
	HTTPS：基于SSL加密的传输协议，比HTTP更加的安全（涉及支付的网站一般都是基于HTTPS完成的）
	FTP：文件传输协议，一般用来实现资源文件在服务器上的上传和下载
	
【域名 Domain Name】
	一级域名（顶级域名） www.qq.com
	二级域名 sports.qq.com
	三级域名 kbs.sports.qq.com
	
	.com 供商用的国际域名
	.cn 供商用的中国域名
	.net 用于网络供应服务商（系统类的经常使用.net域名）
	.org 用于官方网站
	.edu 用于教育
	
【端口号】
	用来区分同一台服务器上不同服务的标识（基于web服务器管理器创建服务器的时候可以指定），不同服务之间一般是不能使用相同的端口号
	HTTP => 默认端口号80
	HTTPS => 默认端口号443
	FTP => 默认端口号21
	
	如果当前网站服务，采用的是协议对应的默认端口管理，那么当用户输入网址的时候可以不指定端口号，浏览器会默认把用户把默认的端口号传递给服务器。
	
	一台服务器的端口号范围：0-65535之间
	
	服务器上安装一款应用都可能会作为一个服务，占用一个端口号
	
【请求路径名称】
	path
	pathname
	stu/index.html 请求当前服务对应的目录中的对应文件
	stu/info 、 stu/info.json 请求资源文件，用于AJAX数据请求的接口地址
	str/info/ 请求当前服务对应的目录中的默认文件
	
	例如：stu/index.html 一般都是请求当前服务对应的项目目录中，stu文件下的index.html页面。但是也有特殊情况，就是当前的URL是被“伪URL重写”的，我们看到URL请求不是真实的请求（例如：https://item.jd.com/4679424.html 这个URL就是被重写的，它的真实URL地址很可能是https://item.jd.com/detail.jsp?id=4679424 其实就是跳转到详情页，通过问好传递不同的产品编号，展示不同的产品信息，但是.jsp这种服务器这种服务器渲染的动态页面不能被收缩引擎收录，不利于页面的SEO，所以我们会把动态页面静态化，这也就用到了URL重写技术）
	
	例如：stu/info 这种没有任何后缀信息，一般都不是用来请求资源文件的，而是用于AJAX数据请求的接口地址（如果后缀是.json类的，也是同理），但是有一种除外 stu/info/这种很有可能不是接口地址，而是没有请求的资源名称，服务器会请求默认的资源文件
	
	DHTML：动态页面，泛指当前页面的内容不是写死的而是动态绑定的，例如：.jsp/.php/.aspx...这些页面中的数据都是基于AJAX或者后台编程语言处理，由服务器端渲染，最后把渲染后的结果返回给客户端呈现的
	
【问好传参及哈希值】
	?xxx=xxx&...#xxx
	在“HTTP事物”中，问好传参是客户端把信息传递给服务器的一种方式（也有可能是跳转某一个页面，把参数传递给页面用来标识的）
	
	哈希值一般都是跟客户端服务器交互没啥关系，主要用于页面中的锚点定位和hash路由切换
```

2. HTTP报文

```
一个HTTP报文包括：
起始行：请求起始行、响应起始行
首部：请求头、响应头、通用头
主体：请求主体、响应主体

General通用头：
Request URL: https://www.mi.com/ 请求地址
Request Method: GET 请求方式：GET/POST/DELETE/PUT/HEAD/OPTION...
Status Code: 200 OK 响应的HTTP状态码
Remote Address: 112.25.53.61:443 主机地址（服务器外网IP地址）
Referrer Policy: strict-origin-when-cross-origin

Request Headers 请求头[客户端设置，服务器接收]
GET / HTTP/1.1 =>起始行
Host: www.mi.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: ... =>cookie信息一般都是放到头文件中实现和服务器端的数据通信的
If-Modified-Since: Fri, Feb 19 2021 05:11:32 GMT

Reponse Headers 响应头 [服务器端设置，客户端获取]
HTTP/1.1 200 OK =>响应起始行（HTTP状态码）
Date: Fri, 19 Feb 2021 05:14:05 GMT =>服务器响应内容时候的“服务器端时间”（客户端获取这个时间的时候已经和真实的时间产生误差了，因为服务器返回内容到客户端接收到，也是需要时间的），并且这个时间是格林尼治时间（比北京时间慢8小时，北京时间是GMT+0800）
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Expires: Fri, 19 Feb 2021 05:16:05 GMT
Last-Modified: Fri, Feb 19 2021 05:13:22 GMT
Cache-Control: max-age=120
X-Cacheable: MI-WWW-Cacheable
Server: MIFE/3.0 =>管理web服务的工具
X-Frame-Options: SAMEORIGIN
Content-Encoding: gzip
X-Cache: MISS from cache.51cdn.com
X-Via: 1.1 yyd79:2 (Cdn Cache Server V2.0), 1.1 suydong13:9 (Cdn Cache Server V2.0)
X-Ws-Request-Id: 602f491d_suydong13_83715-1804

Response 响应主体
服务器返回的是什么就是什么

Request Payload / From Data请求主体
客户端发送给服务器的内容
```

3. 调bug：关于以后涉及到交互功能（前端<=>后台）出现问题，如何查找问题：

```
A: 打开控制台，在network中找到当前交互的请求地址，点击进去看详情
B: 如果是传递服务器的参数或者方法错误 【前端问题】
C: 如果服务器返回的信息有错误或者API接口文档规定的内容不一样【后台问题】
D: 如果返回数据是对的，但是展示有问题 【前端问题】

确定是自己前端的问题后，基于断点（或者代码中的debugger）或者控制台输出等方式，开始逐步调试即可
```

4. 客户端和服务器信息交互的方式

```
[客户端传递给服务器]
	A: 问号传参
		请求的URL地址末尾通过问号传参方式，把一些信息传递给服务器
		/stu/info?id=12$lx=man
		
	B: 设置请求头
		客户端把需要传递给服务器的内容设置到请求头信息中（自定义请求头），服务器可以通过接受请求头信息把内容得到
	
	C: 设置请求主体
		xhr.send([AJAX SEND中传递的内容，就是客户端设置的请求主体内容，服务器端可以接收这些信息]);
		
【服务器返回给客户端】
	A: 设置响应头信息
		例如把服务器事件通过响应头返回给客户端，客户端通过获取响应头信息得到这个时间（响应头返回的速度是优先于响应主体的）
		
	B: 设置响应主体
		主要的返回信息都在响应主体中
		
```

