function throttle(func, wait = 0) {
  let last_timer = null;
  let current_timer = null;
  return function (...args) {
    current_timer = +new Date();
    if (!last_timer || (last_timer + wait < current_timer)) {
      func.apply(this, args);
      last_timer = current_timer;
    }
  };
}

function say() {
  console.log('heiheihei');
}

const ssay = throttle(say, 2000);

const handler = setInterval(ssay, 1000);

setTimeout(() =>{
  clearInterval(handler);
  console.log('clear handler');
}, 10000);

