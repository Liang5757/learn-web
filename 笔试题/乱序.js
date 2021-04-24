function sort (arr) {
  function getRandom (min, max) {
    let t = Math.random();
    t = Math.ceil(t * (max - min)) + min;
    return t;
  }
  
  for (let i = 0; i < arr.length; i++) {
    const t = getRandom(i, arr.length - 1);
    
    let temp = arr[i];
    arr[i] = arr[t];
    arr[t] = temp;
  }
  
  return arr
}

let arr = [1, 3, 5, 22, 231];
sort(arr);
console.log(arr);
