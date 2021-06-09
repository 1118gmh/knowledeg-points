聊天室
### 引入
```
前端
vue
vue-socket.io
socket.io-client
后端
express
socket.io
```
### API

```
【io.socket】
方法
socket.id
socket.open()
socket.connect()
socket.send([...args]);
socket.emit(eventName,[,...args]);
socket.on(eventName,callback);
socket.compress(value);
socket.close()
socket.disconnect()

默认事件
connect：当与对方建立来联系后自动触发
disconnect：当对方关闭连接后触发
message：当收到对方发来的数据后触发
reconnect：当对方重新连接后触发

自定义事件
通过on定义，通过emit触发
socket.emit(eventName,[,...args]);
socket.on(eventName,callback);
```

### 关于namespace和room的一点知识

```
【namespace】
- 默认的命名空间
io.on('connection', function(socket){    
      socket.on('disconnect', function(){ });
}); 

- 自定义的命名空间
// 服务器端
var nsp = io.of('/my-namespace'); 
nsp.on('connection', function(socket){    
      socket.on('disconnect', function(){ });
}); 

// 客户端  io.connect(  http://localhost/namespace)
var socket = io('/my-namespace'); 


【rooms】
// 自定义room
io.on('connection', function(socket){    

      socket.join('myroom')); // 通过join让socket加入myroom房间
      socket.leave('myroom'); // 离开leave让socket用户离开myroom房间
	
	//广播给这个socket所属的 namespace里的所有客户端
	socket.broadcast.emit('message', "hhh");
	
	//广播给跟socket同一个namespace下面的，名字为 chat的room里的除自己以外的客户端。
	socket.broadcast.in('chat).emit('message', "hhh");


    // 默认房间（每一个id一个room）
    socket.on('say to someone', function(id, msg){    
           socket.broadcast.to(id).emit('my message', msg); 
    }); 
}); 

//广播给默认namespace / 和默认room
io.send("hahaha);

//发给 private namespace里的所有客户端。
io.of('/private').send("hahaha");

//发给private namespace里面的 chat room的所有客户端
io.of('/private').in('chat').send("hahaha");

【如何记忆】
io开头，可以指定namespace和room
socket开发，则namespace已指定，只能修改room
```



### 聊天室模型

```
【多人聊天室】
在客户端发送消息，通过向服务器端推送消息，由服务器端广播，让所有客户端接收消息
```

### 后端

```js
let express = require('express');
let app = express();
let port = 8888;
let server = require('http').createServer(app);

//重要：要在后端允许跨域源为*
const io = require('socket.io')(server,{
  cors:{
    origin:"*"
  }
});

io.on('connection',function(socket){
  console.log('socket is connect');

  socket.on('message',(data)=>{
    console.log(data);
  });
  socket.on('join',(name)=>{
    if(checkName(name)){
      //推送消息到当前客户端
      return socket.emit('repeatName','名字存在，请重新输入');
    }else{
      obj[name] = name;
      socket.nickname = name;
      //推送消息到所有客户端
      ws.sockets.emit('sendMessage',`${name}进入了聊天室`);
    }
  });
  socket.on('send',(msg)=>{
    ws.sockets.emit('send',msg);
  });
  //当前客户顿断开连接时触发该事件（自带的）
  socket.on('disconnect',function () {
    //推送消息到除自己外的所有客户端
    socket.broadcast.emit('sendMessage',`${socket.nickname}离开了聊天室`);
    delete obj[socket.nickname];
  })

});

server.listen(port,()=>{
  console.log(`server is success,listen on ${port}`);



  
});
```
### 前端
```
【vue.config.js】代理
  devServer: {
    // 跨域请求：PROXY代理
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
//    可能需要
//    '/socket.io':{
//      target: 'http://127.0.0.1:8888/', // target host
//      changeOrigin: true, // needed for virtual hosted sites
//      logLevel: 'debug'
//    },
//    '/sockjs-node': {
//      target: 'http://127.0.0.1:8888',
//      ws: false,
//      changeOrigin: true
//    }

    },
  },
【main.js】引入
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://127.0.0.1:8888'),
}))

【home.vue】在需要的组件中
import io from 'socket.io-client';
const socket = io('http://127.0.0.1:8888');


export default {
//默认在组件中挂载了sockets属性，可以用于设置事件
//自带了connect、disconnect、reconnect事件...
  sockets:{
    //连接成功时触发
    connect(){
      console.log("连接成功");

      //通过emit向后台推送消息信息
      this.$socket.emit('message','hahaha');
    },
    disconnect(){
      console.log("断开连接");
    },
    reconnect(){
      console.log("重新连接");
    }

  },
  mounted(){
      //如果socket的连接地址是静态的，则可以在这里直接推送消息
      this.$socket.emit('message','heihei');
      //如果socket的连接地址是动态的，则会出现socket还没渲染完，就执行了App.vue，可以设置定时器来执行，但是不是很好，这种方式
//    var timerOne = window.setInterval(() => {
//      if (this.$socket) {
//        this.$socket.emit('connect', 1)
//        window.clearInterval(timerOne)
//        return;
//      }
//    }, 500)

  }
}
```

maybe will to do
```
1. 发送消息后自动显示在最底下

2. 提示对方正在输入

3. 显示当前聊天室的人数

4. 一对一聊天室的实现

```


