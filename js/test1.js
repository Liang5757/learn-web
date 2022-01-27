const length = 10;
const list = '1 1 2 2 2 3 3 3 3 1'.trim().split(" ").map((item) => +item);

let ans = 0;
let b = new Array(31).fill(0);

for (let i = 0; i < list.length; i++) {
  b[list[i]]++;
  for (let j = 1; j < list[i]; j++) {
    if (b[j]) {
      ans++;
    }
  }
}

console.log(ans);
