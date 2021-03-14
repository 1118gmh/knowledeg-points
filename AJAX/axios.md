### axios

> 它是一个类库，基于Promise管理的AJAX库

**API**

```js
axios.get(url[,config]);

axios.post(url[,data[,config]]);

axios.request(config);

axios.delete(url[,config]);

axios.head(url[,config]);

axios.put(url[,data[,config]])

axios.patch(url[,data[,config]])
```



#### 基础操作

1. 发送一个get请求

> axio.get([url],[options])：向服务器发送一个请求，基于GET方式

```js
axio.get('...',{
    params:{
        name:'xiaoming',
        age:22
    }
})
```

> 在get请求中会把params中的键值对拼接成urlencode格式的字符串，然后以问好传递参数的方式，传递给服务器，类似于JQ-AJAX中的DATA（或者自己基于URL后面拼接也可以，不用params）

2. 发送一个post请求

```js
axio.post():
	axio.post('...',{
		name:'xiaoming',
		age:22
})
```

> 配置项中传递的内容都相当于基于请求主体传递给服务器，但是传递给服务器的内容格式是RAW（JSON格式的字符串），不是urlnicode格式字符串

> **基于GET和POST方法发送请求，返回的结果都是Promise实例**

```js
let promise = axios.get('...');//其他请求也差不多
promise.then(result=>{
    console.log(result);
    //result=>是一个对象
    /**
       config:基于AXIOS发送请求的时候的配置项
       data:从服务器获取的响应主体内容
       headers: 从服务器获取的响应头内容
       request: 创建的AJAX的实例
       status: 状态码
       statusText: 状态码的描述
     */
}).catch(msg=>{
    console.log(msg);//请求失败的原因
});
```

```js
//常用写法
axios.get('...',{
    params:{
        lx:11
    }
}).then(res=>{
    let {data} = result;
    //...
    
    return axio.post('...');
}).then(result=>{
    let {data} = result;
    //...
    
});
```

3. 一次性发送多个请求

```js
//一个装有promise实例的数组
let sendAry = [axios.get('./json/data.json'), axios.get('./json/data.json'), axios.head('./json/data.json')];
axios.all(sendAry).then(result => {
    //result => 一个数组，装有各个请求返回的数据
    console.log(result);
});


axios.all(sendAry).then(axios.spread((resA, resB, resC) => {
    //科里化函数思想
    //resA,resB,resC分别代表三次请求的结果
    console.log(resA);
    console.log(resB);
    console.log(resC);

}));
//当然，直接使用解构赋值更简单
axios.all(sendAry).then(result => {
    let [resA, resB, resC] = result;
    console.log(resA);
    console.log(resB);
    console.log(resC);
})
```

4. 初始化一些常用的配置项

```js
//=>全局默认配置
//设置默认路径
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/temp';
//设置默认规则
axios.defaults.validateStatus = function (status){
    //自定义成功失败规则：resolve 、 reject(默认以2开头算成功)
    //自定义以2/3开头算成功
    return /^(2|3)\d{2}$/.test(status);
};
//设置post请求中基于请求主体向服务器发送内容的格式，默认RAW，项目中常用的是urlencode格式
axios.defaults.transformRequest = data =>{
	//data：请求主体中需要传递给服务器的内容
    let str = ``;
    for(let attr in data){
        if(data.hasOwnProperty(attr)){
            str += `${attr}=${data[attr]}&`
        }
    }
    return str.substring(0,str.length-1);
};

//添加一个响应拦截器：分别在响应成功和失败的时候做一些拦截处理（在执行成功后设定的方法之前，先会执行拦截器中的方法,返回值传递给成功后设定的方法）
//可以设定一个拦截器，让其在执行成功方法是的参数直接为返回的响应的主体
axios.interceptors.response.use(result =>{
    return result.data;
});

//=>这些不是公共的最好放到每次的请求里面
//设置超出时间
axios.defaults.timeout = 2000;
//设置请求头
axios.defaults.headers['Content-type'] = 'x-www-form-urlencode';
axios.defaults.params = {};
axios.defaults.data = {};
//在请求的config中配置相同属性名的，会覆盖前面配置的
```

### 封装ajaxPromise库

```js
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
```

