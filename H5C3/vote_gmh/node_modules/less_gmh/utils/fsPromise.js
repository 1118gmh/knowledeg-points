let fs = require('fs');
let path = require('path'),
    rootpath = path.resolve();
//mkdir 2 无res
//rmdir 
//unlink

//readdir 2 有res

//copyFile 3 

//readFile 3 有res

//writeFile 4 无res
//appendFile
['mkdir', 'rmdir', 'unlink', 'readdir', 'readFile', 'copyFile'].forEach(item => {
    module.exports[item] = function(pathname, copypath = '') {
        pathname = path.resolve(rootpath, pathname);
        copypath = path.resolve(rootpath, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            if (item === 'readFile') {
                //非图片资源设置utf-8
                if (!/(JPG|JPEG|PNG|GIT|SVG|ICO|BMP|EOT|TTF|WOFF|MP3|MP4|OGG|WAV|M4A|WMV)$/i.test(pathname)) {
                    arg.unshift('utf-8');
                }

            }
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    }
});

['writeFile', 'appendFile'].forEach(item => {
    module.exports[item] = function(pathname, content) {
        pathname = path.resolve(rootpath, pathname);
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