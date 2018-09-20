// // 实现一个 js 的 class ，名字叫做：AnimateToNum，功能是从某个数字递增或者递减到另外一个数字，并且不管数字如何变化，都可以在指定的时间内完成。
// var AnimateToNum = require("animate-num");

// var numAnim = new AnimateToNum({
//   animTime:2000, //每次数字变动持续的时间（ms），
//   initNum:500, //初始化的数字
//   onChange:function(num){
//     console.log(num);
//   }
// });
 
// numAnim.toNum(100); // 从500变化到100，用2000ms的时间，在onChange回调中会一直从500倒数到100
const noop = () => {};

class AnimateToNum {
  constructor(props) {
    const { animTime, initNum, step = 1, onChange = noop } = props;
    this.animTime = animTime;
    this.initNum = initNum;
    this.onChange = onChange;
    this.step = step;
  }

  toNum(endNum) {
    const interval = this.animTime * this.step / Math.abs(this.initNum - endNum);
    const operation = this.initNum < endNum ? 1 : -1;
    let pointer = this.initNum;
    const handler = setInterval(() => {
      if (operation > 0 ? pointer > endNum : pointer < endNum) {
        clearInterval(handler);
      } else {
        this.onChange(pointer);
      }
      pointer = pointer + operation * this.step;
    }, interval);
  }
}

var numAnim = new AnimateToNum({
  animTime:10000, //每次数字变动持续的时间（ms），
  initNum:500, //初始化的数字
  step: 10,
  onChange:function(num){
    console.log(num);
  }
});
 
numAnim.toNum(1000); // 从500变化到100，用2000ms的时间，在onChange回调中会一直从500倒数到100
