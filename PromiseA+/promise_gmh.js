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