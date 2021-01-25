var myPow = function (x, n) {
  if (n === 0) return 0;
  x= n < 0 ? 1/x : x;
  let base = 1;
  n = Math.abs(n);

  while (n > 0) {
    if (n & 1) {
      base *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return base;
};

console.log(myPow(2.10000, 3))
