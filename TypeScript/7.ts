/**
 * 类型兼容性
 */
namespace a{
  //接口的兼容性
  interface Animal{
    name:string;
    age:number;
  }
  interface Person{
    name:string;
    age:number;
    speak:(words:string)=>void;
  }
  function getName(animal:Animal):string{
      return animal.name;
  }
  let p:Person = {
    name:'gmh',
    age:21,
    speak:function(){}
  }
  console.log(getName(p)); //gmh 虽然要传的是Animal类型，但我这里传的Person类型也可以执行成功；因此传递的对象中包含Animal中所有的属性就可以了
  
  //基本类型的兼容性
  let num:string|number = 1;
  let str:string = "gmh";
  num = str;
  
  let num2:{toString():string};
  let str2:string = "gmh";
  num2 = str2;
  
}
namespace b{
  //类的兼容性
  class Animal{
    name:string
  }
  class Bird extends Animal{
    swing:number
  }
  let a:Animal;
  a = new Bird(); //父类的变量能指向子类的实例

  let b:Bird;
  // b = new Animal(); //子类的变量不能指向父类的实例，这是由于子类中不仅有name属性，还有swing属性，而new Animal只有name属性
  b = {name:"gmh",swing:4}; //不管这个对象的具体类型，只要只有这个属性就可以
}
namespace c{
  //函数的兼容性
  
  //1. 比较参数 (可以少参数，但是不能多参数)
  type sumFunction = (a:number,b:number) => number;
  let sum : sumFunction;
  function f1(a:number,b:number):number{
    return 1;
  }
  sum = f1;
  function f2(a:number):number{
    return 1;
  }
  sum = f2;
  function f3():number{
    return 1;
  }
  sum = f3;
  //不能多参数
  // function f4(a:number,b:number,c:number):number{
  //   return 1;
  // }
  // sum = f4;

  //2. 比较返回值 (返回值少了不行，多了可以)
  type GetPerson = ()=>{name:string,age:number};
  let getPerson : GetPerson;
  function g1(){
    return {name:'string',age:10}
  }
  getPerson = g1;//可以
  // function g2(){
  //   return {name:'string'}//少了不行
  // }
  // getPerson = g2;
  function g3(){
    return {name:'string',age:10,num:12}//多了可以
  }
  getPerson = g3;
  
  //3. 函数参数的协变(函数的参数类型，只能多，不能少)
  //现在只能单向协变，不能双向协变
  type logFunc = (a:number|string)=>void;
  let log:logFunc;
  function log1(a:number | string | boolean):void{
    console.log(a);
  }
  log = log1;//参数类型多了可以，少了不行
  

}
namespace c{
  //泛型的兼容性
    //判断兼容性的时候，先判断具体的类型，再进行兼容性判断
    interface Empty<T>{
      // name:T;
    }
    let x:Empty<string>;
    let y:Empty<number>;
    // x = y; //若属性为空，则可以，因为都是空对象，如果接口有属性且属性与传入的类型有关，则不可以
}
namespace d{
  //枚举的兼容性
  enum Colors{
    Red,Yellow
  }
  let c:Colors;
  c = Colors.Red; //0
  c = 1; //这样也是可以的，就是Colors.Yellow
  let d:number;
  d =   Colors.Yellow; //1
}