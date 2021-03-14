let express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session');
let { readFile, writeFile } = require('less_gmh/utils/fsPromise'),
    pathDataUser = './json/USER.JSON',
    port = 8686,
    app = express();

//创建服务
app.listen(port, () => {
    console.log(`server is success,listen on ${port}`);
});

//处理API
//先添加3个中间件
//=>1.引用body-parser中间件：处理put/post请求主体信息，将结果挂载到req.body中
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//=>2.引用express-session中间件：处理session信息，将
app.use(session({
    secret: 'xiaoming',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));
//=>3.自己写的中间件：获取json文件中的信息，将文件中的各个json文件读取到，并转换为JSON对象挂载到req上，方便后面调取使用
app.use(async(req, res, next) => {
    //等readFile这个异步操作有了结果后，将结果赋给userData
    let userData = await readFile(pathDataUser);
    //将获取到的结果挂在req上
    req.userData = JSON.parse(userData);
    next();
});
//处理登录请求
app.post('/login', (req, res) => {
    let {
        name = '',
            password = ''
    } = req.body;
    //密码二次加密
    password = password.substr(4, 24).split('').reverse().join('');
    //验证用户名、密码
    let result = req.userData.find(item => item['name'] === name && item['passworld'] === password);
    if (result) {
        //登录成功
        //需要记录session：
        req.session.isLogin = true;
        req.session.userID = parseFloat(result['id']);
        res.send({ code: 1, message: 'OK!' });
        return;
    }
    //登录失败
    res.send({ code: 0, message: 'NO!' });
});
//检测是否登录
app.get('/checkLogin', (req, res) => {
    let isLogin = req.session.isLogin;
    if (isLogin) {
        res.send({ code: 1, message: 'OK!' });
        return;
    }
    res.send({ code: 0, message: 'NO!' });
});
//退出登录
app.get('/exitLogin', (req, res) => {
    req.session.isLoggin = false;
    req.session.userID = null;
    req.send({ code: 1, message: 'OK!' });
});
//获取用户信息：没有传递用户ID，获取当前登录用户的信息
app.get('/getUser', (req, res) => {
    let {
        userId = req.session.userID
    } = req.query,
        result = req.userData.find(item => item['id'] === parseFloat(userId));
    if (result) {

        res.send({
            code: 0,
            message: 'OK!',
            data: {...result, password: null }
        });
        return;
    }
    res.send({ code: 0, message: 'NO!', data: null });
});

//处理静态资源文件
app.use(express.static('./static'));

app.use((req, res, next) => {
    //如果既不是API接口，又不是静态资源文件则404报错
    res.status(404);
    //并且重定向到一个404页面
    res.redirect('http://www.qq.com/babyhome/');
});