const { URLSearchParams } = require('url');

let http = require('http'),
    path = require('path'),
    fs = require('fs'),
    { readFile, writeFile } = require('less_gmh/utils/fsPromise'),
    mime = require('mime'),
    pathREG = /\.([a-z0-9]+)$/i,
    qs = require('qs');

//公共方法
//JSON格式重定向
let responseResult = function(res, returnVal) {
    res.writeHead(200, {
        'content-type': 'application/json;charset=utf-8;'
    });
    res.end(JSON.stringify(returnVal));
};
//读取USER中数据，并转换为JSON格式对象
let readUSER = function() {
    return readFile('./json/USER.JSON').then(result => {
        return JSON.parse(result);
    });
};

//创建WEB服务
let port = 8686;
let handle = function handle(req, res) {
    //=>客户端请求资源文件，，服务器都是到static文件夹中进行读取，
    //也是根据客户端请求的路径名称读取的，服务器基于fs读取文件中内容的时候，直接加上`./static`即可
    let { method, headers: reqHeaders } = req;
    let url = new URL(req.url, 'http://localhost/');
    let pathname = url.pathname,
        search = url.search;
    console.log(pathname);
    //静态资源文件处理
    if (pathREG.test(pathname)) {
        readFile(`./static${pathname}`).then(result => {
            //读取成功:根据请求资源文件的类型，设置响应内容的MIME(谷歌浏览器自动识别文件类型，可以不设置，但是IE不能识别对应的文件类型)
            let suffix = pathREG.exec(pathname)[1];
            res.writeHead(200, {
                'Content-type': `${mime.getType(suffix)};charset=utf-8;`
            });
            res.end(result);
        }).catch(error => {
            //读取失败：最可能由于文件不存在而读取失败，（也就是客户端请求的地址是错误的，我们应该相应404）
            res.writeHead(404, {
                'Content-type': 'text/plain;charset=utf-8;'
            });
            res.end('NOT FOND!');
        });
        return;
    }
    //=>API接口请求处理
    //getUser接口（若干个接口中的一个）处理
    if (pathname === '/getUser' && method === 'GET') {
        //问好传递的信息都在search中存储
        let userId = (new URLSearchParams(search)).get('userId'),
            returnVal = { code: 1, message: 'no!', data: null }
        readUSER().then(result => {
            let data = result.find(item => parseFloat(item['id']) === parseFloat(userId));
            if (data) {
                returnVal = { code: 0, message: 'ok', data };
                responseResult(res, returnVal);
                return;
            }
            // throw new Error(''); //目的是没有数据的时候，让其执行catch中的操作，这样我们只需要让then方法中有异常信息即可
        }).catch(error => responseResult(res, returnVal));
    }
    if (pathname === '/register' && method === 'POST') {
        //接收客户端请求主体传递的内容
        let pass = ``;
        req.on('data', chunk => {
            //=>正在接收请求主体内容，可能会被触发很多次，chunk获取的都是本次接收的buffer格式的数据
            pass += chunk;
        });
        req.on('end', () => {
            //pass是一个urlencode格式字符串，我们需要把它解析为对象
            pass = qs.parse(pass);
            readUSER().then(result => {
                let maxId = result.length <= 0 ? 0 : parseFloat(result[result.length - 1]['id']);
                let newData = {
                    id: maxId + 1,
                    name: '',
                    sex: 0,
                    password: '',
                    //使用用户push的pass进行覆盖默认值
                    ...pass
                };
                //二次加密
                pass.password = pass.password.substr(4, 24).split('').reverse().join('');
                //把newData追加result末尾，把最新的结果写入到文件
                result.push(newData);
                return writeFile('./json/USER.JSON', result);
            }).then(result => {
                responseResult(res, {
                    code: 0,
                    message: 'ok'
                });
            }).catch(error => {
                responseResult(res, {
                    code: 1,
                    message: 'no'
                });
            });
        });
        return;
    }

    //请求的都不是以上API接口，直接404
    res.writeHead(404);
    res.end('');
    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);

    //基于node内置模块将URL地址中的路径名称、问好传参解析出来
    // let url = new URL(req.url, 'https://localhost/');
    // console.log(url.pathname, url.search);

    //解决中文乱码
    // res.writeHead(200, {
    //     'content-type': 'text/plain;charset=utf-8;'
    // })
    // res.end(JSON.stringify({ name: '哈哈' })); //服务器端返回给客户端的内容一般都是String或者BUFFER格式的数据


};
http.createServer(handle).listen(port, () => {
    //当服务创建成功，并且端口号也已经监听成功后，触发回调函数
    console.log(`server is success,listen on ${port}!`);
});