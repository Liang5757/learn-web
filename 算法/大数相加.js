function addArray (a, b) {
  if (a.length < b.length) {
    return null;
  }
  const size = a.length;
  let t = 0;// 进位
  for (let i = 0; i < size; i++) {
    let k = a[size - i - 1] + b[size - i - 1];
    k += t;// 加进位
    if (k >= 10) {
      t = 1;
    } else {
      t = 0;
    }
    k %= 10;
    a[size - i - 1] = k;
  }
  console.log(a);
  return a;
}

/**
 * 大数相加
 * @param a
 * @param b
 * @return
 */
function bigAdd (a, b) {
  let af = true;
  let bf = true;
  if (a.charAt(0) === "-") {
    af = false;
    a = a.slice(1);
  }
  if (b.charAt(0) === "-") {
    bf = false;
    b = b.slice(1);
  }
  const maxsize = Math.max(a.length, b.length) + 1;
  const m = new Array(maxsize).fill(0);
  const n = new Array(maxsize).fill(0);
  m[0] = af ? 0 : 9;
  n[0] = bf ? 0 : 9;
  for (let i = 0; i < a.length; i++) {
    m[maxsize - a.length + i] = Number.parseInt(a[i]);
  }
  for (let i = 0; i < b.length; i++) {
    n[maxsize - b.length + i] = Number.parseInt(b[i]);
  }
  const result = addArray(buma(m), buma(n));
  return letToString(buma(result));
}

/**
 * 标准输出
 * @param a
 * @return
 */
function letToString (a) {
  let s = "";
  if (a[0] === 9) {
    s += "-";
  }
  let tag = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] === 0) {
      tag++;
    } else {
      break;
    }
  }
  for (let j = tag + 1; j < a.length; j++) {
    s += a[j];
  }
  if (s.length === 0) {
    return "0";
  }
  return s.toString();
}

/**
 * 10进制求补码
 * @param a
 * @return
 */
function buma (a) {
  if (a[0] === 9) {
    for (let i = 1; i < a.length; i++) {
      a[i] = 9 - a[i];
    }
    const tmp = new Array(a.length).fill(0);
    tmp[a.length - 1] = 1;
    // console.log(addArray(a, [1]))
    return addArray(a, tmp);
  }
  return a;
}

// 用字符串表示大数
const str1 = "-800000000000000000000000000000009";
const str2 = "-0091";
console.log(bigAdd(str1, str2));
