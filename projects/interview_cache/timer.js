const noop = () => {};
const operationMap = {
  clockwise: 1,
  anticlockwise: -1
};
/**
 * 定时器，顺时针-逆时针 => 验证码发送
 */
export default class Timer {
  constructor(options) {
    this.options = options;
    this.handler = 0;
    this.count = options.start;
  }

  start() {
    const {
      callback = noop,
      start,
      step = 1,
      cycle,
      interval,
      mode = 'clockwise'
    } = this.options;
    this.reset();
    callback(this.count);
    this.handler = setInterval(() => {
      this.count = this.count + step * operationMap[mode];
      callback(this.count);
      if (mode === 'clockwise'
        ? this.count >= (start + cycle)
        : this.count <= (start - cycle)) {
        this.reset();
      }
    }, interval);
  }

  end() {
    this.reset();
  }

  reset() {
    clearInterval(this.handler);
    this.count = this.options.start;
  }
}
