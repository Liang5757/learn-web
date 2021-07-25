function fetchImageWithLimit (arr, limit) {
  if (arr.length === 1) return Promise.resolve(arr[0]);
  let i = 0;
  
  return new Promise((resolve, reject) => {
    function run () {
      if (arr.length > 1) {
        const a = arr.shift();
        const b = arr.shift();
        i++;
        return add(a, b).then(res => {
          i--;
          arr.push(res);
          run();
        }).catch(() => {
          reject();
        })
      }
      if (i === 0) {
        resolve(arr[0]);
      }
    }
    
    while (i < limit && arr.length > 1) {
      run();
    }
  })
}

function add (a, b) {
  return Promise.resolve(a + b);
}

fetchImageWithLimit([1], 2).then(res => {
  console.log(res);
})
