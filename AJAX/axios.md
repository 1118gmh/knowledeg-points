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



