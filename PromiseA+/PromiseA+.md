## PromiseA+

### 复习promise

```js
new Promise((resolve,reject)=>{//在这个函数中可以管控异步操作
    //resolve(); 成功
    //reject(); 失败
}).then(result=>{ 	//每一次调取then方法，都会返回一个新的promise实例
    //成功则执行resolve
}).catch(reason=>{ //相当与.then(null,reason=>{})
	//失败执行    
});

```

### 封装Promise库

原理

![](D:\knowledeg-points\PromiseA+\promise原理.png)

```js
class Promise {
    constructor(excutorCallBack) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => {
                    item(this.value)
                });
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => {
                    item(reason);
                });
            });
        };
        try {
            excutorCallBack(resolveFn, rejectFn);
        } catch (err) {
            rejectFn(err);
        }
    }
    then(fulfilledCallback, rejectedCallback) {
        //处理不传参的情况
        typeof fulfilledCallback !== 'function' ? fulfilledCallback = result => result : null;
        typeof rejectedCallback !== 'function' ? rejectedCallback = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;
        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
        });

        // this.fulfilledAry.push(fulfilledCallback);
        // this.rejectedAry.push(rejectedCallback);
    }
    catch (rejectedCallback) {
        return this.then(null, rejectedCallback);
    }
    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {
            //index:记录成功的数量
            //result:记录成功的结果
            let index = 0,
                result = [];
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(val => {
                    index++;
                    result[i] = val; //索引和promiseAry对应上，保证结果的顺序和数组顺序一致
                    if (index === promiseAry.length) {
                        resolve(result);
                    }
                }, reject);
            }
        });
    }

}
module.exports = Promise;
```

```js
//test1
let Promise = require('./promise_gmh');
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 0);
}).then(result => {
    // throw new Error('ERROR');
    // console.log(result);
    return result;
}).then(result => {}, reason => {
    console.log(reason);
});
//test2
let Promise = require('./promise_gmh');
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 50);
});
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 80);
});
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(300);
    }, 10);
}).catch(itme => {
    console.log(itme);
});

Promise.all([p1, p2, p3]).then(result => {
    //=>所有的Promise都成功执行，result中分别存储每一个实例返回的结果，而且和数组中的顺序是一样的
    console.log(result);
});//[100,200,300]
```



