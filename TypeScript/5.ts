/**
 * 抽象类
    * 描述一种抽象的概念，无法被实例化，只能被继承
    * 无法创建抽象类的实例
    * 抽象类方法不能再抽象类中实现，只能在抽象类的集体子类中实现，而且必须实现
    * 
    * 
* 接口
    * 可以用来描述对象
        interface Point {
          x: number
          y: number
        }
        let point: Point = { x: 21, y: 33 };
    * 还可以用来描述行为的抽象
        interface Speakable {
          speak(): void;
        }
        interface Eatable {
          eat(): void;
        }
    * 任意属性
        interface PlainObject{
          [propName:string]:number; //这样定义类型之后，可以设置任意多个string类型的属性
        }
        let obj:PlainObject = {x:1,y:2,z:3}
    * 接口的继承
        interface Speakable{
          speak():void;
        }
        interface SpeakChineseable extends Speakable{
          speakChinese():void;
        }
    * 可以设置只读属性readonly
        interface Circle{
          readonly PI:number;//该属性只读
          radius:number
        }
    * 接口可以用来约束函数
        interface Discount{
          (price:number):number; //约束函数的形参为number类型，返回值为number类型
        }
    * 可索引接口()
        interface UserInterface{
          [index:number]:string;//定义属性名为数字，属性值为字符串类型，相当于字符串数组
        }
        let arr:UserInterface = ["1","2","3"];
    * 类接口
        interface Speak{
          name:string;
          speak(word:string):void;
        }
        class Dog implements Speak{
          name:string;
          speak(){}
        }       
    * 用接口来约束一个类
        class Animal{
          constructor(public name:string){

          }
        }
        interface WithNameClass{
          new(name:string):Animal;
        }
        function createAnimal(clazz:WithNameClass,name:string){
          return new clazz(name);
        }
        let a = createAnimal(Animal,'gmh');
      }
一个类可以实现多个接口，但是只能继承一个父类
 */
namespace a {
  abstract class Animals {
    name: string;
    abstract getName(): string;
  }
  //一个类只能继承一个父类
  class Cat extends Animals {
    getName(): string {
      return this.name;
    }
  }
  let cat = new Cat();
  cat.name = '猫';
  console.log(cat.getName());


  //1. 可以用来描述对象
  interface Point {
    x: number
    y: number
  }
  let point: Point = { x: 21, y: 33 };
  //2. 还可以用来描述行为的抽象
  interface Speakable {
    speak(): void;
  }
  interface Eatable {
    eat(): void;
  }
  //一个类可以实现多个接口
  class Person implements Speakable, Eatable {
    speak() {
      console.log("我可以说话");
    }
    eat() { }
  }
  let p = new Person();
  p.speak();
  // 3. 任意属性
  interface PlainObject{
    [propName:string]:number; //这样定义类型之后，可以设置任意多个string类型的属性
  }
  let obj:PlainObject = {x:1,y:2,z:3}
  // 4. 接口的继承
  interface Speakable{
    speak():void;
  }
  interface SpeakChineseable extends Speakable{
    speakChinese():void;
  }
  class Person2 implements SpeakChineseable{
    speak(){}
    speakChinese(){}
  }
  // 5. 接口的只读
  interface Circle{
    readonly PI:number;//该属性只读
    radius:number
  }
  let circle:Circle = {
    PI:3.14,
    radius:10
  }
  // circle.PI = 3.15; 不可更改，属性只读
  //6. 接口可以用来约束函数
  interface Discount{
    (price:number):number; //约束函数的形参为number类型，返回值为number类型
  }
  let cost:Discount = function(price:number):number{
    return price*8;
  }
  // 7. 可索引接口
  interface UserInterface{
    [index:number]:string;
  }
  let arr:UserInterface = ["1","2","3"];
  //8. 类接口
  interface Speak{
    name:string;
    speak(word:string):void;
  }
  class Dog implements Speak{
    name:string;
    speak(){}
  }
  //9. 用接口来约束一个类
  class Animal{
    constructor(public name:string){

    }
  }
  interface WithNameClass{
    new(name:string):Animal;
  }
  function createAnimal(clazz:WithNameClass,name:string){
    return new clazz(name);
  }
  let a = createAnimal(Animal,'gmh');
}

//重写
namespace b{
  class Animal{
    constructor(){

    }
    speak(){
      console.log("动物叫");
      // throw new Error("此方法不能被调用");
    }
  }
  class Cat extends Animal{
    speak(){
      super.speak(); //真的要使用父类的方法，就通过super调用；（super还可以用在constructor内继承父类的属性super()）
      console.log("我们一起喵喵喵");
    } 
  }
  class Dog extends Animal{
    speak(){
      console.log("我们一起汪汪汪");
    }
  }
  let cat = new Cat();
  cat.speak();
  let dog = new Dog();
  dog.speak();
}