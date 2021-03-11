class Promise {
    constructor(callback) {
        this.status = 'pending';
        this.value = undefined;
        let fulfilledAry = [];
        let rejectedAry = [];
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                fulfilledAry.forEach(item => {
                    item(this.value);
                });
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                rejectedAry.forEach(item => {
                    item(reason);
                });
            }, 0);
        };
        try {
            callback(resolveFn, rejectFn);
        } catch (err) {
            rejectFn(err);
        }
    }
    then(filfulledCallBack, rejectedCallBack) {
        typeof filfulledCallBack !== 'function' ? filfulledCallBack = result => result : null;
        typeof rejectedCallBack !== 'function' ? rejectedCallBack = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;
        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = filfulledCallBack();
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallBack();
                    x instanceof Promise ? x.then(resolve, reject) : resolve();
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    catch (rejectedCallBack) {
        return this.then(null, rejectedCallBack)
    }
    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {
            let result = [],
                index = 0;
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(val => {
                    index++;
                    result[i] = val;
                    if (index === promiseAry.length) {
                        resolve(result);
                    }
                }, reject);
            }
        });
    }
}
module.exports = Promise;