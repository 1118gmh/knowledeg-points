import Vue from 'vue'; //同步 initial 下会抽离
import('jquery'); //异步 async 下抽离（但由于这个会分割代码，同步initial也会抽离）
new Vue({
  el:'#root',
  render:h=>h('h1',{},'haha')
});
console.log('a');