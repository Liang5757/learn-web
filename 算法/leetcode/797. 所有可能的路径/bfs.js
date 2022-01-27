// https://leetcode-cn.com/problems/all-paths-from-source-to-target/

var allPathsSourceTarget = function(graph) {
  let ans = []
  let stack = [[0]];
  let i = 0, n = graph.length;
  
  while (i < n) {
    let temp = stack.length;
    
    for (let k = 0; k < temp; k++) {
      let top = stack.shift();
      let target = graph[top[i]];
      for (let j = 0; j < target.length; j++) {
        if (target[j] === n - 1) {
          ans.push([...top, target[j]]);
        } else {
          stack.push([...top, target[j]]);
        }
      }
    }
    i++;
  }
  
  return ans;
};
