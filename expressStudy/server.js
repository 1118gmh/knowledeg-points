// 导入模块
let express = require('express'),
    app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let { readFile, writeFile } = require('less_gmh/utils/fsPromise'),
    pathDataBanner = './json/banner.json',
    pathDataBanner2 = './json/banner2.json';
// 创建服务，监听端口
let port = 8686;
app.listen(port, () => {
    console.log(`server is success,listen on ${port}`);
});

// API处理
//=>express中间件：在API接口请求处理前，把一些公共的部分进行提取，中间件就是先吹这些公共的内容，处理完成后，在继续执行接口请求即可
//=>APP.use 使用中间件
// app.use('/user', (req, res) => {
//     //请求的path地址中是以'/xxx'开头的，例如'/xxx'、'/xxx/xx'
//     next(); //不加next();是无法走到下一个中间件或者请求中的(next:执行下一个中间件或请求 )
// });
// app.use((req, res) => {
//     //所有的请求都会走中间件，而且中间件的执行顺序是按照书写先后顺序
//     next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'xiaoming',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

// 静态资源文件处理
app.use(express.static('./static'));


app.get('/getUser', (req, res) => {
    /**
     * 当客户端向服务器发送请求，如果请求方式是get,请求路径是'/getUser'，机会吧回调函数执行，里面有三个参数，req/res/next
     *    req:request(它不是我们原生node中的req，它是express框架封装处理后的req，但是也是存储了很多客户端传递信息的对象)
     *      req.params 存储的是路径参数信息
     *      req.path 请求路径名称
     *      req.query 请求的问好参数信息（get请求都是这样传递的信息）（对象）
     *      req.body 当请求的方式是post，我们基于body-parser中间件处理后，我们会把客户端请求主体中传递的内容存放到body属性上
     *      req.session 当我们基于express-session中间件处理后，会把session操作放到这个属性上，这个属性可以操作session信息
     *      req.cookies 当我们基于cookie-parser中间件处理后，会把客户端传递的cookie信息存放到这个属性上
     *      req.get() 获取指定的请求头信息
     *      req.param() 获取url-encoded、格式字符串（或者路径参数）中某个属性名对应的信息获取到
     *      ...
     *      
     *    res:response 也不是原生的res，也是经过express封装处理的，目的是为了提供一些属性和方法，可以供服务器向客户端返回内容
     *      res.cookie() 通过此方法可以设置cookie信息，通过响应头set-cookie返回给客户端，客户端把返回的cookie信息种到本地
     *      res.type() 设置响应内容的MIME类型
     *      res.set() 设置响应头  
     *    
     *      res.status() 设置响应状态码
     *      res.sendStatus() 设置返回的状态码（他会结束响应，把状态码对应的信息当做主体响应主体返回，我们一般都用status，然后自己来设置响应主体内容）
     *      res.JSON() 向客户端返回JSON格式的字符串，但是允许我们传递JSON对象，方法会放我们转换为字符串然后再返回（执行方法后会自动结束响应【也就是自动执行了res.end】）
     *      res.sendFile([path]) 首先把path指定的文件中内容得到，然后把内容返回给客户端浏览器（完成了文件读取和响应两步操作），也会自动结束想用
     *      res.send() (常用)想返回啥就返回啥，自动结束响应     
     * 
     *      res.redirect() 响应式重定向（状态302）
     *      res.render() 只有页面需要服务器渲染的时候我们才需要用到
     */
    res.send({
        message: 'ok '
    });
});
app.post('/register', (req, res) => {
    //=>GET请求，接收问好传参的信息，可以使用，req.query / req.param()
    //=>POST请求，接收请求主体传递的信息，此时我们需要使用一个中间件body-parser
    console.log(req.body);
});