"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = true; //布尔
var b = 1; //数字
var name = 'gmh'; //字符串
var hobbies = ['1', '2', '3']; //数组
var interests = ['4', '5', '6']; //数组
var point = [21, 'gmh', true]; //元组（类似数组，长度和类型都固定了）
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log("gmh\u662F\u4E00\u4E2A" + Gender.BOY);
console.log(1 /* BLUE */);
//任意类型 anyscript（一般不用） any
//联合类型 |
// let root:HTMLElement|null = document.getElementById('root'); //HTMLElement类型或者null类型
// root!.style.color = 'red'; //!：断言root不为空
//null undefined 可以赋给其他类型变量
//要将这个选项改为false，才能编译成功  "strictNullChecks": false,
var myname1 = null;
var myname2 = undefined;
//void类型  空的 表示函数不需要返回值
function greeting(name) {
    console.log(name);
    //return 2; void类型不能返回值
}
greeting('gmh');
//never 永远不 表示在函数内部抛出错误，导致函数无法正常结束
function createError() {
    console.log(1);
    throw Error('error'); //到这儿结束函数了，抛出错误，下面的执行不到，则返回never类型
    console.log('end point');
}
function aa() {
    while (true) {
        console.log(2);
    } //死循环，下面的执行不到，则返回never类型
    console.log('end point');
}
// | 按位与 || 逻辑与 & 按位或 && 逻辑或
console.log(3 | 5); //7
console.log(3 || 5); //3
console.log(3 & 5); //1
console.log(3 && 5); //5
//类型推论 猜
var name2 = 2; //猜name2是number类型
var name3; //猜不出来就默认为any类型
//包装对象 java中的装箱和拆箱 
//自动在基本类型的对象之间切换
//1、基本类型上没有方法
//2、在内部装箱，将基本类型包装成对象类型，然后用对象调用方法
var name4 = 'gmh';
name4.toLocaleUpperCase();
var d;
d = 'gmh';
d.toUpperCase(); //当赋值为字符串时，可以调字符串上的方法
d = 3;
d.toFixed(); //当赋值为数字时，可以掉数字上的方法
var name6;
name6.toUpperCase(); //as:断言为string类型
name6.toFixed(); //as:断言为number类型
//字面量类型，表示这个变量只能赋指定字符串中的某个值
var Gender4;
Gender4 = 'BOY';
Gender4 = 'GIRL';
