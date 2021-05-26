let express = require('express');
let app = express();
let port = 8888;
let server = require('http').createServer(app);

// app.use(express.static('./static'));

const ws = require('socket.io')(server,{
  cors:{
    origin:"*"
  }
});
let obj = {};
let checkName = function(name){
  for(let key in obj){
    if(key === name){
      return true;
    }
  }
  return false;
}

ws.on('connection',function(socket){
  console.log('socket is connect');
  socket.on('message',(data)=>{
    console.log(data);
  });
  socket.on('join',(name)=>{
    if(checkName(name)){
      return socket.emit('repeatName','名字存在，请重新输入');
    }else{
      obj[name] = name;
      socket.nickname = name;
      ws.sockets.emit('sendMessage',`${name}进入了聊天室`);
    }
  });
  socket.on('send',(msg)=>{
    socket.broadcast.emit('send',{name:socket.nickname,msg:msg,direction:"left"});
    socket.emit('send',{name:"self",msg:msg,direction:"right"});
  });
  socket.on('disconnect',function () {
    socket.broadcast.emit('sendMessage',`${socket.nickname}离开了聊天室`);
    delete obj[socket.nickname];
  })
});


server.listen(port,()=>{
  console.log(`server is success,listen on ${port}`);
});







