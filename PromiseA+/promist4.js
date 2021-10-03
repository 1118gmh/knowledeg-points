class Promise{
  constructor(callback){
    this.state = "pedding";
    this.value = null;
  
    this.resolveFnArray = [];
    this.rejectFnArray = [];

    let resolveFn = result=>{
      let timer = setTimeout(()=>{
        clearTimeout(timer);
        if(this.state !== "pedding"){
          return;
        }
        this.state = "resolved";
        this.value = result;

        this.resolveFnArray.forEach(item=>{
          item(result);
        });

      },0);
    };
    let rejectFn = reason=>{
      let timer = setTimeout(()=>{
        clearTimeout(timer);
        if(this.state !== "pedding"){
          return;
        }
        this.state = "rejected";
        this.value = reason;

        this.rejectFnArray.forEach(item=>{
          item(reason);
        });
      },0);
    };

    try {
      callback(resolveFn,rejectFn);
    } catch (error) {
      rejectFn(error);
    }


  }
  then(resolvedCallback,rejectedCallBack){
    return new Promise((resolve,reject)=>{
      try {
        let x = this.rejectFnArray.push(resolvedCallback);
        x instanceof Promise?x.then(resolve,reject):resolve(x);
      } catch (error) {
        reject(error);
      }
      try {
        let y = this.resolveFnArray.push(rejectedCallBack);
        y instanceof Promise?y.then(resolve,reject):resolve(y);
      } catch (error) {
        reject(y);
      }
    });
  }
  catch(rejectedCallBack){
    this.then(null,rejectedCallBack);
  }
  static all(promiseAry = []){
    return new Promise((resolve,reject)=>{
      let index = 0;
      let result = [];
      promiseAry.forEach(item=>{
        item.then((data)=>{
          result[index] = data;
          index++;
          if(index === promiseAry.length){
            resolve(result);
          }
        },reject);
      });
    });
  }
}