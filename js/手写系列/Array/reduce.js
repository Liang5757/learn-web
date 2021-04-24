Array.prototype.reduce = function (fn, prev) {
  for (let i = 0; i < this.length; i++) {
    if (!prev) {
      prev = fn(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = fn(prev, this[i], i, this);
    }
  }
  return prev;
}

let arr = [1, 2, 3, 4]
arr.reduce((total, currentValue, currentIndex, arr) => {
  console.log(total, currentValue, currentIndex, arr)
  return total + currentValue
}, 10)
