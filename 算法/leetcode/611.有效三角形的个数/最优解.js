//����һ�������Ǹ����������飬���������ͳ�����п�����������������ߵ���Ԫ�������
//
// ʾ�� 1:
//
//
//����: [2,2,3,4]
//���: 3
//����:
//��Ч�������:
//2,3,4 (ʹ�õ�һ�� 2)
//2,3,4 (ʹ�õڶ��� 2)
//2,2,3
//
//
// ע��:
//
//
// ���鳤�Ȳ�����1000��
// �����������ķ�ΧΪ [0, 1000]��
//
// Related Topics ̰�� ���� ˫ָ�� ���ֲ��� ����
// ? 278 ? 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  let ans = 0;
  const n = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    let k = i + 2;
    for (let j = i + 1; j < n; j++) {
      while (k < n && nums[k] < nums[i] + nums[j]) {
        k++;
      }
      ans += Math.max(k - j - 1, 0);
    }
  }
  
  return ans;
};

//leetcode submit region end(Prohibit modification and deletion)
