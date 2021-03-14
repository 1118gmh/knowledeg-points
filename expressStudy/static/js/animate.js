/*
~ function() {
    //报错
    let utils = (function() {
        let getCss = (ele, attr) => {
            let val = null,
                reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
            if ('getComputedStyle' in window) {
                val = window.getComputedStyle(ele)[attr];
                reg.test(val) ? val = parseFloat(val) : null;
            }
            return val;
        };
        let setCss = (ele, attr, value) => {
            if (!isNaN(value)) {
                if (!/^(opacity|zIndex)$/.test(attr)) {
                    value += 'px';
                }
            }
            ele['style'][attr] = value;
        };
        let setGroupCss = (ele, options) => {
            for (let attr in options) {
                if (options.hasOwnProperty(attr)) {
                    this.setCss(ele, attr, options[attr]);
                }
            }
        };
        let css = (...arg) => {
            let len = arg.length,
                fn = getCss;
            if (len >= 3) {
                fn = setCss;
            }
            if (len === 2 && typeof arg[1] === 'object') {
                fn = setGroupCss;
            }
            return fn(...arg);
        };
        return {
            css
        }
    })();
    //=>effect：准备运动的公式
    let effect = {
        linear: (t, b, c, d) => t / d * c + b
    };
    //封装动画库
    window.animate = function(ele, target = {}, duration = 1000) {
        //1. 基于target算出begin、change
        let begin = {},
            change = {},
            time = 0;
        for (let attr in target) {
            if (target.hasOwnProperty(attr)) {
                begin[attr] = utils.css(ele, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }
        //2. 实现动画
        let animateTimer = setInterval(() => {
            time += 17;
            //边界判断
            if (time >= duration) {
                utils.css(ele, target);
                clearInterval(animateTimer);
                return;
            }
            let cur = {};
            for (let attr in target) {
                if (target.hasOwnProperty(attr)) {
                    cur[attr] = effect.linear(time, begin[attr], change[attr], duration);
                }
            }
            utils.css(ele, cur);
        }, 17);
    };
}();

animate($('.box')[0], {
    top: 1000,
    left: 1000,
    width: 50,
    height: 50
}, 300);
*/
~ function() {

    let setCss = function(curEle, attr, value) { //设置CSS属性值和获取CSS；如果三个参数就是设置，2个参数就是获取；att是attribute的缩写；
        if (typeof value === "undefined") { //如果有第三个参数，就是设置Css；如果没有就是获取Css；
            var reg = /^(?:margin|padding|border|float|position|display|background|backgroundColor)$/;
            var flag = "getElementsByClassName" in document;
            var value = flag ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
            return !reg.test(attr) ? parseFloat(value) : value;
        } else {
            switch (attr) {
                case "opacity":
                    curEle["style"][attr] = value;
                    curEle["style"]["filter"] = "alpha(opacity=" + (value * 100) + ")";
                    break;
                case "zIndex":
                    curEle["style"][attr] = value;
                    break;
                default:
                    curEle["style"][attr] = !isNaN(value) ? value += "px" : value;
            }
        }
    };

    let setGroupCss = function(curEle, cssObj) {
        for (var key in cssObj) {
            setCss(curEle, key, cssObj[key]);
        }
    }
    window.animate = function(ele, target = {}, duration = 1000, callback = new Function('')) {
        //计算change、begin
        let change = {},
            begin = {},
            time = 0;
        for (let attr in target) {
            if (target.hasOwnProperty(attr)) {
                begin[attr] = setCss(ele, attr);
                change[attr] = target[attr] - begin[attr];
            }
        }
        //清除上一个动画的执行
        clearInterval(ele.animateTimer);
        //执行动画
        ele.animateTimer = setInterval(() => {
            //时间间隔
            time += 17;
            //边界判断
            if (time > duration) {
                setGroupCss(ele, target);
                clearInterval(ele.animateTimer);
                callback.call(ele); //动画完成之后执行回调函数,并且让this为当前操作元素本身
                return;
            }
            //获取当前位置
            let cur = {};
            for (let attr in target) {
                if (target.hasOwnProperty(attr)) {
                    cur[attr] = time / duration * change[attr] + begin[attr];
                }
            }
            //设置元素样式为当前位置
            setGroupCss(ele, cur);
        }, 17);
    }
}();