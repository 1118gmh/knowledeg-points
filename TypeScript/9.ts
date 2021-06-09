/**
 * 总结：
 * & 交叉类型(其实就是两个接口类型属性的并集)
 * typeof 获取一个变量的类型 typeof p
 * [] 索引访问操作符 我们可以通过[]来获取一个类型的子类型  let myInterestsName:Person["interests"][0]["name"] = 'football';
 * keyof 索引类型操作符 keyof Person2;
 * Partial 可选 Partial<Person3>
 * Required 必选 Required<Person3>
 * ReadOnly 只读 Readonly<Person3>
 * Pick 提取出一个接口的某个属性 Pick<Person3,"name">
 * 
 * 关于类型和值
 * 类型：class enum interface type 
 * 值：class enum var let const function
 */


/**
 * 交叉类型(其实就是两个接口类型属性的并集)
 *  
 */
namespace a {
  interface Bird{
    name:string;
    fly():void;
  }
  interface Person{
    name:string;
    eat():void;
  }
  
  type BirdMan = Bird & Person;
  let p:BirdMan = {
    name:'gmh',
    fly(){},
    eat(){}
  }
}
/**
 * typeof:获取一个变量的类型
 * 
 */
namespace b{
  //typeof可以获取一个变量的类型
  let p = {
    name:'gmh',
    age:21
  }
  //定义了一个类型Person，格式和变量p一样
  type Person = typeof p; 
  let p2 :Person = {
    name:'gmh2',
    age:22
  }
}
/**
 * 索引访问操作符 []
      * 我们可以通过[]来获取一个类型的子类型
 * 索引类型操作符 keyof 
 * 
 * 映射类型 定义的时候用in操作符去批量定义
 * Partial可选 Partial<Person3>
 * Required必选 Required<Person3>
 * ReadOnly 只读 Readonly<Person3>
 * Pick 提取出一个接口的某个属性 Pick<Person3,"name">
 */
namespace c {
  interface Person{
    name:string;
    age:number;
    job:{
      name:string;
    };
    interests:{name:string,age:number}[];
  }
  let myJobName:Person["job"] = {
    name:'gmh'
  }
  let myInterestsName:Person["interests"][0]["name"] = 'football';

  interface Person2 {
    name:string;
    age:number;
    gender:'male' | 'female';
  }
  //根据key获取值，由于key只能是name/age/gender这3个值，因此要对key进行约束（不约束的话，val[key]报错）
  type Person2Key = keyof Person2; //keyof返回一个接口的key的集合
  function getNameByKey(val:Person2,key:Person2Key):any{
    return val[key]; 
  }
  let person2:Person2 = {
    name:'gmh',
    age:21,
    gender:'male'
  }
  console.log(getNameByKey(person2,"name"));//gmh

  //映射类型 在定义的时候用in操作符去批量定义
  interface Person3 {
    name:string;
    age:number;
    gender:'male' | 'female';
  }
  //用这种类型约束的变量，其内属性可选
  // type PartialPerson = {
  //   [key in keyof Person3] ?: Person3[key];
  // }
  // 简写方式 Partial可选
  type PartialPerson = Partial<Person3>;  //Partial原生自带
  // 等同于
  // type PartialPerson = {
  //   name?:string;
  //   age?:number;
  //   gender?:'male' | 'female';
  // }

  let p3:PartialPerson = {
    name:'gmh' //只写一个也可以了
  }

  //Required必选 每一项都必填
  type PartialPerson2 = Required<Person3>;
  let pp3:PartialPerson2 = {
    name:'gmh',
    age:32,
    gender:'male'
  }
  //ReadOnly 只读
  type PartialPerson3 = Readonly<Person3>;
  let ppp3:PartialPerson3 = {
    name:'gmh',
    age:21,
    gender:'male'
  }
  // ppp3.name = 'g';//报错 属性只读

  // Pick 提取出一个接口的某个属性
  type PickPerosn = Pick<Person3,"name">; //提取出Person3中的name属性 {name:string;}
  let x:PickPerosn = {
    name:'gmh'
  }

}