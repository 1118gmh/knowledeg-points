var utils = function() {
    "use strict";
    //常用函数
    //通过ClassName获取元素
    //getElementByClassName在IE678中不存在，因此可以用来判断是不是低版本浏览器
    var flag = "getElementsByClassName" in document;

    function getElementsByClassName(context, cName) {
        var context = context || document;
        var ary = [];
        if (this.flag) {
            return this.listToArray(context.getElementsByClassName(cName));
        }
        var allNode = context.getElementsByTagName("*");
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        for (var i = 0; i < allNode.length; i++) {
            var cur = allNode[i];
            if (reg.test(cur.className)) {
                ary.push(cur);
            }
        }
        return ary;
    }
    //将JSON字符串转换成JSON对象
    function toJSON(jsonStr) {
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")");
        }
        return jsonObj;
    }
    //判断数据类型
    function isType(value, type) {
        var type = arguments[1] || "object",
            reg = new RegExp("\\[object " + type + "\\]", "i");
        return reg.test(Object.prototype.toString.call(value));
    }
    //将类数组转换成数组
    function listToArray(likeAry) {
        var ary = [];
        if (this.flag) {
            ary = Array.prototype.slice.call(likeAry, 0);
        } else {
            for (var i = 0; i < likeAry.length; i++) {
                ary.push(likeAry[i]);
            }
        }
        return ary;
    }
    /***下面是设置DOM***/
    /**
     * getEleChildren:获取指定节点名的元素节点们；第二个参数如果不传，则返回obj下的所有子元素节点；
     * @param  parent [Node]
     * @param  tagName [String]
     * @return ary 元素节点数组
     */
    function getEleChildren(parent, tagName) {
        var allNode = parent.childNodes,
            ary = [],
            reg = new RegExp("^" + tagName + "&", "i");
        for (var i = 0; i < allNode.length; i++) {
            var cur = allNode[i];
            if (cur.nodeType === 1) {
                if (tagName) {
                    if (reg.test(cur.nodeName)) {
                        ary.push(cur);
                    }
                    continue;
                }
                ary.push(cur);
            }
        }
        return ary;
    }
    //获取第一个元素节点
    function getFirst(curEle) {
        var childern = this.getEleChildren(curEle);
        return childern.length > 0 ? childern[0] : null;
    }
    //获取最后一个元素节点
    function getLast(curEle) {
        var childern = this.getEleChildren(curEle);
        return childern.length > 0 ? childern[childern.length - 1] : null;
    }
    //获取上一个哥哥元素节点
    function getPre(curEle) {
        if (this.flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }
    //获取所有的哥哥元素节点们
    function getPres(curEle) {
        var ary = [],
            next = this.getPre(curEle);
        while (next) {
            ary.push(next);
            next = this.getPre(next);
        }
        return ary;
    }
    //获取下一个弟弟元素节点
    function getNext(curEle) {
        if (this.flag) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    }

    function getNexts(curEle) {
        var ary = [],
            next = this.getNext(curEle);
        while (next) {
            ary.push(next);
            next = this.getNext(next);
        }
        return ary;
    }
    //获取以一个哥哥元素节点和下一个弟弟元素节点
    function getSibling(curEle) {
        var ary = [],
            pre = this.getPre(curEle),
            next = this.getNext(curEle);
        pre ? ary.push(pre) : void 0;
        next ? ary.push(next) : void 0;
        return ary;
    }
    //获取所有的兄弟元素节点（除自己）
    function getSiblings(curEle) {
        var pres = this.getPres(curEle),
            nexts = this.getNexts(curEle);
        return pres.concat(nexts);
    }
    //获取元素的索引值
    function getIndex(curEle) {
        return this.getPres(curEle).length;
    }
    //在oldEle后面插入新的元素newEle。若未指定oldEle，则直接添加在后面
    function insertAfter(newEle, oldEle) {
        var next = this.getNext(oldEle),
            par = oldEle.parentNode;
        next ? par.insertBefore(newEle, next) : par.appendChild(newEle);
    }
    //把一个元素节点添加为parentEle的第一个子节点
    function prependChild(parentEle, curEle) {
        var first = this.getFirst(parentEle);
        first ? parentEle.insertBefore(curEle, first) : parentEle.appendChild(curEle);
    }
    //不传str：获取元素的innerHTML
    //传str：设置元素的innerHTML为str
    function innerHTML(curEle, str) {
        var str = str || "";
        if (!str) {
            return curEle.innerHTML;
        }
        curEle.innerHTML = str;
    }
    //处理元素的innerText和TextContent的兼容性（传一个参数获取，传两个参数设置）
    function text(ele, str) { //处理innerText和textContent的兼容性；传一个参数是获取；2个参数是设置；
        if (ele && ele.nodeType && ele.nodeType == 1) {
            if (str === undefined) { //如果str没有传，那么方法是获取元素的文本内容；
                if (typeof ele.textContent == 'string')
                    return ele.textContent;
                else
                    return ele.innerText;
            } else { //如果传了，就是添加文本内容
                if (str === null) {
                    alert('text方法参数错误,str为null！');
                    return;
                } else if (typeof str == 'string') {
                    if (typeof ele.textContent == 'string') {
                        ele.textContent += str;
                    } else {
                        ele.innerText += str;
                    }
                } else {
                    alert('text方法的参数错误！')
                }
            }
        } else {
            alert('text方法的ele参数错误！')
        }
    }
    /***设置CSS***/
    //设置CSS属性（3个参数）和获取CSS（2个参数）
    function setCss(curEle, attr, value) {
        if (typeof value === "undefined") {
            //获取Css
            var reg = /^(?:margin|padding|border|float|position|display|background|backgroundColor)$/;
            var value = this.flag ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
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
    }
    //给元素style属性设置一组属性，cssObj是一个对象类型
    function setGroupCss(curEle, cssObj) {
        for (var key in cssObj) {
            this.setCss(curEle, key, cssObj[key]);
        }
    }

    //获取偏移量
    function offset(curEle) {
        var par = curEle.offsetParent,
            left = curEle.offsetLeft,
            top = curEle.offsetTop;
        while (par) {
            left += par.offsetLeft;
            top += par.offsetTop;
            if (navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
                left += par.clientLeft;
                top += par.clientTop;
            }
            par = par.offsetParent;
        }
        return {
            left: left,
            top: top
        }
    }
    //判断是否有某个className
    function hasClassName(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    }
    //增加某个ClassName
    function addClassName(curEle, cName) {
        if (!this.hasClassName(curEle, cName)) {
            curEle.className += (" " + cName);
        }
    }
    //移除某个className
    function removeClassName(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
        if (this.hasClassName(curEle, cName)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    }
    return {
        flag: flag,
        getElementsByClassName: getElementsByClassName,
        toJSON: toJSON,
        isType: isType,
        listToArray: listToArray,
        getEleChildren: getEleChildren,
        getFirst: getFirst,
        getLast: getLast,
        getPre: getPre,
        getPres: getPres,
        getNext: getNext,
        getNexts: getNexts,
        getSibling: getSibling,
        getSiblings: getSiblings,
        getIndex: getIndex,
        insertAfter: insertAfter,
        prependChild: prependChild,
        innerHTML: innerHTML,
        text: text,
        setCss: setCss,
        setGroupCss: setGroupCss,
        offset: offset,
        hasClassName: hasClassName,
        addClassName: addClassName,
        removeClassName: removeClassName

    };
}();
//在库上增加方法，同时不影响原来的方法；在类的原型上增加方法
~ function() {
    //数组去重
    Array.prototype.removeRepeat = function() {
        let obj = {};
        for (let i = 0; i < this.length; i++) {
            if (obj[this[i]] === undefined) {
                obj[this[i]] = this[i];
            } else {
                this[i--] = this[this.length - 1];
                this.length--;
            }
        }
        obj = null;
        return this;
    };
    //forEach兼容处理
    Array.prototype.forEachPro = function(fn, context) {
        var context = context || window;
        if (this.forEach) {
            this.forEach(fn, context);
            return this;
        }
        for (var i = 0; i < this.length; i++) {
            fn.call(context, this[i], i, this);
        }
        return this;
    };
    //判断是否为公有属性
    Object.prototype.myHasProperty = function(attr) {
        return (attr in this) && !this.hasOwnProperty(attr);
    };
    //去除首尾空格
    String.prototype.myTrim = function() {
        return this.replace(/^\s*|\s*$/g, "");
    };
    //是不是有效的
    String.prototype.mySub = function(len, isD) {
        var len = len || 10,
            isD = isD || false,
            str = "",
            n = 0;
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;

        }
        return str;
    };
    /*
     *formatTime:时间字符串的格式化
     *@params
     *	templete:[string] 我们最后期望获取日期格式的模板 模板规则：{0}->年 {1}->月...
     *@return
     *	[string]格式化后的时间字符串
     */
    String.prototype.myFormatTime = function(templete) {

        //1.首先获取时间字符串的年月日等信息
        let timeAry = this.match(/\d+/g);
        //模板字符串
        //let templete = "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        var templete = templete || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        templete = templete.replace(/\{(\d+)\}/g, (content, $1) => {
            //=>content:当前大正则匹配的信息  $1：小分组匹配到的信息
            //=>以$1的值为索引，到timeAry中找到对应的时间（如果没有则用"00"表示）
            let time = timeAry[$1] || "00";
            time.length < 2 ? time = "0" + time : time;
            return time;
        });
        return templete;
    };
    /*
     *queryURLParams:获取URL地址问好后面的参数信息（可能也包含HASH值）
     *@params
     *@retuen
     *	[object]把所有问好参数信息已键值对的方式存储起来并返回
     */
    String.prototype.myQueryURLParams = function() {
        let obj = {};
        this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => { obj[$1] = obj[$2] });
        this.replace(/#([^?=&#]+)/g, (...[, $1]) => obj['HASH'] = $1);
        return obj;
    };
    /*
     *millimeter:实现大数字的千分符处理
     *@params
     *@return
     */
    String.prototype.millimeter = function() {
        return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ',');
    };

}();