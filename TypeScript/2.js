"use strict";
//函数的声明
function hello(name) {
    console.log("hello" + name);
}
//函数表达式
var getUserName = function (firstName, lastName) {
    return { name: firstName + lastName };
};
// 可选参数 ? 表示参数可传可不传
// 默认参数 直接赋值 表示如果参数不传，则赋默认值
function print(name, age, home) {
    if (home === void 0) { home = 'heihei'; }
    console.log(name, age, home);
}
print('gmh');
print('gmh', 21);
print('gmh', 21, 'haha');
//剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (accu, item) { return accu + item; }, 0);
}
console.log(sum(1, 2, 3, 4));
//方法重载
var obj = {};
function attr(val) {
    if (typeof val === 'number') {
        obj.age = val;
    }
    else if (typeof val === 'string') {
        obj.name = val;
    }
}
attr(2);
attr('gmh');
console.log(obj); //{ age: 2, name: 'gmh' }
var delay = function (ms) {
    console.log(ms);
};
