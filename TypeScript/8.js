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
 * 类型保护（一个变量可能是多个类型，因此需要区分开来，才能调用各个类型的方法）
    * typeof保护
    * instanceof保护
    * null保护
    * 根据属性来区分
 */
var a;
(function (a_1) {
    //1. typeof保护
    function double(input) {
        if (typeof input === 'string') {
            input.trim(); // 在这里确定了input变量的类型为string，可以调用string类型方法
        }
        else if (typeof input === 'number') {
            input.toFixed();
        }
        else {
            input;
        }
    }
    //2. instanceof保护
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = 'gmh';
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.swing = 2;
            return _this;
        }
        return Bird;
    }(Animal));
    function getName(a) {
        if (a instanceof Bird) {
            a.name;
            a.swing;
        }
        else {
            a.name;
        }
    }
    //3. null保护
    function getFirstLetter(s) {
        // if(s === null){
        //   s = '';
        // }
        s = s || ''; //上面的 等同于这一句话
        return s.charAt(0);
        // return s!.charAt(0); //如果确保自己传递的s为string类型，则可以添加非空断言来确保部位null
    }
    function getButton(button) {
        //button.class;如果不判断的话，只能获取其共有的属性
        if (button.class === 'warning') {
            button.text1;
        }
        else {
            button.text2;
        }
    }
    function getNumber(animal) {
        // animal//这里animal获取不到属性，需要判断之后获取
        if ('swing' in animal) {
            animal.swing;
        }
        else {
            animal.leg;
        }
    }
})(a || (a = {}));
var b;
(function (b) {
    function isBird(a) {
        return a.legs === 2;
    }
    function getNumber(animal) {
        if (isBird(animal)) {
            animal.name1;
        }
        else {
            animal.name2;
        }
    }
})(b || (b = {}));
