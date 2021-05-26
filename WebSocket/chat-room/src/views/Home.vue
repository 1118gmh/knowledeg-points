<template>
  <div class="home">
    <div class="login" v-if="!isEnter" >
      <input type="text" v-model="value" placeholder="请输入名字">
      <button @click="join">进入聊天室</button>
      {{tishi}}
    </div>
    <div class="wrapper" v-else>
      <div class="nav">
        <span>聊天室</span>
      </div>
      <div class="box">
        <!-- <ul> -->
          <span class="system" v-show="msg">{{msg}}</span>
          <template v-for="(data,index) in arr">
            <li :key="index" class="message" :class="data.direction">
              <span class="name" >{{data.name}}</span>
              <span class="msg" >{{data.msg}}</span>
            </li>
          </template>
        <!-- </ul> -->
      </div>
      <div class="footer">
        <input type="text" v-model="message">
        <button @click="send">发送</button>
      </div>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('http://127.0.0.1:8888');
export default {
  data () {
    return {
      arr:[],
      tishi:'',
      isEnter:false,
      value:'',
      msg:'',
      message:''  
    }
  },
  methods: {
    join(){
      console.log(this.value);
      if(!this.value){
        this.tishi = '名字不存在，请重新输入';
        return;
      }
      this.$socket.emit('join',this.value);
    },
    send(){
      this.$socket.emit('send',this.message);
    }
  },
  sockets:{
    connect(){
      // this.isConnect = this.$socket.connected;
      console.log("连接");
      console.log(socket);
    },
    repeatName(repeatTip){
      this.tishi = repeatTip;
    },
    sendMessage(msg){
      this.isEnter = true;
      this.msg = msg;
    },
    send(data){
      this.arr.push(data);
      this.message = '';
    },
  },
  created () {
  },
  mounted () {
    
  },

}
</script>
<style lang="stylus">
*
  margin 0
  padding 0
  box-sizing border-box
ul,li
  list-style none
.wrapper
  display flex 
  flex-direction column 
  margin 20px auto
  width 300px
  height 500px
  background lightpink 
  border 1px solid #ccc
  .nav
    width 100%
    height 50px
    background rgba(0,0,0,.9); 
    color white
    text-align center
    line-height 50px 
    font-size 20px
  .box  
    display flex 
    flex-direction column
    background orange 
    flex 1
    overflow scroll
    &::-webkit-scrollbar 
      display none
    .message
      display flex 
      margin 5px 0
      padding 0 5px
      width 100%
      .name 
        width 40px
        height 40px
        text-align center
        line-height 40px
        background lightgreen
        border-radius 20px
      .msg
        max-width 70%
        padding 0 10px
        line-height 40px
        background lightblue
        border-radius 10px
    .left
      flex-direction row
      .msg 
        margin-left 10px
    .right
      flex-direction row-reverse
      .msg
        margin-right 10px
    .system
      display block
      width 100%
      height 20px
      text-align center
      line-height 20px
      color black
  .footer
    display flex 
    background red
    width 100%
    height 30px
    button 
      width 50px
    input 
      flex 1
</style>