class Promise {
    constructor(callback) {
        this.status = 'pendding'
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];
        let resolveFn = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pendding') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => {
                    item(this.value);
                });
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pendding') return;
                this.status = 'rejected';
                this.value = reason;
                this.fulfilledAry.forEach(item => {
                    item(reason);
                });
            }, 0);
        };
        try {
            callback(resolveFn, rejectFn);
        } catch (error) {
            rejectFn(error);
        }
    }
    then(fulfilledCallback, rejectedCallback) {
        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallback(this.value);

                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
        });
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