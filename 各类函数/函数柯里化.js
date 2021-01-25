function add (a, b) {
    return a + b;
}

// javascript���Ծ����еĿ��ﻯ������ֻ��ƴ��һ�β���
Function.prototype["curry"] = function () {
    let slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;

    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    }
};

let add1 = add.curry(1);    // ���ص�һ������Ϊ1��add����
console.log(add1(2));       // 3

// ���Զ�ε��ã��ݹ�ʵ�ֵĿ��ﻯ����
// ֧�ֶ��������
function progressCurrying(fn, args) {

    const that = this;
    const len = fn.length;
    args = args || [];

    return function() {
        const _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);

        // �����������С�������fn.length����ݹ���ã������ռ�����
        if (args.length < len) {
            return progressCurrying.call(that, fn, args);
        }

        // �����ռ���ϣ���ִ��fn
        return fn.apply(this, args);
    }
}

let add2 = progressCurrying(add, [1]);

console.log(add2(3));       // 4