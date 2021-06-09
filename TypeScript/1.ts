//如果添加export import之类的代码，则可以将当前文件变为一个私有的模块，避免与全局变量的冲突
export { }
let a: boolean = true;//布尔
let b: number = 1;//数字
let name: string = 'gmh'; //字符串
let hobbies: string[] = ['1', '2', '3']; //数组
let interests: Array<string> = ['4', '5', '6']; //数组
let point: [number, string, boolean] = [21, 'gmh', true]; //元组（类似数组，长度和类型都固定了）
enum Gender { //枚举
  BOY,
  GIRL
}
console.log(`gmh是一个${Gender.BOY}`);
/**
 * 枚举编译之后
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log("gmh\u662F\u4E00\u4E2A" + Gender.BOY);
 */
const enum Colors { //常数枚举
  RED,
  BLUE,
  GREEN
}
console.log(Colors.BLUE);
//任意类型 anyscript（一般不用） any

//联合类型 |
// let root:HTMLElement|null = document.getElementById('root'); //HTMLElement类型或者null类型
// root!.style.color = 'red'; //!：断言root不为空

//null undefined 可以赋给其他类型变量
//要将这个选项改为false，才能编译成功  "strictNullChecks": false,
let myname1: string = null;
let myname2: string = undefined;

//void类型  空的 表示函数不需要返回值
function greeting(name: string): void {
  console.log(name);
  //return 2; void类型不能返回值
}
greeting('gmh');

//never 永远不 表示在函数内部抛出错误，导致函数无法正常结束
function createError(): never {
  console.log(1);
  throw Error('error'); //到这儿结束函数了，抛出错误，下面的执行不到，则返回never类型
  console.log('end point');
}
function aa(): never {
  while (true) {
    console.log(2);
  }//死循环，下面的执行不到，则返回never类型
  console.log('end point');
}

// | 按位与 || 逻辑与 & 按位或 && 逻辑或
console.log(3 | 5); //7
console.log(3 || 5); //3
console.log(3 & 5); //1
console.log(3 && 5); //5

//类型推论 猜
let name2 = 2; //猜name2是number类型
let name3; //猜不出来就默认为any类型

//包装对象 java中的装箱和拆箱 
//自动在基本类型的对象之间切换
//1、基本类型上没有方法
//2、在内部装箱，将基本类型包装成对象类型，然后用对象调用方法
let name4: string = 'gmh';
name4.toLocaleUpperCase();

let d: string | number;
d = 'gmh';
d.toUpperCase();//当赋值为字符串时，可以调字符串上的方法
d = 3;
d.toFixed();//当赋值为数字时，可以掉数字上的方法

let name6: string | number;
(name6 as string).toUpperCase();//as:断言为string类型
(name6 as number).toFixed();//as:断言为number类型

//字面量类型，表示这个变量只能赋指定字符串中的某个值
let Gender4:"BOY"|"GIRL";
Gender4 = 'BOY';
Gender4 = 'GIRL';
