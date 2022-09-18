// 在背包问题之上，可以拿任意多件物品

type Item = [number, number][];

// 从前i个物品挑选总重量不超过j的总价值的最大值
// 递推式：dp[i + 1][j] = max(dp[i][j - k * w[i]] + k * v[i], dp[i + 1][j]); (k 为拿当前物品的个数
function fullPack(item: Item, weight: number) {
  let dp: number[][] = [];
  for (let i = 0; i < item.length + 1; i++) {
    dp[i] = new Array(weight + 1).fill(0);
  }

  for (let i = 0; i < item.length; i++) {
    for (let j = 0; j <= weight; j++) {
      for (let k = 0; k * item[i][0] <= j; k++) {
        dp[i + 1][j] = Math.max(dp[i][j - k * item[i][0]] + k * item[i][1], dp[i + 1][j]);
      }
    }
  }

  return dp[item.length][weight];
}

console.log(fullPack([[3, 4], [4, 5], [2, 3]], 7));

// 利用化简递推式，去除k循环：dp[i + 1][j] = max(dp[i][j], dp[i + 1][j - w[i]] + v[i])
function fullPackSimple(item: Item, weight: number) {
  let dp: number[][] = [];
  for (let i = 0; i < item.length + 1; i++) {
    dp[i] = new Array(weight + 1).fill(0);
  }

  for (let i = 0; i < item.length; i++) {
    for (let j = 0; j <= weight; j++) {
      if (j < item[i][0]) {
        dp[i + 1][j] = dp[i][j];
      } else {
        dp[i + 1][j] = Math.max(dp[i][j], dp[i + 1][j - item[i][0]] + item[i][1]);
      }
    }
  }

  return dp[item.length][weight];
}

console.log(fullPackSimple([[3, 4], [4, 5], [2, 3]], 7));

// 重复利用数组，优化空间
function fullPack2(item: Item, weight: number) {
  let dp: number[] = new Array(weight + 1).fill(0);

  for (let i = 0; i < item.length; i++) {
    for (let j = item[i][0]; j <= weight; j++) {
      dp[j] = Math.max(dp[j], dp[j - item[i][0]] + item[i][1]);
    }
  }

  return dp[weight];
}

console.log(fullPack2([[3, 4], [4, 5], [2, 3]], 7));


// 由于只利用了dp[i] 和 dp[i + 1]，可以利用滚动数组来优化空间
function packDpParity(item: Item, weight: number) {
  let dp: number[][] = [];
  for (let i = 0; i < 2; i++) {
    dp[i] = new Array(weight + 1).fill(0);
  }

  for (let i = 0; i < item.length; i++) {
    for (let j = 0; j <= weight; j++) {
      if (j < item[i][0]) {
        dp[(i + 1) & 1][j] = dp[i & 1][j];
      } else {
        dp[(i + 1) & 1][j] = Math.max(dp[i & 1][j], dp[(i + 1) & 1][j - item[i][0]] + item[i][1]);
      }
    }
  }

  return dp[0][weight];
}

console.log(packDpParity([[2, 3], [1, 2], [3, 4], [2, 2]], 5));
