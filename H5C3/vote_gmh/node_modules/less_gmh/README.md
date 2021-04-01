## Description

This is a simple batch compression file plug-in

## Usage

Install the **less_gmh** package with [NPM](https://www.npmjs.org/):

```
npm install less_gmh
```

use

```js
1. configuration file :less.config.js
	entry: [
        `${dirpath}/less/index.less`,
        `${dirpath}/less/detail.less`
    ],
    output: [
        `${dirpath}/css/index.min.css`,
        `${dirpath}/css/detail.min.css`
    ]
2. Import module
	const less_gmh = require('less_gmh');
3. Execute compressed code
	less_gmh.render();
```

## the use of Basic asynchronous fs API

use

```js
const {
    mkdir,
    rmdir,
    unlink,
    readdir,
    readFile,
    copyFile,
    writeFile,
    appendFile
} = require('less_gmh/utils/jsPromise');

mkdir(path).then(...);//rmdir、unlink、readdir、readFile同理
copyFile(path,copypath).then();
writeFile(path,content);//appendFile同理

```

