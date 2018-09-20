// 实现一个简单的数据绑定

const noop = () => {};

function bindData1(target, event) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      (function () {
        var v = target[key];
        Object.defineProperty(target, key, {
          get: function () {
            return v;
          },
          set: function (_value) {
            v = _value;
            event.call(this);
          }
        });
      })();
    }
  }
}

function bindData2(obj, property, getCallback = noop, setCallback = noop) {
  const data = {
    [property]: obj[property]
  };
  return Object.defineProperty(obj, property, {
    get() {
      console.log('get is invoked ~');
      getCallback();
      return data[property];
    },
    set(val) {
      console.log('set is invoked ~');
      setCallback();
      data[property] = val;
    }
  });
}

var obj1 = {
  a: 1,
  b: 2,
  c: 3
};

bindData1(obj1, function() {
  console.log('小魔仙 ~');
});

obj1.a = 10;
obj1.b = 20;
obj1.c = 30;


console.log('obj1 a => ', obj1.a);
console.log('obj1 b => ', obj1.b);
console.log('obj1 c => ', obj1.c);

console.log('#########################');

var obj2 = {
  hei: 123
};

bindData2(obj2, 'hei', () => {
  console.log('get callback ~');
}, () => {
  console.log('set callback ~');
});

console.log('obj.hei -> ', obj2.hei);
obj2.hei = 1233330;

console.log('obj.hei -> ', obj2.hei);

// a = 10; console.log('show a => ', a);

var obj3 = {
  name: 'zhongzhiqiang',
  age: 3
};

obj3 = new Proxy(obj3, {
  get(target, property) {
    console.log('proxy get ->');
    return target[property];
  },
  set(target, property, value) {
    console.log('proxy set ->');
    return target[property] = value;
  }
});

obj3.name = 'heiheihei';

console.log('obj3 name ->', obj3.name);