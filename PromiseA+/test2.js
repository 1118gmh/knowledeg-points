let Promise = require('./promise_gmh');
new Promise((resolve, reject) => {
    //...
    setTimeout(() => {
        resolve(100);
    }, 0);


}).then(result => {
    // throw new Error('ERROR');
    // console.log(result);
    return result;
}).then(result => {}, reason => {
    console.log(reason);
});