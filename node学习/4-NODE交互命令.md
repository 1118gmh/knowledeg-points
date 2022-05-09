### inquirer

1. 安装
```
npm install inquirer
```

2. 引入
```
var inquirer = require('inquirer');
```
3. 方法
```
inquirer.prompt([])
```

3. 类型
```
input      输入
confirm    确认
list       单选
checkbox   多选
password   密码
```
4. 示例
```
  inquirer.prompt([ {
    name: 'aaa',
    type: 'input',
    message: 'input: year, month and day',
    default: 'year'
  }]).then((res) => {
    console.log('Year: ' + res.input);
    typeConfirm();
  })
  返回的是promise实例
  
  name:名字
  type：类型
  message：提示语
  default：默认值
  choices: 选择列表 ['red', 'blue', 'yellow'],
  mask: 是否出现*号 false
```
