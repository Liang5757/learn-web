function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
// Ê÷Éú³É´úÂë
function generate_tree(arr) {
  let root = null;
  if (arr.length === 0) return root;
  let que = [], fill_left = true;
  for (let val of arr) {
    let node = val ? new TreeNode(val): null;
    if (que.length === 0) {
      root = node;
      que.push(node);
    } else if (fill_left) {
      que[0].left = node;
      fill_left = false;
      if (node) que.push(node);
    } else {
      que[0].right = node;
      if (node) que.push(node);
      que.shift();
      fill_left = true;
    }
  }
  return root;
}

generate_tree([1,2,2,null,3,null,3]);
