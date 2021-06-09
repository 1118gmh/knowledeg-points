"use strict";
var a;
(function (a) {
    var condition = {
        name2: 'gmh'
    };
    //可以是Water类型或者Sky类型
    var c1 = { name2: 'gmh' };
    var c2 = { name4: 'gmh' };
    //等同于
    // let c1:Water|Sky = {name2:'gmh'}
    // let c2:Water|Sky = {name4:'gmh'}
})(a || (a = {}));
