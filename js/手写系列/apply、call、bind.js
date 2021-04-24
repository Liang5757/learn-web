Function.prototype.bind = function () {
  let context = Array.prototype.shift.call(arguments, 1);
  let fn = this;
  let argument = [];
  argument.push(...arguments)
  return function (...args) {
    return fn.apply(context, argument.concat(args));
  }
}

function sum (...args) {
  return args.reduce((total, cur) => total + cur, 0)
}

let obj = {};
let a = sum.bind(obj, 1);
console.log(a(2, 3));
