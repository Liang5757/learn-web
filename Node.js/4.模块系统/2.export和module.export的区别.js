// node.jsΪ�˼򻯲�������var exports = module.exports
// ����һ�£��Ǿ�˵�����ҿ���ʹ������һ���������ڲ���Ա
console.log(exports === module.exports) // true

// �����Ķ�������ڴ�����ʽ��exports�൱��module.exports������
// var module = {
//   exports: {
//     foo: 'bar',
//     add: function
//   }
// }

// ����ֱ�Ӹ� exports ��ֵ���ȼ��ڸ��������ã���Ӱ�쵼��������
exports.a = 123
exports = {}    // ������ָ�룬��a�Ա�����
exports.foo = 'bar' // δ������

module.exports.b = 456 // ������

// ���ﵼ�� exports !== module.exports
module.exports = {
  foo: 'bar'
}

// ���������������½������ߵ����ù�ϵ
exports = module.exports

// ���� return ���� module.exports
// ���������� exports �еĳ�Ա��ʲô��û��
exports = { // δ������
  a: 456
}

// ��Ϊ���return����module.exports
// ���յõ����� Function
module.exports = function () {
  console.log('hello')
}

// ����ȥʹ�õ�ʱ��
//    ���������Ա��exports.xxx = xxx
//    ���������ԱҲ���ԣ�module.exports = {
//                        }
//    ����������Ա��module.exports
