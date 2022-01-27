/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  let dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    const c = s[i];
    dp[i][i] = 1;
    for (let j = i - 1; j >= 0; j--) {
      if (c === s[j]) {
        dp[i][j] = dp[i - 1][j + 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j + 1]);
      }
    }
  }
  
  return dp[n - 1][0];
};

console.log(longestPalindromeSubseq('bbbab'));
