// nֻ������1cm���ٶ��ڳ�Lcm�ĸ��������У���ֻ��������ʱ��ֻ�ܸ��Է�������ȥ�������Ϸ���δ֪��ֻ֪�����Ӧ����������ľ���x�����������������¸�����������ʱ����ʱ��

function solve (L: number, arr: Array<number>) {
  let minTime = 0;
  let maxTime = 0;
  
  for (let i = 0; i < arr.length; i++) {
    minTime = Math.max(Math.min(L - arr[i], arr[i]), minTime);
    maxTime = Math.max(Math.max(L - arr[i], arr[i]), maxTime);
  }
  
  return [minTime, maxTime];
}

console.log(solve(10, [2, 6, 7])); // 4 8
