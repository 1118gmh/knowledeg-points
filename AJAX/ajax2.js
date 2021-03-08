~ function(window) {
    function AJAX(url, options) {
        return new init(url, options);
    };
    let init = function(url, options) {
        let {
            methods = 'GET',
                async = true,
                data = null,
                dataType = 'json',
                cache = true,
                success,
                error
        } = options;
        ['url', 'methods', 'async', 'data', 'dataType', 'cache', 'success', 'error'].forEach(item => {
            this[item] = eval(item);
        });
        this.sendAJAX();
    };
    AJAX.prototype = {
        constructor: AJAX,
        init: init,
        sendAJAX: () => {
            //处理catch
            //处理data
            let {
                url,
                methods,
                async,
                data,
                success,
                error
            } = this;
            let xhr = new XMLHttpRequest();
            xhr.open(methods, url, async);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (/(4|5)\d{2}/.test(xhr.status)) {
                        error || error(xhr.statusText, xhr);
                        return
                    }
                    let result = this.computedData(xhr.responseText);
                    success || success(result, xhr);
                }
            };
            xhr.send(data);
        }
    };
    init.prototype = AJAX.prototype;
    window.AJAX = AJAX;
}(window);

AJAX('./json/data.jsonn', {
    methods: 'get',
    async: true,
    data: {
        name: 'xiaoming',
        age: 11
    },
    dataType: 'json',
    cache: true,
    success: result => {
        console.log(result);
    },
    error: msg => {
        console.log(msg);
    }
});