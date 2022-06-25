// n个数值和为k

function sumN (arr: Array<number>, k: number) {
  function dfs (i: number, sum: number): boolean {
    if (i === arr.length) {
      return sum === k;
    }
    
    return dfs(i + 1, sum) || dfs(i + 1, sum + arr[i]);
  }
  
  return dfs(0, 0);
}

console.log(sumN([1, 2, 4, 7], 13));
console.log(sumN([1, 2, 4, 14], 13));
