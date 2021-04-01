let path = require('path');
module.exports = {
    //=>需要编译的less文件
    entry: [
        `less/index.less`,
        `less/detail.less`
    ],
    output: [
        `css/index.min.css`,
        `css/detail.min.css`
    ]
};