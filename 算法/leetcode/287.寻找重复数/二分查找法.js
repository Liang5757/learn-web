/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let l = 1, r = nums.length - 1;
  let ans = -1;
  while (l <= r) {
    let temp = 0;
    let mid = Math.floor(r - 1 / 2 * (r - l));
    for (let i = 0; i < nums.length; i++) {
      temp += nums[i] <= mid;
    }
    if (temp <= mid) {
      l = mid + 1;
    } else if (temp > mid) {
      r = mid - 1;
      ans = mid;
    }
  }

  return ans;
};


console.log(findDuplicate([1, 3, 4, 2, 2]));
