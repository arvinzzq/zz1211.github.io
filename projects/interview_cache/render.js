// 实现一个最简单的模板引擎。

const template = '我是{{name}}，年龄{{age}}，性别{{sex}}';


function render(template, data) {
  const regTpl = /\{\{\s*(\w+)\s*\}\}/gi;
  const valArr = template.match(regTpl).map(item => item.replace(/\}\}|\{\{/g, ''));
  valArr.forEach(val => {
    template = template.replace(`{{${val}}}`, data[val]);
  });
  return template;
}

const res = render(template, {
  name: '钟志强',
  age: 3,
  sex: '男'
});

console.log('res -> ', res);
