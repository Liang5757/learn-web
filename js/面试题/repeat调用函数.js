// ��Ҫʵ�ֵĺ���
function repeat (func, times, wait) {
  let i = 0;
  return function (content) {
    let count = 0;
    let interval = setInterval(function () {
      count += 1;
      func(content);
      if (count === times) {
        clearInterval(interval);
      }
    }, wait);
  }
}

// ʹ�����������������
const repeatFunc = repeat(console.log, 4, 20)

repeatFunc("hello world") //����� 4 �� hello world��ÿ�μ�� 3 ��
