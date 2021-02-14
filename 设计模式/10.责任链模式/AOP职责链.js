let order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500 元定金预购，得到 100 优惠券");
  } else {
    return "nextSuccessor"; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

let order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200 元定金预购，得到 50 优惠券");
  } else {
    return "nextSuccessor"; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

let orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买，无优惠券");
  } else {
    console.log("手机库存不足");
  }
};

Function.prototype.after = function (fn) {
  let self = this;
  return function () {
    let ret = self.apply(this, arguments);
    if (ret === "nextSuccessor") {
      return fn.apply(this, arguments);
    }
    return ret;
  };
};

let order = order500.after(order200).after(orderNormal);
order(1, true, 500);    // 输出:500 元定金预购，得到 100 优惠券
order(2, true, 500);    // 输出:200 元定金预购，得到 50 优惠券
order(1, false, 500);   // 输出:普通购买，无优惠券
