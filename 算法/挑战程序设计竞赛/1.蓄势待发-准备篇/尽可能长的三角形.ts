// ������������ѡ���ܳ���������Σ��������ܳ�

function maxPerimeterTriangle (arr: Array<number>) {
  arr.sort((a, b) => a - b);
  
  for (let i = arr.length - 1; i > 1; i--) {
    if (arr[i] < arr[i - 1] + arr[i - 2]) {
      return arr[i] + arr[i - 1] + arr[i - 2];
    }
  }
  
  return 0; // �޷����������
}

console.log(maxPerimeterTriangle([2, 3, 4, 5, 10]) === 12);
console.log(maxPerimeterTriangle([4, 5, 10, 20]) === 0);
