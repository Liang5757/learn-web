/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  let ans = 0;
  
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (isTriangle(nums[i], nums[j], nums[k])) {
          ans++;
        }
      }
    }
  }
  
  return ans;
};

function isTriangle (a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}
