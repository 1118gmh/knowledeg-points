
/**
 * 类型保护（一个变量可能是多个类型，因此需要区分开来，才能调用各个类型的方法）
    * typeof保护
    * instanceof保护
    * null保护
    * 根据属性来区分
 */
namespace a {
  //1. typeof保护
  function double(input: number | string | boolean) {

    if (typeof input === 'string') {
      input.trim(); // 在这里确定了input变量的类型为string，可以调用string类型方法
    } else if (typeof input === 'number') {
      input.toFixed();
    } else {
      input;
    }
  }
  //2. instanceof保护
  class Animal {
    public name: string = 'gmh';
  }
  class Bird extends Animal {
    public swing: number = 2;

  }
  function getName(a: Animal) {
    if (a instanceof Bird) {
      a.name;
      a.swing;
    } else {
      a.name;
    }
  }
  //3. null保护
  function getFirstLetter(s: string | null) {
    // if(s === null){
    //   s = '';
    // }
    s = s || ''; //上面的 等同于这一句话
    return s.charAt(0);
    // return s!.charAt(0); //如果确保自己传递的s为string类型，则可以添加非空断言来确保部位null
  }

  //根据属性来判断
  interface WaringButton {
    class: 'warning'; //字面量类型 固定的 写死了 calss变量的值就是warning
    text1: '修改'
  }
  interface DangerButton {
    class: 'danger';
    text2: '修改'
  }
  type Button = WaringButton | DangerButton;
  function getButton(button: Button) {
    //button.class;如果不判断的话，只能获取其共有的属性
    if (button.class === 'warning') {
      button.text1;
    } else {
      button.text2;
    }
  }
  interface Bird {
    swing: number;
  }
  interface Dog {
    leg: number;
  }
  function getNumber(animal: Bird | Dog) {
    // animal//这里animal获取不到属性，需要判断之后获取
    if ('swing' in animal) {
      animal.swing;
    } else {
      animal.leg;
    }
  }
}
namespace b{
  //5. 自定义的类型保护
  interface Bird {
    name1:'Bird';
    legs: number;
  }
  interface Dog {
    name2:'Dog';
    legs: number;
  }

  function isBird(a:Bird|Dog):a is Bird{ //当返回值为true时，a is Bird
    return a.legs === 2;
  }
  function getNumber(animal:Bird|Dog){
    if(isBird(animal)){
      animal.name1; 
    }else{
      animal.name2;
    }
  }
}