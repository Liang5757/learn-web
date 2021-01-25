Function.prototype.before = function (beforeFunc) {
  let that = this;
  return function () { // ���ذ�����ԭ�������º����Ĵ�����
    beforeFunc.apply(this, arguments); // 1. ִ��beforeFunc
    return that.apply(this, arguments); // 2. ִ��ԭ����
  }
}

Function.prototype.after = function (afterFunc) {
  let that = this;
  return function () {
    let ret = that.apply(this, arguments);
    afterFunc.apply(this, arguments); // 3. ִ��afterFunc
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
