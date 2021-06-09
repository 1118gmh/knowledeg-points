1. 基础配置
```
(1)全局安装typescript
  npm install typescript -g

(2)初始化tsc配置文件
  tsc --init

(3)编译
  tsc
  tsc --watch

命令：
  tsc --version
  tsc --init //初始化
  tsc  //编译
  tsc --watch  //自动编译
```

2. 数据类型
```ts
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

```
3. 函数
```ts
//函数的声明
function hello(name:string):void{
  console.log(`hello${name}`);
}

// 定义一个类型
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

```
4. 类
```ts
namespace b{
  class Person{
    myname:string;
    constructor(name:string){
      this.myname = name;
    }
    //存取器
    get name(){
      return this.myname;
    }
    set name(newVal:string){
      this.myname = newVal.toUpperCase();
    }
  }
  let p = new Person('gmh');
  console.log(p.name);//gmh
  p.name = 'gmh2';
  console.log(p.name);
}
namespace c{
  class Person{
    //这注释的两行代码 等同于 public 表示将name属性公开变为这个Person类的私有属性
    //readonly：该属性只读，不可更改
    // name:string;
    constructor(public readonly name:string){
      // this.name = name;
      
    }
  }
  let p = new Person('gmh');
  console.log(p.name);//gmh
}
/**
 * 继承
 * 子类继承父类后，子类的属性上就拥有了父类上的
 * 
 * 访问修饰符：public protected private
 * public：可以在自己和子类和其他类中访问
 * protected：可以在自己和子类中访问，其他类中不能访问
 * private：只能在自己类中访问
 */
 namespace c{
  class Person{
    public name:string;
    protected age:number;
    private amount:number;
    constructor(name:string,age:number){
      this.name = name;
      this.age = age;
    }
    getName(){
      return this.name;
    }
    setName(newName:string){
      this.name = newName;
    }
  }
  class Student extends Person{
    static type = 'Student';//static静态的，把Student当成一个对象，在这个对象上挂载属性，只能通过Student.来访问
    stuNo:number;
    constructor(name:string,age:number,stuNo:number){
      super(name,age);
      this.stuNo = stuNo;
    }
    static getType(){ //相当于在这个Student对象上挂载方法，只能通过Student.来访问
      return Student.type;
    }
    getStuNo(){
      // console.log(this.amount);amount私有，不能再子类和其他类中访问
      return this.name + this.age + this.stuNo;
    }
    setStuNo(newNo:number){
      this.stuNo = newNo;
    }
  }
  let p = new Person('gmh',21);
  p.name;
  // p.age;age是protected，不能在其他类中访问
}
```
5. 抽象类和接口
```ts
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
```
6. 泛型
```ts
/**
 * 泛型
 * 在定义函数接口或类的时候，不预先指定具体类型，而在使用的时候再指定类型的一种特性
 * 泛型T作用域只限函数内使用
 * 
 * 主要在下面使用
    * 函数泛型
    * 类泛型
    * 接口泛型
  
 * 可以定义多个泛型，可以设置默认泛型类型
      <A=string,B=string>

 * 泛型的约束
  在函数中使用泛型的时候，由于预先不知道具体的类型，就不能访问相应的类型的方法
      interface lengthWise{
        length:number;
      }
      function looger<T extends lengthWise>(val:T){
        console.log(val.length); //默认情况下，val不知道是什么类型，所以有可能没有length这个属性，因此要使用泛型约束，让泛型实现接口
      }
      looger("gmh"); //3  这里是string类型，string类里有length属性，实现lengthWise接口，所以不会报错
      // looger(22); //这里会报错 因为数字类型没有length属性，不能实现lengthWise接口，因此抱错
 
  * 泛型类型别名
      type Cart<T> = {list:T[]} | T[];
      let c1:Cart<string> = {list:["gmh","xiaohui"]};
      let c2:Cart<string> = ["gmh"];

  * interface VS type
      interface 定义了一个实实在在的接口，它是一个真正的类型
      type一般用来定义别名，并不是一个真正的类型
      在使用联合类型或元组的使用，，使用type来定义更合适
 
      */
namespace a {
  //函数泛型
  //createArray 传进来是什么类型值，就返回什么类型的数组
  function createArray<T>(length:number,val:any):Array<T>{
    let result:Array<T> = [];
    for(let i = 0;i < length;i++){
      result[i] = val;
    }
    return result;
  }
  let result1 = createArray(3,"x");//[ 'x', 'x', 'x' ]
  console.log(result1);
  let result2 = createArray(3,1); //[ 1, 1, 1 ]
  console.log(result2);

  //类数组
  function sum(...arg:any[]){
    let args:IArguments = arguments;
    console.log(args); //{ '0': 1, '1': 2, '2': 3 }
  }
  sum(1,2,3);

  //let root:HTMLElement | null = document.getElementById("root");
  //let children :HTMLCollection= root.children;
  //let childNodes = root.childNodes;
  

  //类泛型
  class MyArray<T>{
    private list:T[] = [];
    add(val:T){
      this.list.push(val);
    }
    getMax():T{
      let result:T = this.list[0];
      for(let i = 1;i< this.list.length;i++){
        if(result < this.list[i]){
          result = this.list[i];
        }
      }
      return result;
    }
  }
  let arr = new MyArray<number>();
  arr.add(1);
  arr.add(3);
  arr.add(2);
  console.log(arr.getMax());//3


  //接口泛型
  interface Calculate{
    <T>(a:T,b:T):T //这里T只作用于这个函数
  }
  let add:Calculate = function <T>(a:T,b:T):T{
    return a;
  }
  console.log(add(1,2));//1

  interface A<T>{//在这里写T，则作用于整个接口
    a:T,
    b:T
  }
  let obj:A<number> = {
    a:1,
    b:2
  } 

  //<A=string,B=string>可以定义多个泛型，可以设置默认泛型类型
  //例：如何在不增加中间变量的情况下，交换两个变量的值
  function swap<A=string,B=string>(tuple:[A,B]):[B,A]{
    return [tuple[1],tuple[0]];
  }
  console.log(swap<number,string>([21,"gmh"]));//[ 'gmh', 21 ]

  //泛型的约束
  interface lengthWise{
    length:number;
  }
  function looger<T extends lengthWise>(val:T){
    console.log(val.length); //默认情况下，val不知道是什么类型，所以有可能没有length这个属性，因此要使用泛型约束，让泛型实现接口
  }
  looger("gmh"); //3  这里是string类型，string类里有length属性，实现lengthWise接口，所以不会报错
  // looger(22); //这里会报错 因为数字类型没有length属性，不能实现lengthWise接口，因此抱错

  //泛型类型别名
  type Cart<T> = {list:T[]} | T[];
  let c1:Cart<string> = {list:["gmh","xiaohui"]};
  let c2:Cart<string> = ["gmh"];
  //interface 定义了一个实实在在的接口，它是一个真正的类型
  //type一般用来定义别名，并不是一个真正的类型
  
}

```
7. 类型的兼容性
```ts
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
```
8. 类型保护
```ts

/**
 * 类型保护（一个变量可能是多个类型，因此需要区分开来，才能调用各个类型的方法）
    * typeof保护
    * instanceof保护
    * null保护
    * 根据属性来区分
 */
namespace a {
  //1. typeof保护
  function double(input: number | string | boolean) {

    if (typeof input === 'string') {
      input.trim(); // 在这里确定了input变量的类型为string，可以调用string类型方法
    } else if (typeof input === 'number') {
      input.toFixed();
    } else {
      input;
    }
  }
  //2. instanceof保护
  class Animal {
    public name: string = 'gmh';
  }
  class Bird extends Animal {
    public swing: number = 2;

  }
  function getName(a: Animal) {
    if (a instanceof Bird) {
      a.name;
      a.swing;
    } else {
      a.name;
    }
  }
  //3. null保护
  function getFirstLetter(s: string | null) {
    // if(s === null){
    //   s = '';
    // }
    s = s || ''; //上面的 等同于这一句话
    return s.charAt(0);
    // return s!.charAt(0); //如果确保自己传递的s为string类型，则可以添加非空断言来确保部位null
  }

  //根据属性来判断
  interface WaringButton {
    class: 'warning'; //字面量类型 固定的 写死了 calss变量的值就是warning
    text1: '修改'
  }
  interface DangerButton {
    class: 'danger';
    text2: '修改'
  }
  type Button = WaringButton | DangerButton;
  function getButton(button: Button) {
    //button.class;如果不判断的话，只能获取其共有的属性
    if (button.class === 'warning') {
      button.text1;
    } else {
      button.text2;
    }
  }
  interface Bird {
    swing: number;
  }
  interface Dog {
    leg: number;
  }
  function getNumber(animal: Bird | Dog) {
    // animal//这里animal获取不到属性，需要判断之后获取
    if ('swing' in animal) {
      animal.swing;
    } else {
      animal.leg;
    }
  }
}
namespace b{
  //5. 自定义的类型保护
  interface Bird {
    name1:'Bird';
    legs: number;
  }
  interface Dog {
    name2:'Dog';
    legs: number;
  }

  function isBird(a:Bird|Dog):a is Bird{ //当返回值为true时，a is Bird
    return a.legs === 2;
  }
  function getNumber(animal:Bird|Dog){
    if(isBird(animal)){
      animal.name1; 
    }else{
      animal.name2;
    }
  }
}
```
9. 类型变换
```ts
/**
 * 总结：
 * & 交叉类型(其实就是两个接口类型属性的并集)
 * typeof 获取一个变量的类型 typeof p
 * [] 索引访问操作符 我们可以通过[]来获取一个类型的子类型  let myInterestsName:Person["interests"][0]["name"] = 'football';
 * in 映射类型 在定义的时候用in操作符去批量定义
    type PartialPerson = {
      [key in keyof Person3] ?: Person3[key];
    }
 * keyof 索引类型操作符 keyof Person2;
 * 内置的一些工具类型：
    * Partial 可选 Partial<Person3>
    * Required 必选 Required<Person3>
    * ReadOnly 只读 Readonly<Person3>
    * Pick 提取出一个接口的某个属性 Pick<Person3,"name">
    * Exclude 从前者中排除后者 Exclude<number|string,string>;
    * Extract 从前者中选择后者 Extract<number|string|boolean,string>;
    * NonNullable 去除null、undefined类型 NonNullable<number|string|null|undefined>;
    * ReturnType 获取返回值类型 ReturnType<typeof getUserInfo>;
    * InstanceType 获取构造函数的实例类型 InstanceType<typeof Person>;
 * 条件类型 type Condition<T> = T extends Fish ? Water :Sky;
 * 
 * 关于类型和值
 * 类型：class enum interface type 
 * 值：class enum var let const function
 */


/**
 * 交叉类型(其实就是两个接口类型属性的并集)
 *  
 */
namespace a {
  interface Bird{
    name:string;
    fly():void;
  }
  interface Person{
    name:string;
    eat():void;
  }
  
  type BirdMan = Bird & Person;
  let p:BirdMan = {
    name:'gmh',
    fly(){},
    eat(){}
  }
}
/**
 * typeof:获取一个变量的类型
 * 
 */
namespace b{
  //typeof可以获取一个变量的类型
  let p = {
    name:'gmh',
    age:21
  }
  //定义了一个类型Person，格式和变量p一样
  type Person = typeof p; 
  let p2 :Person = {
    name:'gmh2',
    age:22
  }
}
/**
 * 索引访问操作符 []
      * 我们可以通过[]来获取一个类型的子类型
 * 索引类型操作符 keyof 
 * 
 * 映射类型 定义的时候用in操作符去批量定义
 * Partial可选 Partial<Person3>
 * Required必选 Required<Person3>
 * ReadOnly 只读 Readonly<Person3>
 * Pick 提取出一个接口的某个属性 Pick<Person3,"name">
 */
namespace c {
  interface Person{
    name:string;
    age:number;
    job:{
      name:string;
    };
    interests:{name:string,age:number}[];
  }
  let myJobName:Person["job"] = {
    name:'gmh'
  }
  let myInterestsName:Person["interests"][0]["name"] = 'football';

  interface Person2 {
    name:string;
    age:number;
    gender:'male' | 'female';
  }
  //根据key获取值，由于key只能是name/age/gender这3个值，因此要对key进行约束（不约束的话，val[key]报错）
  type Person2Key = keyof Person2; //keyof返回一个接口的key的集合
  function getNameByKey(val:Person2,key:Person2Key):any{
    return val[key]; 
  }
  let person2:Person2 = {
    name:'gmh',
    age:21,
    gender:'male'
  }
  console.log(getNameByKey(person2,"name"));//gmh

  //映射类型 在定义的时候用in操作符去批量定义
  interface Person3 {
    name:string;
    age:number;
    gender:'male' | 'female';
  }
  //用这种类型约束的变量，其内属性可选
  // type PartialPerson = {
  //   [key in keyof Person3] ?: Person3[key];
  // }
  // 简写方式 Partial可选
  type PartialPerson = Partial<Person3>;  //Partial原生自带
  // 等同于
  // type PartialPerson = {
  //   name?:string;
  //   age?:number;
  //   gender?:'male' | 'female';
  // }

  let p3:PartialPerson = {
    name:'gmh' //只写一个也可以了
  }

  //Required必选 每一项都必填
  type PartialPerson2 = Required<Person3>;
  let pp3:PartialPerson2 = {
    name:'gmh',
    age:32,
    gender:'male'
  }
  //ReadOnly 只读
  type PartialPerson3 = Readonly<Person3>;
  let ppp3:PartialPerson3 = {
    name:'gmh',
    age:21,
    gender:'male'
  }
  // ppp3.name = 'g';//报错 属性只读

  // Pick 提取出一个接口的某个属性
  type PickPerosn = Pick<Person3,"name">; //提取出Person3中的name属性 {name:string;}
  let x:PickPerosn = {
    name:'gmh'
  }

}
namespace d {

  interface Fish {
    name1:string;
  }
  interface Water {
    name2:string;
  }
  interface Bird {
    name3:string;
  }
  interface Sky {
    name4:string;
  }
  //条件类型
  type Condition<T> = T extends Fish ? Water :Sky;
  let condition:Condition<Fish> = {
    name2:'gmh'
  }

  // 条件类型的分发
  type Condition2<T> = T extends Fish ? Water :Sky;
  //可以是Water类型或者Sky类型
  let c1:Condition2<Fish|Bird> = { name2:'gmh'}
  let c2:Condition2<Fish|Bird> = {name4:'gmh'}
  //等同于
  // let c1:Water|Sky = {name2:'gmh'}
  // let c2:Water|Sky = {name4:'gmh'}
}
namespace b{
  //Exclude 从前者中排除后者
  type E = Exclude<number|string,string>;
  let e:E = 1;
  //Extract 从前者中选择后者
  type E2 = Extract<number|string|boolean,string>;
  let e2:E2 = 'gmh';
  //NonNullable 去除null、undefined类型
  type E3 = NonNullable<number|string|null|undefined>;
  let e3:E3 = 'gmh';
  let e33:E3 = 1;
  //ReturnType 获取返回值类型
  function getUserInfo(){
    return {name:'gmh',age:21};
  }
  type userInfo = ReturnType<typeof getUserInfo>; //先通过typeof拿到函数的类型，在通过ReturnType拿到函数的返回值类型
  let user:userInfo = {name:'gmh',age:21};
  //InstanceType 获取构造函数的实例类型
  class Person{
    name:string;
    constructor(name:string){
      this.name = name;
    }
  }
  type P = InstanceType<typeof Person>;//先通过typeof拿到构造函数的类型，再通过InstanceType获取构造函数的实例类型
  let p:P = new Person('gmh');
}
```
10. namespace
```ts
//namespace
//封装类似的代码
//防止命名冲突
namespace zoo {
  class Dog{

  }
}
//可通过export导出变量
namespace Home{
  export class Dog{}
}
let dog = new Home.Dog();
```
11. 声明文件
```ts
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
```
12. ts配置项
```ts
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",      //将ts语法编译到es5
    "module": "commonjs",        //模块（AMD/CMD、commonjs、module、umd），编译为commonjs模块规范
    //  "lib": [],   //手动指定引入的类库，去掉则默认
    // "allowJs": true,                             /* Allow javascript files to be compiled. */
    // "checkJs": true,                             /* Report errors in .js files. */
    // "jsx": "preserve",                           /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    // "declaration": true,                         /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                      /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                           /* Generates corresponding '.map' file. */
    // "outFile": "./",                             /* Concatenate and emit output to single file. */
    // "outDir": "./",                              /* Redirect output structure to the directory. */
    // "rootDir": "./",                             /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                           /* Enable project compilation */
    // "tsBuildInfoFile": "./",                     /* Specify file to store incremental compilation information */
    // "removeComments": true,                      /* Do not emit comments to output. */
    // "noEmit": true,                              /* Do not emit outputs. */
    // "importHelpers": true,                       /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,                  /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,                     /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           //严格模式的所有项都为true
    // "noImplicitAny": true,                       /* Raise error on expressions and declarations with an implied 'any' type. */
     "strictNullChecks": false,   //是否启用严格的空检查，false后，null undefined就可以赋给其他类型变量
    // "strictFunctionTypes": true,                 /* Enable strict checking of function types. */
    // "strictBindCallApply": true,                 /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
     "strictPropertyInitialization": false,  //是否强制类属性的初始化，设置为false，类的属性就可以不用初始化了
    // "noImplicitThis": true,                      /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                        /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                      /* Report errors on unused locals. */
    // "noUnusedParameters": true,                  /* Report errors on unused parameters. */
    // "noImplicitReturns": true,                   /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,          /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,            /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                  /* Ensure overriding members in derived classes are marked with an 'override' modifier. */
    // "noPropertyAccessFromIndexSignature": true,  /* Require undeclared properties from index signatures to use element accesses. */

    /* Module Resolution Options */
    // "moduleResolution": "node",                  /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "baseUrl": "./",                             /* Base directory to resolve non-absolute module names. */
    "paths": {
      "*":["types/*"]
    },                                 /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                              /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                             /* List of folders to include type definitions from. */
    // "types": [],                                 /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,        /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,                    /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,                /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                            /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                               /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                     /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                       /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    "experimentalDecorators": true,  //支持装饰器
    // "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  },
  "include":[ //指定编译的目录，这样之后，只会编译指定的目录
    "src/**/*",
    "typings/**/*",
    "types/**/*"
  ]
}

```