~ function(window) {
    let _default = {
        methods: 'GET',
        url: '',
        baseURL: '',
        headers: {},
        dataType: 'JSON',
        data: null, //post系列请求基于请求主体传递给服务器的内容
        params: null, //get系列请求基于问好传参传递给服务器的内容
        cache: true
    };

    let ajaxPromise = function ajaxPromise(options) {
        let {
            methods,
            url,
            headers,
            baseURL,
            dataType,
            data,
            params,
            cache
        } = options;
        //把传递的参数进一步处理
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(methods)) {
            //GET系列
            if (params) {
                url += `${ajaxPromise.check(url)}${ajaxPromise.formatData(params)}`;
            }
            if (cache === false) {
                url += `${ajaxPromise.check(url)}_=${+(new Date())}`;
            }
            data = null; //GET系列请求主体什么都不放
        } else {
            //POST系列
            data = ajaxPromise.formatData(data);
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(methods, `${baseURL}${url}`);
            //如果和headers存在，我们需要设置请求头
            if (headers !== null && typeof headers === 'object') {
                for (let attr in headers) {
                    if (headers.hasOwnProperty(attr)) {
                        let val = headers[attr];
                        //判断值是否出现中文,若包含，则对其进行编码
                        if (/[\u4e00-\u9fa5]/.test(val)) {
                            val = encodeURIComponent(val);
                        }
                        xhr.setRequestHeader(attr, val);
                    }
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (/^(2|3)\d{2}$/.test(xhr.status)) {
                        //数据处理
                        let result = xhr.responseText;
                        dataType = dataType.toUpperCase();
                        dataType === 'JSON' ? result = JSON.parse(result) : (dataType === 'XML' ? result = xhr.responseXML : null);
                        resolve(result);
                        return;
                    }
                    reject(xhr.statusText);
                }
            };
            xhr.send(data);
        });

    };
    ajaxPromise.defaults = _default;

    ajaxPromise.formatData = function(obj) {
        let str = ``;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                str += `${attr}=${obj[attr]}&`;

            }
        }
        return str.substring(0, str.length - 1);
    };
    ajaxPromise.check = function(url) {
        return url.indexOf('?') > -1 ? '&' : '?';
    };
    //将默认配置暴露给用户，让用户可以自己设置一些基础的默认值（发送AJAX请求的时候按照用户配置的信息及进行处理）
    //GET
    ['get', 'delete', 'head', 'options'].forEach(item => {
        ajaxPromise[item] = function(url, options = {}) {
            options = {
                ..._default, //默认值或者基于defaults修改的值
                ...options, //用户调取方法传递的配置项
                url: url, //请求的URL地址（第一个参数，默认配置和传递的配置项都不出现URL，只能这样获取）
                methods: item.toUpperCase() //执行时ajaxPromise.head执行，不会设置这个配置项，我们自己配置才可以
            };
            return ajaxPromise(options);
        };
    });
    //POST
    ['post', 'put', 'patch'].forEach(item => {
        ajaxPromise[item] = function(url, data = {}, options = {}) {
            options = {
                ..._default,
                ...options,
                url: url,
                methods: item.toUpperCase(),
                data: data
            };
            return ajaxPromise(options);
        };
    });
    window.ajaxPromise = ajaxPromise;
}(window);