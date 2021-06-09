//namespace
//封装类似的代码
//防止命名冲突
namespace zoo {
  class Dog{

  }
}
//可通过export导出变量
namespace Home{
  export class Dog{}
}
let dog = new Home.Dog();