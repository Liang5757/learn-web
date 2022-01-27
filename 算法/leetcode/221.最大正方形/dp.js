/**
 * @param {character[][]} matrix
 * @return {number}
 */
function maxSquare (matrix) {
  if (!matrix.length) return 0;
  const dp = new Array(matrix.length + 1).fill(0).map(() => new Array(matrix[0].length + 1).fill(0));
  let maxLen = 0;
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (matrix[i - 1][j - 1] === 1) {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
        maxLen = Math.max(dp[i][j], maxLen);
      }
    }
  }
  return maxLen * maxLen;
}

console.log(maxSquare(
  [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0]
  ]));
