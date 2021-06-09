namespace a {

  interface Fish {
    name1:string;
  }
  interface Water {
    name2:string;
  }
  interface Bird {
    name3:string;
  }
  interface Sky {
    name4:string;
  }
  //条件类型
  type Condition<T> = T extends Fish ? Water :Sky;
  let condition:Condition<Fish> = {
    name2:'gmh'
  }

  // 条件类型的分发
  type Condition2<T> = T extends Fish ? Water :Sky;
  //可以是Water类型或者Sky类型
  let c1:Condition2<Fish|Bird> = { name2:'gmh'}
  let c2:Condition2<Fish|Bird> = {name4:'gmh'}
  //等同于
  // let c1:Water|Sky = {name2:'gmh'}
  // let c2:Water|Sky = {name4:'gmh'}

}

namespace b{
  //Exclude 从前者中排除后者
  type E = Exclude<number|string,string>;
  let e:E = 1;
  //Extract 从前者中选择后者
  type E2 = Extract<number|string|boolean,string>;
  let e2:E2 = 'gmh';
  //NonNullable 去除null、undefined类型
  type E3 = NonNullable<number|string|null|undefined>;
  let e3:E3 = 'gmh';
  let e33:E3 = 1;
  //ReturnType 获取返回值类型
  function getUserInfo(){
    return {name:'gmh',age:21};
  }
  type userInfo = ReturnType<typeof getUserInfo>; //先通过typeof拿到函数的类型，在通过ReturnType拿到函数的返回值类型
  let user:userInfo = {name:'gmh',age:21};
  //InstanceType 获取构造函数的实例类型
  class Person{
    name:string;
    constructor(name:string){
      this.name = name;
    }
  }
  type P = InstanceType<typeof Person>;//先通过typeof拿到构造函数的类型，再通过InstanceType获取构造函数的实例类型
  let p:P = new Person('gmh');
}