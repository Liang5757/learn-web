const xS = 6;
const yS = 6;
let k = 3;
let h = 0;
let sche = [[4, 4, 2], [3, 3, 2], [2, 4, 1]];
let ans = 0;

const grass = new Array(yS);
for (let i = 0; i < yS; i++) {
  grass[i] = new Array(xS).fill(1);
}

for (h = 0; h < k; h++) {
  for (let i = 0; i < yS; i++) {
    for (let j = 0; j < xS; j++) {
      const [x, y, r] = sche[h];
      if ((i - x + 1) ** 2 + (j - y + 1) ** 2 <= r ** 2) {
        if (h !== k - 1) {
          grass[i][j] = 1;
        } else {
          grass[i][j] = 0;
        }
      } else if (h !== k - 1){
        grass[i][j]++;
      }
    }
  }
}

for (let i = 0; i < yS; i++) {
  for (let j = 0; j < xS; j++) {
    ans += grass[i][j];
  }
}
console.log(ans);
