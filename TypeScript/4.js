"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var a;
(function (a) {
    function enhancer(target) {
        //target表示Person这个类
        //在这里增强这个类
        target.prototype.xx = 'xx';
        target.prototype.yy = 'yy';
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.zz = 'zz';
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.xx); //xx
    console.log(p.zz); //zz
})(a || (a = {}));
var b;
(function (b) {
    //通过装饰器直接替换整个类
    function enhancer(target) {
        return /** @class */ (function () {
            function class_1(name, age) {
                this.name = name;
                this.age = age;
            }
            class_1.prototype.getName = function () {
                console.log(this.name);
            };
            class_1.prototype.eat = function () { };
            return class_1;
        }());
    }
    var Person = /** @class */ (function () {
        // public name:string;
        // public age:number;
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        Person.prototype.eat = function () { };
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person('gmh', 32);
    p.getName();
    console.log(p.age);
})(b || (b = {}));
/**
 * 属性装饰器
 * 装饰属性的
 */
var c;
(function (c) {
    //装饰器
    function upperCase(target, propertyName) {
        //如果装饰的属性是普通的属性，则target指向类的原型
        //如果装饰的属性是类的属性static，则target指向类的定义
        //这里指向类的原型
        var value = target[propertyName];
        var getter = function () { return value; };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        delete target[propertyName];
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    function propertyEnumerable(flag) {
        //装饰属性只有两个参数
        return function (target, propertyName) {
        };
    }
    function methodEnumerable(flag) {
        //装饰方法有3个参数
        return function (target, methodName, propertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        };
    }
    function setAge(age) {
        //装饰方法有3个参数
        return function (target, methodName, propertyDescriptor) {
            target.age = 100;
        };
    }
    function toNumber(target, methodName, propertyDescriptor) {
        var oldMethod = propertyDescriptor.value;
        propertyDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args.map(function (item) { return parseFloat(item); });
            oldMethod.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'gmh';
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.getAge = function () {
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        __decorate([
            upperCase //比如所通过装饰器将属性转成大写
            ,
            propertyEnumerable(false) //propertyEnumerable装表示一个装饰器工厂（返回一个装饰器），false表示让属性不可枚举 
        ], Person.prototype, "name", void 0);
        __decorate([
            methodEnumerable(true) //true表示方法可枚举
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            setAge(100) //通过装饰器工厂给静态属性赋值
        ], Person, "getAge", null);
        return Person;
    }());
    var p = new Person();
    console.log(p.name); //GMH
    for (var attr_1 in p) {
        console.log("attr:" + attr_1);
    }
    /**
        attr:getName
        attr:name
     */
    console.log(Person.age); //100
    p.sum(1, '2', 3); //原本返回'123' ,通过装饰器，让其返回6
})(c || (c = {}));
/**
 * 参数装饰器
 * 用的少
 */
var d;
(function (d) {
    function addAge(target, methodName, paramsIndex) {
        console.log(target, methodName, paramsIndex);
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (username, password) {
            console.log(username, password);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('gmh', '123');
})(d || (d = {}));
