// 需要实现的函数
function repeat (func, times, wait) {
  let i = 0;
  return function (content) {
    let count = 0;
    let interval = setInterval(function () {
      count += 1;
      func(content);
      if (count === times) {
        clearInterval(interval);
      }
    }, wait);
  }
}

// 使下面代码能正常工作
const repeatFunc = repeat(console.log, 4, 20)

repeatFunc("hello world") //会输出 4 次 hello world，每次间隔 3 秒
