function add (a, b) {
    return a + b;
}

// javascript语言精粹中的柯里化函数，只能拼接一次参数
Function.prototype["curry"] = function () {
    let slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;

    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    }
};

let add1 = add.curry(1);    // 返回第一个参数为1的add函数
console.log(add1(2));       // 3

// 可以多次调用，递归实现的柯里化函数
// 支持多参数传递
function progressCurrying(fn, args) {

    const that = this;
    const len = fn.length;
    args = args || [];

    return function() {
        const _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);

        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (args.length < len) {
            return progressCurrying.call(that, fn, args);
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, args);
    }
}

let add2 = progressCurrying(add, [1]);

console.log(add2(3));       // 4