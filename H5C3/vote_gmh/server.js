let express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cors = require("cors");

let { readFile, writeFile } = require("less_gmh/utils/fsPromise"),
    pathDataUser = "./json/USER.JSON",
    pathDataVote = "./json/VOTE.JSON",
    port = 8686,
    app = express();
app.listen(port, () => {
    console.log(`server is success,listen on ${port}`);
});
app.use(cors());
//允许跨域
// app.use((req,res,next)=>{
// 	res.header('Access-Control-Allow-Origin',"http://localhost:5500");//允许跨域的请求源
// 	res.header('Access-Control-Allow-Credentials',true); //允许携带cookie信息
// 	res.header('Access-Control-Allow-Headers',"Content-type,Content-Length,Authorizationn,Accept,X-Requested-With");//
// 	res.header('Access-Control-Allow-Methods',"PUT,POST,GET,DELETE,HEAD,OPTIONS");//允许的请求方式
// 	if(req.method === 'OPTIONS'){ //允许客户端发送试探请求，返回数据OK，供测试是否可以跨域
// 		res.send('OK!');
// 		return;
// 	}
// 	next();
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'xiaohui',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

app.use(async(req, res, next) => {
    //等readFile这个异步操作有了结果后，将结果赋给userData
    let userData = await readFile(pathDataUser);
    let voteData = await readFile(pathDataVote);
    //将获取到的结果挂在req上
    req.userData = JSON.parse(userData);
    req.voteData = JSON.parse(voteData);
    next();
});

/**
 * 1. 获取参赛人员列表信息
 */
app.get('/getMatchList', (req, res) => {
    // let {
    //     limit = 10,
    //         page = 1,
    //         search = null
    // } = req.query;
    // let voteData = req.voteData,
    //     pageNum = Math.ceil(voteData.length / limit),
    //     total = voteData.length,
    //     result = null;
    // if (search) {
    //     result = voteData.find(item => item["name"] === search.trim());
    //     if (result) {
    //         res.send({
    //             code: 0,
    //             message: 'OK',
    //             limit: 1,
    //             page: 1,
    //             pageNum: 1,
    //             total: 1,
    //             list: [result]
    //         });
    //     }
    //     res.send({
    //         code: 1,
    //         message: 'NO',
    //         limit: 0,
    //         page: 0,
    //         pageNum: 0,
    //         total: 0,
    //         list: null
    //     });
    //     return;
    // }

    // res.send({
    //     code: 0,
    //     message: 'OK',
    //     limit: limit,
    //     page: page,
    //     pageNum: pageNum,
    //     total: total,
    //     list: voteData.slice((page - 1) * limit, page * limit)
    // });
    let { userData, voteData, query } = req, { limit, page, search } = query;
    let self = null;
    //筛选合适的人选
    if (req.session.userId) {
        self = userData.find(item => parseFloat(item["id"]) === req.session.userId),
            matchId = self.matchId;
        voteData = voteData.filter(item => parseFloat(item["matchId"]) !== parseFloat(matchId));
    }
    search ? voteData = voteData.filter(item => item["name"].indexOf(search) > -1) : null;

    if (req.session.userId) {
        voteData.forEach(item => {
            self.myVote.forEach(item2 => {
                if (parseFloat(item["id"]) === parseFloat(item2)) {
                    item.isVote = 1;
                }
            });
        });
    }

    //分页返回数据
    let total = voteData.length,
        pageNum = Math.ceil(total / limit);
    if (page <= pageNum) {
        res.send({
            code: 0,
            message: 'OK',
            limit: limit,
            page: page,
            pageNum: pageNum,
            total: total,
            list: voteData.slice((page - 1) * limit, page * limit)
        });
        return;
    }
    res.send({
        code: 1,
        message: 'NO',
        limit: 0,
        page: 0,
        pageNum: 0,
        total: 0,
        list: null
    });


});
/**
 * 2. 投票操作
 * votePeople:记录登录的人投递给比赛的人的ID号
 * myVote:记录我投递给别人的ID
 */
app.get('/vote', (req, res) => {
    let {
        participantId = 0
    } = req.query;
    let voteData = req.voteData,
        userData = req.userData;

    let result = null;

    if (req.session.userId) {
        voteData.forEach(item => {
            if (item["id"] === parseFloat(participantId) && !item.votePeople.find(item2 => parseFloat(item2) === parseFloat(req.session.userId))) {
                item.voteNum++;
                item.votePeople.push(req.session.userId);
                writeFile(pathDataVote, voteData);
                userData.forEach(item => {
                    if (parseFloat(item["matchId"]) === parseFloat(participantId)) {
                        item.voteNum++;
                        writeFile(pathDataUser, userData);
                    }
                });
            }
        });
        userData.forEach(item => {
            if (item["id"] === req.session.userId && !item.myVote.find(item2 => parseFloat(item2) === parseFloat(participantId))) {
                item.myVote.push(parseFloat(participantId));
                writeFile(pathDataUser, userData);
            }
        });


        res.send({ code: 0, message: 'OK' });

    }
    res.send({ code: 1, message: '未登录无法投票' });

});
/**
 * 3. 获取用户的详细信息
 */
