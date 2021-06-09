namespace b{
  class Person{
    myname:string;
    constructor(name:string){
      this.myname = name;
    }
    //存取器
    get name(){
      return this.myname;
    }
    set name(newVal:string){
      this.myname = newVal.toUpperCase();
    }
  }
  let p = new Person('gmh');
  console.log(p.name);//gmh
  p.name = 'gmh2';
  console.log(p.name);
}
namespace c{
  class Person{
    //这注释的两行代码 等同于 public 表示将name属性公开变为这个Person类的私有属性
    //readonly：该属性只读，不可更改
    // name:string;
    constructor(public readonly name:string){
      // this.name = name;
      
    }
  }
  let p = new Person('gmh');
  console.log(p.name);//gmh
}
/**
 * 继承
 * 子类继承父类后，子类的属性上就拥有了父类上的
 * 
 * 访问修饰符：public protected private
 * public：可以在自己和子类和其他类中访问
 * protected：可以在自己和子类中访问，其他类中不能访问
 * private：只能在自己类中访问
 */
 namespace c{
  class Person{
    public name:string;
    protected age:number;
    private amount:number;
    constructor(name:string,age:number){
      this.name = name;
      this.age = age;
    }
    getName(){
      return this.name;
    }
    setName(newName:string){
      this.name = newName;
    }
  }
  class Student extends Person{
    static type = 'Student';//static静态的，把Student当成一个对象，在这个对象上挂载属性，只能通过Student.来访问
    stuNo:number;
    constructor(name:string,age:number,stuNo:number){
      super(name,age);
      this.stuNo = stuNo;
    }
    static getType(){ //相当于在这个Student对象上挂载方法，只能通过Student.来访问
      return Student.type;
    }
    getStuNo(){
      // console.log(this.amount);amount私有，不能再子类和其他类中访问
      return this.name + this.age + this.stuNo;
    }
    setStuNo(newNo:number){
      this.stuNo = newNo;
    }
  }
  let p = new Person('gmh',21);
  p.name;
  // p.age;age是protected，不能在其他类中访问
}