/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function (n) {
  let ans = 0, digit = 1;
  
  while (n > digit) {
    ans += Math.floor(n / (digit * 10)) * digit + Math.min(Math.max(n % (digit * 10) - digit + 1, 0), digit);
    digit *= 10;
  }
  
  return ans;
};

console.log(countDigitOne(13));
