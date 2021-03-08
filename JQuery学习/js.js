(function() {
    var version = "1.11.3",
        //
        JQuery = function(selector, context) {
            //创建了init这个类的实例，也相当于创建了JQuery这个类的实例（因为后面的时候，让init.prototype = JQuery.prototype）
            return new JQuery.fn.init(selector, context);
        };
    //指定JQuery的原型，提供方法和属性，供JQ的实例调取使用
    //把JQ当成普通对象，在对象上设置一些私有的属性和方法，这类方法直接JQuery.fn();即可
    JQuery.fn = JQuery.prototype = {
        conturctor: JQuery
    };
    //1. 在JQ的原型上添加extend方法
    //2. 把JQuery当成普通对象，给这个对象设置一个私有的extend方法
    //=>把一个对象的属性和方法扩展到指定的对象上    
    JQuery.extend = JQuery.fn.extend = function() {

    };
    //=>执行extend方法，这里是将isReady属性、isFunction方法...扩展到JQuery类上
    //相当于：JQuery:{extend:...,isReady:...,isFunction:....,isArray:...}
    JQuery.extend({
        isReady: true,
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        }
    });
    //在JQ的原型上添加了init方法
    //在私有作用域中设置私有属性init，并让其指向init方法
    var init = JQuery.fn.init = function(selector, context) {};

    //让init这个类的原型指向jQuery的原型
    init.prototype = JQuery.fn;

    //在window下添加jQuery、$属性，供外部调取使用
    window.JQuery = window.$ = JQuery;
})();
//使用
//创建一个JQuery类的实例，可以调取JQuery.fn中的方法(不需要new，也可以创建这个类的实例)
$();
JQuery();
$().filter();
//把JQ当做一个普通对象，直接使用对象上扩展的那些私有的属性和方法
$.version

let Fn