/**
 * @param {number} num
 * @return {number[]}
 */

// ����һ������ num �����㷵���������������������ǵ� �� Ϊ num ��
// ��� num �޷�����ʾ���������������ĺͣ����㷵��һ�� �� ���顣
var sumOfThree = function(num) {
  if (num % 3 === 0) {
    const mid = num / 3;
    return [mid - 1, mid, mid + 1];
  }
  return [];
};

console.log(0 % 3)
