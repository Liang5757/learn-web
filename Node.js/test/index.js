const { fSetTimeout, forwardAll } = require('fast-forward-timer');

const timer1 = fSetTimeout(() => {
  console.log(777);
}, 3000);
timer1.forward(2000); // 快进两秒

const timer2 = fSetTimeout(() => {
  console.log(777);
}, 2000);

forwardAll(1000);
