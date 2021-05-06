
import $ from 'jquery';
console.log($);
console.log('hello world');
require('./index.css');


require('./index.less');

//引入图片
import logo from './siyue.jpeg'
let img = document.createElement('img');
img.src = logo;
document.body.appendChild(img);

//ES6转ES5
const fn = ()=>{

}
fn();


class B{
  constructor(){
    this.a = 1;
  }
}
//草案语法
// @log
class A{
  a = 1; //this.a = 1;
}
// function log(target){

// }

//不能转换高级语法：实例上的语法 promise
[1,2,3].includes(1);

new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(1);
  },1000);
}).then(result=>{
  console.log(result);
});


//使用import语法，在打包的时候，会将代码复制一次过来，造成代码冗余
import './a';
class C{

}