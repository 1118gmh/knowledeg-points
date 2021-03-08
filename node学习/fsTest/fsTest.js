//fsPromiseTest
//let { readFile, writeFile, appendFile, unlink, copyFile, mkdir, unlink, rmdir } = require('./utils/fsPromise');
//创建
// mkdir('./test').then(res => {
//     console.log(res);
// });
//删除文件夹
// rmdir('./test').then(result => {
//     console.log(result);
// });
//...

// readFile('./less/1.css').then(result => {
//     console.log(result);
// });




//mkdir('./test').then();
//let fs = require('fs');
// fs.mkdir('./less', err => {
//     if (err) {
//         console.log(err);
//     }
// });
// console.log(1);
// fs.readdir('./css', (err, result) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(result);
// });
// fs.rmdir('./less', err => {
//     console.log(err);
// });
// fs.readFile('./less.js', 'utf8', (err, result) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(result);
// });
// fs.writeFile('./less.js', 'hssh', err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
// });
// fs.unlink('./less.js', err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
// });
// fs.appendFile('./fsTest.js', 'hshs', err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
// });
// fs.copyFile('./1.js', './less/1.js', err => {

// })
// console.log(__filename);

/*
 *案例： 合并并且压缩CSS
 */
let { readFile, writeFile, appendFile, unlink, copyFile, mkdir, rmdir, readdir } = require('./utils/fsPromise');
//1. 把所有的css文件读取出来
readdir('./less').then(result => {
    return result.filter(item => /\.css$/i.test(item));
}).then(result => {
    let arg = [];
    result.forEach(item => {
        arg.push(readFile(`./less/${item}`));
    });
    return Promise.all(arg);
}).then(result => {
    result = result.join('');
    return result.replace(/( |\n|\r)/g, '');
}).then(result => {
    return writeFile('./less/build.min.css', result);
}).then(() => {
    console.log('创建成功');
});