let path = require('path'),
    dirpath = path.resolve();
module.exports = {
    //=>需要编译的less文件
    entry: [
        `${dirpath}/less/index.less`,
        `${dirpath}/less/detail.less`
    ],
    output: [
        `${dirpath}/css/index.min.css`,
        `${dirpath}/css/detail.min.css`
    ]
};