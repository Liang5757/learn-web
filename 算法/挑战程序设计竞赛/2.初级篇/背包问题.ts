// n个重量为w，价值为v的物品，挑出其中总重量不超过W的物品，求最大价值

type Item = [number, number][];

function pack(item: Item, weight: number): number {
  function innerFunc(i: number, j: number): number {
    let res: number;

    if (i === item.length) {       // 没有剩余物品了
      res = 0;
    } else if (item[i][0] > j) {   // 无法挑选该物品
      res = innerFunc(i + 1, j);
    } else {                       // 选或不选，求最大值
      res = Math.max(innerFunc(i + 1, j), innerFunc(i + 1, j - item[i][0]) + item[i][1]);
    }

    return res;
  }

  return innerFunc(0, weight);
}

console.log(pack([[2, 3], [1, 2], [3, 4], [2, 2]], 5));

// 记忆化搜索
function packMemset(item: Item, weight: number): number {
  let dp: [number, number][] = [];
  for (let i = 0; i < item.length + 1; i++) {
    dp[i] = [0, 0];
  }

  function innerFunc(i: number, j: number): number {
    if (dp[i][j]) {
      return dp[i][j];
    }

    let res: number;

    if (i === item.length) {       // 没有剩余物品了
      res = 0;
    } else if (item[i][0] > j) {   // 无法挑选该物品
      res = innerFunc(i + 1, j);
    } else {                       // 选或不选，求最大值
      res = Math.max(innerFunc(i + 1, j), innerFunc(i + 1, j - item[i][0]) + item[i][1]);
    }

    return dp[i][j] = res;
  }

  return innerFunc(0, weight);
}

console.log(packMemset([[2, 3], [1, 2], [3, 4], [2, 2]], 5));

// dp写法
function packDp(item: Item, weight: number) {
  let dp: number[][] = [];
  for (let i = 0; i < item.length + 1; i++) {
    dp[i] = new Array(weight + 1).fill(0);
  }

  for (let i = item.length - 1; i >= 0; i--) {
    for (let j = 0; j <= weight; j++) {
      if (j < item[i][0]) {
        dp[i][j] = dp[i + 1][j];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j - item[i][0]] + item[i][1]);
      }
    }
  }

  return dp[0][weight];
}

console.log(packDp([[2, 3], [1, 2], [3, 4], [2, 2]], 5));

// 重复利用数组优化dp
function packDp2(item: Item, weight: number) {
  let dp: number[] = new Array(weight + 1).fill(0);

  for (let i = 0; i < item.length; i++) {
    for (let j = weight; j >= item[i][0]; j--) {
      dp[j] = Math.max(dp[j], dp[j - item[i][0]] + item[i][1]);
    }
  }

  return dp[weight];
}

console.log(packDp2([[2, 3], [1, 2], [3, 4], [2, 2]], 5));
