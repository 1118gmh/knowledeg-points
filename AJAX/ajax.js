/**
 * url：请求的API的接口地址
 * method：请求的是方式
 * data：传递噶诶服务器的信息可以翻到data中
 *          如果是get请求是基于问好传参过去的
 *          如果是post请求是基于请求主体传递的
 *      data值可以是对象也可以是字符串（一般是常用对象）
 *          如果是对象类型，JQ就会把对象转换为xxx=xxx&xxx=xxx的模式（x-www-form-urlencoded）
 *          如果是字符串，我们写的是什么就传递什么
 * dataType：预设置获取结果的数据格式
 *             TEXT / JSON / JSONP / HTML /SCRIPT
 *             (服务器返回给客户端的响应主体中的内容一般都是字符串【JSON格式居多】，
 *              而设置dataType='JSON'，JQ会内部把获取的字符串转为JSON格式的对象)
 * async：设置同步异步（TRUE => 同步  false => 异步）
 * cache：设置get请求下是否建立缓存（默认 true => 建立缓存，false => 不建立缓存）
 *          当我们设置false，并且当前请求是get请求，JQ会在当前请求的URL地址末尾追加随机数（时间缀）
 * success：回调函数，当AJAX请求成功执行，JQ执行回调函数的时候会把响应主体中获取的结果（可能二次处理了）当做参数传递给回调函数
 * error：请求失败后执行的回调函数
 */
~ function(window) {
    function AJAX(options) {
        return new init(options);
    }
    let init = function(options = {}) {
        let {
            url,
            method = 'GET',
            data = null,
            dataType = 'JSON',
            async = true,
            cache = true,
            success,
            error
        } = options;
        //=>MOUNT:把配置项挂在到实例上
        ['url', 'method', 'data', 'dataType', 'async', 'cache', 'success', 'error'].forEach(item => {
            this[item] = eval(item);
        });
        this.sendAJAX();
    };
    AJAX.prototype = {
        constructor: AJAX,
        init,
        //发送AJAX请求
        sendAJAX() {
            this.handleCache();
            this.handleData();
            let {
                url,
                method,
                async,
                dataType,
                data,
                success
            } = this;
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, async);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    //error
                    if (!/^(2|3)\d{2}$/.test(xhr.status)) {
                        error && error(xhr.statusText, xhr);
                        return;
                    }
                    //success
                    let result = this.handleDataType(xhr);
                    success && success(result, xhr);
                }
            };
            xhr.send(data);
        },
        //处理dataType
        handleDataType(xhr) {
            let dataType = this.dataType.toUpperCase(),
                result = xhr.responseText;
            switch (dataType) {
                case 'TEXT':
                    break;
                case 'JSON':
                    result = JSON.parse(result);
                    break;
                case 'XML':
                    result = xhr.responseXML;
                    break;
            }
            return result;
        },
        //处理cache
        handleCache() {
            let {
                url,
                method,
                cache
            } = this;
            if (/^GET$/i.test(method) && (cache === false)) {
                url += `${this.check()}_=${+new Date()}`;
                this.url = url;
            }
        },
        //处理data
        handleData() {
            let { data, method } = this;

            if (!data) return;
            //
            if (typeof data === 'object') {
                //转换为urlencoded格式
                let str = ``;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        str += `${key}=${data[key]}&`;
                    }

                }
                data = str.substring(0, str.length - 1);

            }
            //GET请求
            if (/^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i.test(method)) {
                this.url += `${this.check()}${data}`;
                this.data = null;
                return;
            }
            //POST请求
            this.data = data;
        },
        //检测url中是否存在？
        check() {
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    };
    init.prototype = AJAX.prototype;
    window.ajax = AJAX;
}(window);