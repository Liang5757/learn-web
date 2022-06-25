// n只蚂蚁以1cm的速度在长Lcm的竿子上爬行，两只蚂蚁相遇时，只能各自反向爬回去，各蚂蚁方向未知，只知道其对应距离竿子左侧的距离x，计算所有蚂蚁落下竿子所需的最短时间和最长时间

function solve (L: number, arr: Array<number>) {
  let minTime = 0;
  let maxTime = 0;
  
  for (let i = 0; i < arr.length; i++) {
    minTime = Math.max(Math.min(L - arr[i], arr[i]), minTime);
    maxTime = Math.max(Math.max(L - arr[i], arr[i]), maxTime);
  }
  
  return [minTime, maxTime];
}

console.log(solve(10, [2, 6, 7])); // 4 8
