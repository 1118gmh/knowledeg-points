// let source = `var HTML_WEBPACK_PLUGIN_RESULT;HTML_WEBPACK_PLUGIN_RESULT="hello"`; // webpack 5.22.0 以下版本
let source = `var HTML_WEBPACK_PLUGIN_RESULT;(function(){HTML_WEBPACK_PLUGIN_RESULT="hello"})()`; // webpack 5.22.0 版本
const vm = require("vm");
const vmContext = vm.createContext({ HTML_WEBPACK_PLUGIN: true, require: require, module, console: console, ...global });
const vmScript = new vm.Script(source);
// Evaluate code and cast to string
let newSource;
try {
    newSource = vmScript.runInContext(vmContext);
} catch (e) {
    return Promise.reject(e);
}
console.log(newSource);