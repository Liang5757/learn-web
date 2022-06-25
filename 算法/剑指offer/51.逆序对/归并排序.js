/**
 * @param {number[]} nums
 * @return {number}
 */

// �ںϲ�������������ʱ���Ҳ���������С����ô˵��������Ϊ���ʣ���
var reversePairs = function (nums) {
  const len = nums.length;
  
  if (len < 2) return 0;
  
  let copy = [];
  for (let i = 0; i < len; i++) {
    copy[i] = nums[i];
  }
  
  let temp = []; // ����ÿ�ι鲢����Ҫ����temp����
  return mergeAndCount(copy, 0, len - 1, temp);
};

function mergeAndCount (nums, left, right, temp) {
  if (left === right) return 0;
  
  const mid = Math.floor(left + (right - left) / 2);
  const leftCount = mergeAndCount(nums, left, mid, temp);
  const rightCount = mergeAndCount(nums, mid + 1, right, temp);
  
  if (nums[mid] <= nums[mid + 1]) {  // �Ż��㷨
    return leftCount + rightCount;
  }
  
  const crossCount = sortAndCount(nums, left, mid, right, temp);
  return leftCount + rightCount + crossCount;
}

function sortAndCount (nums, left, mid, right, temp) {
  let count = 0;
  for (let k = left; k <= right; k++) {
    temp[k] = nums[k];
  }
  
  let i = left;
  let j = mid + 1;
  
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      nums[k] = temp[j];
      j++;
    } else if (j > right) {
      nums[k] = temp[i];
      i++;
    } else if (temp[i] <= temp[j]) {
      nums[k] = temp[i];
      i++;
    } else {
      nums[k] = temp[j];
      j++;
      count += mid - i + 1; // �͹鲢����������ֻ������
    }
  }
  
  return count;
}

console.log(reversePairs([7, 5, 6, 4]));
