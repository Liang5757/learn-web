var tree2str = function(root) {
    let ans = '';
    const st = [root];
    const vis = new Set();
    while (st.length) {
        const node = st[st.length - 1];
        if (vis.has(node)) {
            if (node !== root) {
                ans += ')';
            }
            st.pop();
        } else {
            vis.add(node);
            if (node !== root) {
                ans += '(';
            }
            ans += '' + node.val;
            if (!node.left && node.right) {
                ans += '()';
            }
            if (node.right) {
                st.push(node.right);
            }
            if (node.left) {
                st.push(node.left);
            }
        }
    }
    return ans;
};