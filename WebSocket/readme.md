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

2. 一对一聊天室的实现

```


