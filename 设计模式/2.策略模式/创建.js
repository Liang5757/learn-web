// 将算法的实现与算法的使用分离，strategies是一个策略类
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

// 需要调用计算类，只需要提供名字，解决了if else的问题
let calculateBonus = function (level, salary) {
  return strategies[level](salary);
}

console.log(calculateBonus('boss', 20000)) // 80000
console.log(calculateBonus('rookie', 10000)) // 30000

// 利用函数传递实现
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
