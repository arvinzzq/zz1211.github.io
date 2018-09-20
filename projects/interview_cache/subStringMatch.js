// 实现一个函数，可以判断 a 字符串是否被包含在 b 字符串中
const b = 'abcabcdef';
const a = 'cde';

// // 非kmp解法，最基本的解法，时间复杂度 -> O(mn)，空间复杂度 -> O(m+n)。
// function strMatch(baseStr, targetStr) {
//   const baseStrArr = baseStr.split('');
//   const targetStrArr = targetStr.split('');
//   const baseLen = baseStrArr.length;
//   const targetLen = targetStrArr.length;
  
//   for (let i = 0; i < baseLen; i++) {
//     for (let j = 0; j < targetLen; j++) {
//       if (baseStrArr[i + j] !== targetStrArr[j]) {
//         break;
//       } else if (j === targetLen - 1) {
//         console.log('match index => ', i);
//         return true;
//       }
//     }
//   }
//   return false;
// }

// console.log('matched result -> ', strMatch(b, a));

// kmp解法 时间复杂度 -> O(n+m)
function getPartialMatchTable(str) {
  let result = [0];
  let len = str.length;
  if (len === 1) {
    return result;
  }
  for (let i = 1; i < len; i++) {
    let curStr = str.substring(0, i + 1);
    let curLen = curStr.length;
    for (let j = curLen; j > 1; j--) {
      let head = curStr.slice(0, j - 1);
      let tail = curStr.slice(-j + 1);
      if (head === tail) {
        result[i] = head.length;
        break;
      }
    }
    if (!result[i]) {
      result[i] = 0;
    }
  }
  return result;
}

function KMP(target, source) {
  const targetLen = target.length;
  const sourceLen = source.length;
  let i;
  let j;

  var partialMatchTable = getPartialMatchTable(target);
  var result = false;
  for (i = 0; i < sourceLen; i++) {
    for (j = 0; j < targetLen; j++) {
      if (target.charAt(j) != source.charAt(i + j)) {
        if (j > 0 && partialMatchTable[j - 1] > 0) {
          i += j - partialMatchTable[j - 1] - 1;
        }
        break;
      }
    }
    if (j == targetLen) {
      console.log('index => ', i);
      result = true;
      break;
    }
  }
  return result;
}

console.log('res -> kmp -> ', KMP(a, b));

// https://www.zhihu.com/question/21923021

// hash table 解法 时间复杂度可以达到 -> O(n)

// function hashTableMatch(baseStr, targetStr) {
//   const hashTable = {};
//   const targetLen = targetStr.length;
//   const baseLen = baseStr.length;
//   for (let i = 0; i <= baseLen - targetLen; i++) {
//     hashTable[baseStr.slice(i, i + targetLen)] = i;
//   }
//   return typeof hashTable[targetStr] !== 'undefined';
// }

// console.log('res -> ', hashTableMatch(b, a));