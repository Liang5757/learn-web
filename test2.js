function searchWord(s, t) {
    const sLen = s.length, tLen = t.length;
    const dp = new Array(tLen).fill(0);
    for (let i = 0; i <= sLen; i++) {
        let pre = 1;
        for (let j = 0; j <= tLen; j++) {
            let temp = dp[j + 1];
            if (s[i] === t[j]) {
                dp[j + 1] += pre;
            }
            pre = temp;
        }
    }
    return dp[tLen - 1];
}
const s = "rabbbit", t = "rabbit";
console.log(searchWord(s, t));
