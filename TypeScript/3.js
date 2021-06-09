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
var b;
(function (b) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.myname = name;
        }
        Object.defineProperty(Person.prototype, "name", {
            //存取器
            get: function () {
                return this.myname;
            },
            set: function (newVal) {
                this.myname = newVal.toUpperCase();
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
    var p = new Person('gmh');
    console.log(p.name); //gmh
    p.name = 'gmh2';
    console.log(p.name);
})(b || (b = {}));
var c;
(function (c) {
    var Person = /** @class */ (function () {
        //这注释的两行代码 等同于 public 表示将name属性公开变为这个Person类的私有属性
        //readonly：该属性只读，不可更改
        // name:string;
        function Person(name) {
            // this.name = name;
            this.name = name;
        }
        return Person;
    }());
    var p = new Person('gmh');
    console.log(p.name); //gmh
})(c || (c = {}));
/**
 * 继承
 * 子类继承父类后，子类的属性上就拥有了父类上的
 *
 * 访问修饰符：public protected private
 * public：可以在自己和子类和其他类中访问
 * protected：可以在自己和子类中访问，其他类中不能访问
 * private：只能在自己类中访问
 */
(function (c) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
        }
        Person.prototype.getName = function () {
            return this.name;
        };
        Person.prototype.setName = function (newName) {
            this.name = newName;
        };
        return Person;
    }());
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(name, age, stuNo) {
            var _this = _super.call(this, name, age) || this;
            _this.stuNo = stuNo;
            return _this;
        }
        Student.getType = function () {
            return Student.type;
        };
        Student.prototype.getStuNo = function () {
            // console.log(this.amount);amount私有，不能再子类和其他类中访问
            return this.name + this.age + this.stuNo;
        };
        Student.prototype.setStuNo = function (newNo) {
            this.stuNo = newNo;
        };
        Student.type = 'Student'; //static静态的，把Student当成一个对象，在这个对象上挂载属性，只能通过Student.来访问
        return Student;
    }(Person));
    var p = new Person('gmh', 21);
    p.name;
    // p.age;age是protected，不能在其他类中访问
})(c || (c = {}));
