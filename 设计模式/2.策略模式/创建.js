// ���㷨��ʵ�����㷨��ʹ�÷��룬strategies��һ��������
let strategies = {
  "boss": function (salary) {
    return salary * 4;
  },
  "rookie": function (salary) {
    return salary * 3;
  },
  "liang": function (salary) {
    return salary * 2;
  }
}

// ��Ҫ���ü����ֻ࣬��Ҫ�ṩ���֣������if else������
let calculateBonus = function (level, salary) {
  return strategies[level](salary);
}

console.log(calculateBonus('boss', 20000)) // 80000
console.log(calculateBonus('rookie', 10000)) // 30000

// ���ú�������ʵ��
function boss(salary) {
  return salary * 4;
}
function rookie(salary) {
  return salary * 3;
}
function liang (salary) {
  return salary * 2;
}

let calculateBonus2 = function (func, salary) {
  return func(salary);
}

console.log(calculateBonus2(rookie, 10000))
