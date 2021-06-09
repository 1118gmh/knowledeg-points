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
 * 类型兼容性
 */
var a;
(function (a) {
    function getName(animal) {
        return animal.name;
    }
    var p = {
        name: 'gmh',
        age: 21,
        speak: function () { }
    };
    console.log(getName(p)); //gmh 虽然要传的是Animal类型，但我这里传的Person类型也可以执行成功；因此传递的对象中包含Animal中所有的属性就可以了
    //基本类型的兼容性
    var num = 1;
    var str = "gmh";
    num = str;
    var num2;
    var str2 = "gmh";
    num2 = str2;
})(a || (a = {}));
var b;
(function (b_1) {
    //类的兼容性
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bird;
    }(Animal));
    var a;
    a = new Bird(); //父类的变量能指向子类的实例
    var b;
    // b = new Animal(); //子类的变量不能指向父类的实例，这是由于子类中不仅有name属性，还有swing属性，而new Animal只有name属性
    b = { name: "gmh", swing: 4 }; //不管这个对象的具体类型，只要只有这个属性就可以
})(b || (b = {}));
var c;
(function (c) {
    //函数的兼容性
    var sum;
    function f1(a, b) {
        return 1;
    }
    sum = f1;
    function f2(a) {
        return 1;
    }
    sum = f2;
    function f3() {
        return 1;
    }
    sum = f3;
    var getPerson;
    function g1() {
        return { name: 'string', age: 10 };
    }
    getPerson = g1; //可以
    // function g2(){
    //   return {name:'string'}//少了不行
    // }
    // getPerson = g2;
    function g3() {
        return { name: 'string', age: 10, num: 12 }; //多了可以
    }
    getPerson = g3;
    var log;
    function log1(a) {
        console.log(a);
    }
    log = log1; //参数类型多了可以，少了不行
})(c || (c = {}));
(function (c) {
    var x;
    var y;
    // x = y; //若属性为空，则可以，因为都是空对象，如果接口有属性且属性与传入的类型有关，则不可以
})(c || (c = {}));
var d;
(function (d_1) {
    //枚举的兼容性
    var Colors;
    (function (Colors) {
        Colors[Colors["Red"] = 0] = "Red";
        Colors[Colors["Yellow"] = 1] = "Yellow";
    })(Colors || (Colors = {}));
    var c;
    c = Colors.Red; //0
    c = 1; //这样也是可以的，就是Colors.Yellow
    var d;
    d = Colors.Yellow; //1
})(d || (d = {}));
