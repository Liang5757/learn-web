/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// ����һ���±�� 0 ��ʼ����Ϊ n ���������� nums ��һ������ k �����㷵������ 0 <= i < j < n ��
// nums[i] == nums[j] �� (i * j) �ܱ� k ���������� (i, j) �� ��Ŀ ��

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
