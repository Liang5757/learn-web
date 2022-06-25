/**
 * @param {number} finalSum
 * @return {number[]}
 */
// 给你一个整数 finalSum 。请你将它拆分成若干个 互不相同 的偶整数之和，且拆分出来的偶整数数目 最多 。
// 比方说，给你 finalSum = 12 ，那么这些拆分是 符合要求 的（互不相同的偶整数且和为 finalSum）：(2 + 10) ，(2 + 4 + 6) 和 (4 + 8) 。它们中，(2 + 4 + 6) 包含最多数目的整数。注意 finalSum 不能拆分成 (2 + 2 + 4 + 4) ，因为拆分出来的整数必须互不相同。
// 请你返回一个整数数组，表示将整数拆分成 最多 数目的偶整数数组。如果没有办法将 finalSum 进行拆分，请你返回一个 空 数组。你可以按 任意 顺序返回这些整数。
const { isEqual } = require('lodash');

var maximumEvenSplit = function (finalSum) {
  if (finalSum % 2 === 1) return [];
  let arr = [];
  for (let i = 2; i <= finalSum; i += 2) {
    arr.push(i);
    finalSum -= i;
  }
  
  arr[arr.length - 1] += finalSum;
  
  return arr;
};

console.log(isEqual(maximumEvenSplit(12),[2, 4, 6]));
console.log(isEqual(maximumEvenSplit(7), []));
console.log(isEqual(maximumEvenSplit(28), [2, 4, 6, 16]));
