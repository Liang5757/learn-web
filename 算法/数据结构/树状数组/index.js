class Bit {
  constructor (n) {
    this.len = n + 1; // 舍弃0号位
    this.c = new Array(n + 1).fill(0);
  }
  
  static lowbit (x) {
    return x & -x;
  }
  
  add (index, value) {
    for (let i = index + 1; i <= this.len; i += Bit.lowbit(i)) {
      this.c[i] += value;
    }
  }
  
  query (index) {
    let ans = 0;
    for (let i = index + 1; i > 0; i -= Bit.lowbit(i)) {
      ans += this.c[i];
    }
    return ans;
  }
}

// const len = 12;
// let test = new Bit(len);
// let tempArr = []; // 存放前缀和数组，方便测试
// for (let i = 1; i < len; i++) {
//   const num = Math.floor(Math.random() * i);
//   tempArr[i] = num + tempArr[i - 1] || 0;
//   test.add(i, num);
// }
//
// for (let i = 1; i < len; i++) {
//   console.log(test.query(i) === tempArr[i]); // 获取区间和看是否相等
// }

const reversePairs = function(nums) {
  let len = nums.length;
  if (len < 2) return 0;
  
  let ans = 0;
  const bit = new Bit(Math.max(...nums));
  for (let i = len - 1; i >= 0; i--) {
    ans += bit.query(nums[i] - 1);
    bit.add(nums[i], 1);
  }
  
  return ans;
};

console.log(reversePairs([7,5,6,4]) === 5);
