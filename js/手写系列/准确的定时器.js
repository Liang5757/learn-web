// 模拟执行大量代码
setInterval(() => {
  let i = 0;
  while (i++ < 100000000) {
  }
}, 0);

// 倒计时
function countDown (fn, time) {
  let startTime = new Date().getTime(), count = 0, second = 1000;
  let timeCounter = null;

  return function interFunc () {
    let offset = new Date().getTime() - (startTime + count * second);
    let nextTime = second - offset;
    if (nextTime < 0) {
      nextTime = 0
    }
    console.log("误差：" + offset + "ms，下一次执行：" + nextTime + "ms后，离活动开始还有：" + time + "ms");
    time -= second;
    count++;
    if (time < 0) {
      clearTimeout(timeCounter);
    } else {
      timeCounter = setTimeout(() => {
        fn.apply(this, arguments);
        interFunc();
      }, nextTime);
    }
  }
}

countDown(function () {}, 10000)();

// function countDown (fn, time) {
//   let startTime = new Date().getTime(), count = 0, second = 1000;
//   let timeCounter = null;
//
//   return function interFunc () {
//     let offset = new Date().getTime() - (startTime + count * second);
//     console.log("误差：" + offset + "ms，下一次执行：" + 1000 + "ms后，离活动开始还有：" + time + "ms");
//     time -= second;
//     count++;
//     if (time < 0) {
//       clearTimeout(timeCounter);
//     } else {
//       timeCounter = setTimeout(() => {
//         fn.apply(this, arguments);
//         interFunc();
//       }, 1000);
//     }
//   }
// }
//
// countDown(function () {
//
// }, 10000)();
