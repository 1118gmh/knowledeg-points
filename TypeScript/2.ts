//函数的声明
function hello(name:string):void{
  console.log(`hello${name}`);
}

// 定义一个类型别名
type GetUserName = (firstName:string,lastName:string)=>{name:string};
//函数表达式
let getUserName:GetUserName = function(firstName:string,lastName:string):{name:string}{
  return {name:firstName+lastName};
}

// 可选参数 ? 表示参数可传可不传
// 默认参数 直接赋值 表示如果参数不传，则赋默认值
function print(name:string,age?:number,home:string='heihei'):void{
  console.log(name,age,home);
}
print('gmh');
print('gmh',21);
print('gmh',21,'haha');

//剩余参数
function sum(...numbers:Array<number>):number{
  return numbers.reduce((accu,item)=>accu+item,0);
}
console.log(sum(1,2,3,4));

//方法重载
let obj:any = {};
function attr(val:string):void;
function attr(val:number):void;//attr方法重载后，参数只能传递string或者number
function attr(val:any):void{
  if(typeof val === 'number'){
    obj.age = val;
  }else if(typeof val === 'string'){
    obj.name = val;
  }
}
attr(2);
attr('gmh');
console.log(obj);//{ age: 2, name: 'gmh' }

//箭头函数的写法
type DelayType = (ms:number)=>void;
let delay:DelayType = (ms:number)=>{
  console.log(ms);
}