/**
 * @param {number} num
 * @return {number[]}
 */

// 给你一个整数 num ，请你返回三个连续的整数，它们的 和 为 num 。
// 如果 num 无法被表示成三个连续整数的和，请你返回一个 空 数组。
var sumOfThree = function(num) {
  if (num % 3 === 0) {
    const mid = num / 3;
    return [mid - 1, mid, mid + 1];
  }
  return [];
};

console.log(0 % 3)
