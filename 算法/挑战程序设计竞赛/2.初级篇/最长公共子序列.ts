// 求两个字符串最长的公共子序列，s = 'abcd', t = 'becd'， 输出3('bcd)

function LCS(s: string, t: string) {
  let dp = new Array(s.length + 1);
  for (let i = 0; i < s.length + 1; i++) {
    dp[i] = new Array(t.length + 1).fill(0);
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < t.length; j++) {
      if (s[i] === t[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  return dp[s.length][t.length];
}

console.log(LCS('abcd', 'becd'));
