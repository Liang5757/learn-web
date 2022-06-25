/**
 * @param {number} finalSum
 * @return {number[]}
 */
// ����һ������ finalSum �����㽫����ֳ����ɸ� ������ͬ ��ż����֮�ͣ��Ҳ�ֳ�����ż������Ŀ ��� ��
// �ȷ�˵������ finalSum = 12 ����ô��Щ����� ����Ҫ�� �ģ�������ͬ��ż�����Һ�Ϊ finalSum����(2 + 10) ��(2 + 4 + 6) �� (4 + 8) �������У�(2 + 4 + 6) ���������Ŀ��������ע�� finalSum ���ܲ�ֳ� (2 + 2 + 4 + 4) ����Ϊ��ֳ������������뻥����ͬ��
// ���㷵��һ���������飬��ʾ��������ֳ� ��� ��Ŀ��ż�������顣���û�а취�� finalSum ���в�֣����㷵��һ�� �� ���顣����԰� ���� ˳�򷵻���Щ������
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