app.get('/getUser', (req, res) => {
    let {
        userId = req.session.userId
    } = req.query;
    if (parseFloat(userId) === 0) {
        userId = req.session.userId;
    }
    let result = req.userData.find(item => parseFloat(item["id"]) === parseFloat(userId));

    if (result) {
        res.send({ code: 1, message: 'OK', data: {...result, password: null } });
        return;
    }
    res.send({ code: 0, message: 'NO', data: "" });
});

/**
 * 更具比赛编号获取用户的详细信息
 */
app.get('/getUserMatchId', (req, res) => {
    let {
        matchId
    } = req.query;
    let { voteData, userData } = req;
    let result = null;
    if (parseFloat(matchId) === 0) {
        result = userData.find(item => parseFloat(item['id']) === parseFloat(req.session.userId));
    } else {
        result = userData.find(item => parseFloat(item['matchId']) === parseFloat(matchId));
    }

    if (result) {
        res.send({ code: 1, message: 'OK', data: {...result, password: null } });
        return;
    }
    res.send({ code: 0, message: 'NO', data: "" });
});

/**
 * 获取投票人员的详细信息
 * 
 */
app.get('/getMatched', (req, res) => {
    let { matchId } = req.query;
    let voteData = req.voteData;

    result = voteData.find(item => parseFloat(item["id"]) === parseFloat(matchId));
    if (result) {
        res.send({ code: 0, message: "OK", data: result });
        return;
    }
    res.send({ code: 1, message: "NO", data: null });
});

/**
 * 4. 检测是否已经投递过该人(需要改，检测userData.MyVote)
 */
app.get('/checkUser', (req, res) => {
    let { checkId } = req.query;
    let userData = req.userData;
    let result = null;
    userData.forEach(item => {
        if (parseFloat(item["id"]) === parseFloat(req.session.userId)) {
            result = item.myVote.filter(item => parseFloat(item) === parseFloat(checkId));
        }
    });
    if (result.length === 1) {
        res.send({ code: 0, message: 'OK' });
        return;
    }
    res.send({ code: 1, message: 'NO' });
});

/**
 * 5. 获取我投过票的人员
 */
app.get('/getMyVote', (req, res) => {
    let voteData = req.voteData,
        userData = req.userData;
    userData = userData.find(item => item["id"] === req.session.userId),
        result = null;

    userData.myVote.forEach(item => {
        result = voteData.filter(item2 => parseFloat(item2["id"]) === parseFloat(item));
    });
    if (result) {
        res.send({
            code: 0,
            message: 'OK',
            total: result.length,
            list: result
        });
        return;
    }
    res.send({
        code: 1,
        message: 'NO',
        total: 0,
        list: null
    });
});
/**
 * 6. 获取投票过我的人员
URL:/getVoteMy
METHOD:GET
RESULT:{
	code:0, 整体返回数据的状态
	message:'',
	total:98, 总数量
	list:[
		{
			id:1, 用户ID
			name:'xxx', 用户名
			picture:'xxx', 头像图片
			sex:0, 性别 
			matchId:'xxx', 参赛编号
			voteNum:10, 参赛标语
			isVote:0 我是否已经投过此人 0->没投过 1->投过
		},
		...
	]
}
 */
app.get('/getVoteMy', (req, res) => {
    let { userData, voteData } = req;
    let selfMatch = voteData.find(item => parseFloat(item["id"]) === parseFloat(req.session.userId));
    let votePeople = selfMatch.votePeople;
    let result = null;
    votePeople.forEach(item => {
        result = userData.filter(item2 => parseFloat(item2["id"]) === parseFloat(item));
    });
    if (selfMatch) {
        res.send({
            "code": 0,
            "message": "OK",
            "total": result.length,
            "list": result
        });
        return;
    }
    res.send({
        "code": 1,
        "message": "NO",
        "total": 0,
        "list": ""
    });
});

