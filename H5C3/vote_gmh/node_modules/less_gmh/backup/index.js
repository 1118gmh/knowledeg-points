let path = require('path'),
    lessc = require('less');
let { readFile, writeFile } = require('./utils/fsPromise');
let { entry, output } = require('./less.config');
//=>分别读取entry中对应的less文件中的代码
module.exports = {
    render() {
        entry.forEach((item, index) => {
            readFile(item).then(result => {
                //把读取的less代码进行编译：编译为css
                lessc.render(result, { compress: true }, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    let { css } = result;
                    writeFile(output[index], css);
                });
            });
        });
    }
};