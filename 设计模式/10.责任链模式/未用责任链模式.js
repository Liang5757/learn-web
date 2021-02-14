let order = function (orderType, pay, stock) {
  if (orderType === 1) { // 500 元定金购买模式
    if (pay === true) { // 已支付定金
      console.log("500 元定金预购, 得到 100 优惠券");
    } else { // 未支付定金，降级到普通购买模式
      if (stock > 0) { // 用于普通购买的手机还有库存
        console.log("普通购买, 无优惠券");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 2) {
    if (pay === true) { // 200 元定金购买模式
      console.log("200 元定金预购, 得到 50 优惠券");
    } else {
      if (stock > 0) {
        console.log("普通购买, 无优惠券");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 3) {
    if (stock > 0) {
      console.log("普通购买, 无优惠券");
    } else {
      console.log("手机库存不足");
    }
  }
};
order(1, true, 500); // 输出: 500 元定金预购, 得到 100 优惠券
