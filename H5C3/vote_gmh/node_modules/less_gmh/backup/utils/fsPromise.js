let fs = require('fs');
let path = require('path');
//mkdir 2 无res
//rmdir 
//unlink

//readdir 2 有res

//copyFile 3 

//readFile 3 有res

//writeFile 4 无res
//appendFile
['mkdir', 'rmdir', 'unlink', 'readdir', 'readFile', 'copyFile'].forEach(item => {
    module.exports[item] = function(pathname, copypath) {
        pathname = `${path.resolve()}\\${pathname}`;
        copypath = `${path.resolve()}\\${copypath}`;
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            item === 'readFile' ? arg.unshift('utf-8') : null;
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    }
});

['writeFile', 'appendFile'].forEach(item => {
    module.exports[item] = function(pathname, content) {
        pathname = `${path.resolve()}\\${pathname}`;
        if (typeof content !== 'string') {
            //写入的内容必须是字符串
            content = JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname, content, 'utf-8', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        });
    };
});
// module.readFile = function(pathname) {
//     pathname = path.resolve(dirname, pathname);
//     return new Promise((resolve, reject) => {
//         fs.readFile(pathname, 'utf-8', (err, result) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(result);
//         });
//     });
// };
// module.exports = {
//     readFile
// };