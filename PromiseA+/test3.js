let Promise = require('./promise3');
new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('errorgmh'));
    }, 0);
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
});
console.log(2);