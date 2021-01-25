Function.prototype.before = function (beforeFunc) {
  let that = this;
  return function () { // 返回包含了原函数和新函数的代理函数
    beforeFunc.apply(this, arguments); // 1. 执行beforeFunc
    return that.apply(this, arguments); // 2. 执行原函数
  }
}

Function.prototype.after = function (afterFunc) {
  let that = this;
  return function () {
    let ret = that.apply(this, arguments);
    afterFunc.apply(this, arguments); // 3. 执行afterFunc
    return ret;
  }
}

let func = function () {
  console.log(2);
}

func = func.before(function () {
  console.log(1);
}).after(function () {
  console.log(3);
});

func();
