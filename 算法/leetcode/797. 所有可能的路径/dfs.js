// https://leetcode-cn.com/problems/all-paths-from-source-to-target/

var allPathsSourceTarget = function(graph) {
  let ans = []
  let stack = [0];
  let i = 0, n = graph.length;
  
  function dfs(i) {
    if (stack[stack.length - 1] === n - 1) {
      ans.push(stack.slice());
      return
    }
    
    for (let j = 0; j < graph[i].length; j++) {
      stack.push(graph[i][j]);
      dfs(stack[stack.length - 1]);
      stack.pop();
    }
  }
  
  dfs(i)
  return ans;
};
