"use strict";
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
var a;
(function (a_1) {
    //函数泛型
    //createArray 传进来是什么类型值，就返回什么类型的数组
    function createArray(length, val) {
        var result = [];
        for (var i = 0; i < length; i++) {
            result[i] = val;
        }
        return result;
    }
    var result1 = createArray(3, "x"); //[ 'x', 'x', 'x' ]
    console.log(result1);
    var result2 = createArray(3, 1); //[ 1, 1, 1 ]
    console.log(result2);
    //类数组
    function sum() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var args = arguments;
        console.log(args); //{ '0': 1, '1': 2, '2': 3 }
    }
    sum(1, 2, 3);
    //let root:HTMLElement | null = document.getElementById("root");
    //let children :HTMLCollection= root.children;
    //let childNodes = root.childNodes;
    //类泛型
    var MyArray = /** @class */ (function () {
        function MyArray() {
            this.list = [];
        }
        MyArray.prototype.add = function (val) {
            this.list.push(val);
        };
        MyArray.prototype.getMax = function () {
            var result = this.list[0];
            for (var i = 1; i < this.list.length; i++) {
                if (result < this.list[i]) {
                    result = this.list[i];
                }
            }
            return result;
        };
        return MyArray;
    }());
    var arr = new MyArray();
    arr.add(1);
    arr.add(3);
    arr.add(2);
    console.log(arr.getMax()); //3
    var add = function (a, b) {
        return a;
    };
    console.log(add(1, 2)); //1
    var obj = {
        a: 1,
        b: 2
    };
    //<A=string,B=string>可以定义多个泛型，可以设置默认泛型类型
    //例：如何在不增加中间变量的情况下，交换两个变量的值
    function swap(tuple) {
        return [tuple[1], tuple[0]];
    }
    console.log(swap([21, "gmh"])); //[ 'gmh', 21 ]
    function looger(val) {
        console.log(val.length); //默认情况下，val不知道是什么类型，所以有可能没有length这个属性，因此要使用泛型约束，让泛型实现接口
    }
    looger("gmh"); //3  这里是string类型，string类里有length属性，实现lengthWise接口，所以不会报错
    var c1 = { list: ["gmh", "xiaohui"] };
    var c2 = ["gmh"];
    //interface 定义了一个实实在在的接口，它是一个真正的类型
    //type一般用来定义别名，并不是一个真正的类型
})(a || (a = {}));
