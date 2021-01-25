function myPow (x, n) {
  if (n === 0) return 1;
  let res = 1;
  if (n < 0) {
    [x, n] = [1/x, -n];
  }

  while (n) {
    if (n & 1) {
      res *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return res;
}
