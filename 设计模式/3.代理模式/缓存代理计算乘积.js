let mult = function () {
  let a = 1;
  for (let i = 0; i < arguments.length; i++) {
    a *= arguments[i];
  }
  return a;
}

let proxyMult = (function () {
  let cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = mult.apply(this, arguments);
  }
})();

proxyMult(1, 2, 3) // 6
proxyMult(1, 2, 3) // 不会重复计算
