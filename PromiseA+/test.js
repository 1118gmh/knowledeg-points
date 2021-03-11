let Promise = require('./promise_gmh');
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 50);
});
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 80);
});
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(300);
    }, 10);
}).catch(itme => {
    console.log(itme);
});

Promise.all([p1, p2, p3]).then(result => {
    //=>所有的Promise都成功执行，result中分别存储每一个实例返回的结果，而且和数组中的顺序是一样的
    console.log(result);
});