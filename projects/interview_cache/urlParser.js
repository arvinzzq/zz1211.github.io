// 尽可能全面正确的解析一个任意url的所有参数为Object。
/**
结果：
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
*/

class Params {
  constructor() {
    this.params = {};
  }

  add(name, value = true) {
    value = decodeURIComponent(value);
    if (!isNaN(+ value)) {
      value = +value;
    }
    if (typeof this.params[name] === 'undefined') {
      this.params[name] = value;
    } else {
      this.params[name]instanceof Array
        ? this
          .params[name]
          .push(value)
        : (this.params[name] = [this.params[name], value]);
    }
  }
}

function parseParam(url) {
  const query = url.split('?')[1];
  const params = query.split('&');
  const res = new Params();
  params.forEach(param => {
    res.add(param.split('=')[0], param.split('=')[1]);
  });
  return res.params;
}

var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&en' +
    'abled';
const params = parseParam(url);
console.log('params -> ', params);

// const regxUrl = /^\?\w.&$/; const matchStrs = url.match(regxUrl);
// console.log('matched strings -> ', matchStrs); 可以思考怎么用正则来解决