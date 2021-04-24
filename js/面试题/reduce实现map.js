Array.prototype.myMap = function (cb) {
  let arr = []
  this.reduce((total, cur, index) => {
    arr.push(cb(cur, index, this));
  })
  return arr;
}

let a = [1, 2, 3];
let b = a.myMap((item, index, arr) => {
  console.log(item, index, arr);
  return item * 2;
})

console.log(b)
