"use strict";
/**
 * 总结：
 * & 交叉类型(其实就是两个接口类型属性的并集)
 * typeof 获取一个变量的类型 typeof p
 * [] 索引访问操作符 我们可以通过[]来获取一个类型的子类型  let myInterestsName:Person["interests"][0]["name"] = 'football';
 * keyof 索引类型操作符 keyof Person2;
 * Partial 可选 Partial<Person3>
 * Required 必选 Required<Person3>
 * ReadOnly 只读 Readonly<Person3>
 * Pick 提取出一个接口的某个属性 Pick<Person3,"name">
 *
 * 关于类型和值
 * 类型：class enum interface type
 * 值：class enum var let const function
 */
/**
 * 交叉类型(其实就是两个接口类型属性的并集)
 *
 */
var a;
(function (a) {
    var p = {
        name: 'gmh',
        fly: function () { },
        eat: function () { }
    };
})(a || (a = {}));
/**
 * typeof:获取一个变量的类型
 *
 */
var b;
(function (b) {
    //typeof可以获取一个变量的类型
    var p = {
        name: 'gmh',
        age: 21
    };
    var p2 = {
        name: 'gmh2',
        age: 22
    };
})(b || (b = {}));
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
var c;
(function (c) {
    var myJobName = {
        name: 'gmh'
    };
    var myInterestsName = 'football';
    function getNameByKey(val, key) {
        return val[key];
    }
    var person2 = {
        name: 'gmh',
        age: 21,
        gender: 'male'
    };
    console.log(getNameByKey(person2, "name")); //gmh
    // 等同于
    // type PartialPerson = {
    //   name?:string;
    //   age?:number;
    //   gender?:'male' | 'female';
    // }
    var p3 = {
        name: 'gmh' //只写一个也可以了
    };
    var pp3 = {
        name: 'gmh',
        age: 32,
        gender: 'male'
    };
    var ppp3 = {
        name: 'gmh',
        age: 21,
        gender: 'male'
    };
    var x = {
        name: 'gmh'
    };
})(c || (c = {}));
