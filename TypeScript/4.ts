/**
 * 装饰器执行顺序：
 * 1. 属性、方法装饰器执行，谁先写谁就先执行
    * @A
    * name:string = 'gmh';
    * @B
    * getName(){}
    * 因为A在前，先A后B
 * 2. 方法装饰器执行，先参数后方法，而且它们一定在一起
    * @C
    * getName(@B value1:string,@A value2:string){}
    * 先执行A再执行B再执行C
 * 3. 类装饰器，如果是同类型的先执行后写的
    * @B
    * @A
    * class Person{
    * }
    * 先执行A，在执行B
 */
/**
 * 类装饰器
 */
namespace a{
  //类装饰器语法 要用装饰器需要配置 "experimentalDecorators": true,
  interface Person{ //这个是接口，会与Person类合并
    xx:string;
    yy:string;
  }

  function enhancer(target:any){
    //target表示Person这个类
    //在这里增强这个类
    target.prototype.xx = 'xx';
    target.prototype.yy = 'yy';
  }

  @enhancer
  class Person{
    public zz = 'zz';
    constructor(){
      
    }

  }

  let p = new Person();
  console.log(p.xx); //xx
  console.log(p.zz); //zz
}

 namespace b{
   interface Person{
     name:string;    // 相当于在Person类中public name:string;
     age:number;     
     getName:any; //Person类中没有getName，装饰器中有，需要标识一下，标识有getName之后，才能通过p.getName()获取执行
    //  eat:any;
   }
  //通过装饰器直接替换整个类
  function enhancer(target:any){
      return class{
        //替换的类要有原来的类的所有属性,方法
        name:string; 
        age:number;
        constructor(name:string,age:number){
          this.name = name;
          this.age = age;
        }
        getName(){
          console.log(this.name);
        }
        eat(){}
      }
  }
  @enhancer
  class Person{
    // public name:string;
    // public age:number;
    constructor(name:string,age:number){
      this.name = name;
      this.age = age;
    }
    eat(){}
  }
  let p = new Person('gmh',32);
  p.getName();
  console.log(p.age);
}
/**
 * 属性装饰器
 * 装饰属性的
 */
namespace c{
  //装饰器
  function upperCase(target:any,propertyName:string){
    //如果装饰的属性是普通的属性，则target指向类的原型
    //如果装饰的属性是类的属性static，则target指向类的定义

    //这里指向类的原型
    let value = target[propertyName];
    const getter = ()=> value;
    const setter = (newVal:string)=>{
      value = newVal.toUpperCase();
    }
    delete target[propertyName];
    Object.defineProperty(target,propertyName,{
      get:getter,
      set:setter,
      enumerable:true,
      configurable:true
    });
  }
  function propertyEnumerable(flag:boolean){
    //装饰属性只有两个参数
    return function(target:any,propertyName:string){

    }
  }
  function methodEnumerable(flag:boolean){
    //装饰方法有3个参数
    return function(target:any,methodName:string,propertyDescriptor:PropertyDescriptor){
      propertyDescriptor.enumerable = flag;
    }
  }
  function setAge(age:number){
    //装饰方法有3个参数
    return function(target:any,methodName:string,propertyDescriptor:PropertyDescriptor){
      target.age = 100;
    }
  }
function toNumber(target:any,methodName:string,propertyDescriptor:PropertyDescriptor){
    let oldMethod = propertyDescriptor.value;
    propertyDescriptor.value = function(...args:any[]){
      args.map(item=>parseFloat(item));
      oldMethod.apply(this,args);
    }
}
  class Person{
    static age:number;
    @upperCase //比如所通过装饰器将属性转成大写
    @propertyEnumerable(false) //propertyEnumerable装表示一个装饰器工厂（返回一个装饰器），false表示让属性不可枚举 
    name:string = 'gmh';
    @methodEnumerable(true) //true表示方法可枚举
    getName(){
      console.log('getName');
    }
    @setAge(100) //通过装饰器工厂给静态属性赋值
    static getAge(){

    }
    @toNumber
    sum(...args:any[]){
      return args.reduce((accu,item)=>accu+item,0)
    }
  }
  let p = new Person();
  console.log(p.name); //GMH
  for(let attr in p){
    console.log(`attr:${attr}`);
  }
  /**
      attr:getName
      attr:name
   */
  console.log(Person.age);//100

  p.sum(1,'2',3); //原本返回'123' ,通过装饰器，让其返回6
}
/**
 * 参数装饰器
 * 用的少
 */
namespace d{
  function addAge(target:any,methodName:string,paramsIndex:number){
    console.log(target,methodName,paramsIndex);

  }
  class Person{
    login(username:string,@addAge password:string){
      console.log(username,password);
    }
  }
  let p = new Person();
  p.login('gmh','123');
}