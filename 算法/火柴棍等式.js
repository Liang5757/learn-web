// n为火柴棍的个数，输出这些火柴棍可以组成的等式

// 返回一个数所需的火柴棍数
function fun (x) {
  let num = 0;
  let f = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
  
  while (Math.floor(x / 10) !== 0) {
    num += f[x%10];
    x = Math.floor(x / 10);
  }
  num += f[x];
  return num;
}

function matchstickEquation(n) {
  for (let a = 0; a <= 1111; a++) {
    for (let b = 0; b <= 1111; b++) {
      let c = a + b;
      if (fun(a) + fun(b) + fun(c) === n - 4) {
        console.log(`${a}+${b}=${c}`);
      }
    }
  }
}

matchstickEquation(16)
