//声明文件怎么写
/**
 * 想引入其他文件，但它是JS写的，如何在TS中使用？
 * 1. 将文件用TS重写一遍
 * 2. 给它配上声明文件,先声明，后使用（声明一般放在单独的文件中，xxx.d.ts）
 * 3. 可以安装第三方的声明文件
 *    例如jquery:
 *        npm install jquery -S  //安装jquery模块
 *        npm install @types/jquery -S  //安装jquery模块的声明文件
 *        使用：
 *        import * as jQuery from 'jquery';
 *        jQuery.ajax();
 *    
 *    也可以自己专门为模块写声明文件
 *        types/jquery/jquery.d.ts
 * 
 *    
 *    也可以安装vscode插件Types auto installer自动安装模块对应的ts声明文件
 *    
 * 总结：
 *    如果要使用其他文件，还是直接安装第三方别人写好的的声明文件香 npm i @types/xxx -S
 * 
 */
declare const $:(selector:string)=>{
  click():void;
  width(length:number):void;
}
$('root').click();
$('#root').width(100);

declare let name2:string;
declare let age:number;
declare function getName():string;
declare class Animal {name:string;}

interface Person{name:string;}
declare enum Seasons{
  Spring,
  Summer,
  Autumn,
  Winter
}

declare namespace JQuery {
  function ajax(url:string,config:any):void;
  let name:string;
  namespace fn{
    function extend(object:any):void;
  }
}
JQuery.ajax('/api/users',{});
JQuery.name;
JQuery.fn.extend({});