function sqrt (x: number) {
  let num = 1;
  while (Math.abs(x - num * num) > 0.00001) {
    num = (num + x / num) * 0.5;
  }
  
  return num;
}

console.log(sqrt(2));
