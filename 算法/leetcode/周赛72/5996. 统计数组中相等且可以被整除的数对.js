/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 给你一个下标从 0 开始长度为 n 的整数数组 nums 和一个整数 k ，请你返回满足 0 <= i < j < n ，
// nums[i] == nums[j] 且 (i * j) 能被 k 整除的数对 (i, j) 的 数目 。

var countPairs = function(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j] && (i * j) % k === 0) {
        ans++;
      }
    }
  }
  return ans;
};

console.log(countPairs([3,1,2,2,2,1,3], 2));
console.log(countPairs([1,2,3,4], 1));