//根据matchId获取投票给matchId的人
app.get('/getVoteMatched', (req, res) => {
    let { matchId } = req.query;
    let { userData, voteData } = req;
    if (parseFloat(matchId) === 0) {
        userData.forEach(item => {
            if (parseFloat(item["id"]) === parseFloat(req.session.userId)) {
                matchId = parseFloat(item.matchId);
            }
        });
    }
    let selfMatch = voteData.find(item => parseFloat(item["id"]) === parseFloat(matchId));
    let votePeople = selfMatch.votePeople;
    let result = [];
    votePeople.forEach(item => {
        result.push(userData.find(item2 => parseFloat(item2["id"]) === parseFloat(item)));
    });
    if (selfMatch) {
        res.send({
            "code": 0,
            "message": "OK",
            "total": result.length,
            "list": result
        });
        return;
    }
    res.send({
        "code": 1,
        "message": "NO",
        "total": 0,
        "list": ""
    });
});

/**
 * 7. 注册新用户
 */
app.post('/register', (req, res) => {
    let {
        name = '',
            password = '',
            phone = '',
            sex = 0,
            bio = ''
    } = req.body;
    let userData = req.userData,
        time = new Date().getTime();
    sex = parseFloat(sex);
    let picture = sex === 0 ? "images/boy.png" : "images/girl.png";
    password = password.substr(4, 24).split('').reverse().join('');
    if (name !== '' && password !== '' && phone !== '' && bio !== '') {
        let result = userData.find(item => item["name"] === name || item["phone"] === phone);
        if (!result) {
            userData.push({
                "id": userData.length + 1,
                "name": name,
                "phone": phone,
                "sex": sex,
                "password": password,
                "picture": picture,
                "bio": bio,
                "time": time,
                "isMatch": 0,
                "matchId": "",
                "slogan": "",
                "voteNum": 0,
                "myVote": []
            });
            writeFile(pathDataUser, userData);
            res.send({ code: 0, message: 'OK' });
        }
        res.send({ code: 1, message: '用户已存在' });
        return;
    }
    res.send({ code: 1, message: 'NO' });
});

/**
 * 8. 用户登录
 */
app.post('/login', (req, res) => {
    let {
        name = '',
            password = ''
    } = req.body;
    password = password.substr(4, 24).split('').reverse().join('');
    let result = req.userData.find(item => item["name"] === name && item["password"] === password);
    if (result) {
        req.session.userId = parseFloat(result["id"]);
        req.session.isLogin = true;
        res.send({ code: 0, message: 'OK' });
        return;
    }
    res.send({ code: 1, message: 'NO' });
});
/**
 * 9. 检测手机号是否已经被注册
 */
app.get('/checkPhone', (req, res) => {
    let { phone } = req.query;
    let result = req.userData.find(item => item["phone"] === phone);
    if (result) {
        res.send({ code: 1, message: '被注册' });
        return;
    }
    res.send({ code: 0, message: "未被注册" });
});
/**
 * 10. 参与比赛
URL:/match
METHOD:POST
DATA:{
	slogan:xxx
}
RESULT:{
	code:0, 0->参与成功 1->参与失败
	message:''
}
 */
app.post('/match', (req, res) => {
    let { slogan = null } = req.body;
    let voteData = req.voteData,
        userData = req.userData,
        matchId = voteData.length + 1,
        self = userData.find(item => parseFloat(item["id"]) === parseFloat(req.session.userId)),
        isMatch = self.isMatch;
    matchId = matchId < 10 ? `00${matchId}` : `0${matchId}`;
    if (isMatch === 0) {
        userData.forEach(item => {
            if (item["id"] === req.session.userId) {
                item.slogan = slogan;
                item.isMatch = 1;
                item.matchId = matchId;
                voteData.push({
                    "id": voteData.length + 1,
                    "name": item.name,
                    "picture": item.picture,
                    "sex": item.sex,
                    "matchId": matchId,
                    "voteNum": 0,
                    "isVote": 0,
                    "slogan": slogan,
                    "votePeople": []
                });
                writeFile(pathDataVote, voteData);
                writeFile(pathDataUser, userData);
                res.send({ code: 0, message: "参赛成功" });
                return;
            }
        });
    }
    res.send({ code: 1, message: "已经参赛" });
});

/**
 * 11.检测是否登录
 */
app.get('/checkLogin', (req, res) => {
    let isLogin = req.session.isLogin;
    if (isLogin) {
        res.send({ code: 1, message: 'OK' });
        return;
    }
    res.send({ code: 0, message: 'NO' });
});

/**
 * 12. 退出登录
 */
app.get('/exitLogin', (req, res) => {
    req.session.isLogin = false;
    req.session.userId = null;
    res.send({ code: 0, message: 'OK' });
});

app.use(express.static('./static'));

app.use((req, res, next) => {
    res.status(404);
    res.send("none");
});