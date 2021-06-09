"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var a;
(function (a_1) {
    var Animals = /** @class */ (function () {
        function Animals() {
        }
        return Animals;
    }());
    //一个类只能继承一个父类
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.getName = function () {
            return this.name;
        };
        return Cat;
    }(Animals));
    var cat = new Cat();
    cat.name = '猫';
    console.log(cat.getName());
    var point = { x: 21, y: 33 };
    //一个类可以实现多个接口
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () {
            console.log("我可以说话");
        };
        Person.prototype.eat = function () { };
        return Person;
    }());
    var p = new Person();
    p.speak();
    var obj = { x: 1, y: 2, z: 3 };
    var Person2 = /** @class */ (function () {
        function Person2() {
        }
        Person2.prototype.speak = function () { };
        Person2.prototype.speakChinese = function () { };
        return Person2;
    }());
    var circle = {
        PI: 3.14,
        radius: 10
    };
    var cost = function (price) {
        return price * 8;
    };
    var arr = ["1", "2", "3"];
    var Dog = /** @class */ (function () {
        function Dog() {
        }
        Dog.prototype.speak = function () { };
        return Dog;
    }());
    //9. 用接口来约束一个类
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
    function createAnimal(clazz, name) {
        return new clazz(name);
    }
    var a = createAnimal(Animal, 'gmh');
})(a || (a = {}));
//重写
var b;
(function (b) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.speak = function () {
            console.log("动物叫");
            // throw new Error("此方法不能被调用");
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.speak = function () {
            _super.prototype.speak.call(this); //真的要使用父类的方法，就通过super调用；（super还可以用在constructor内继承父类的属性super()）
            console.log("我们一起喵喵喵");
        };
        return Cat;
    }(Animal));
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.speak = function () {
            console.log("我们一起汪汪汪");
        };
        return Dog;
    }(Animal));
    var cat = new Cat();
    cat.speak();
    var dog = new Dog();
    dog.speak();
})(b || (b = {}));
