function maxSquare (matrix) {
  let max = 0;
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 1) {
        max = Math.max(searchSize(matrix, i, j), max);
      }
    }
  }
  
  return max ** 2;
}

function searchSize (matrix, i, j) {
  let minX = matrix[0].length - i;
  let ans = 0;
  for (let m = i; m < matrix.length; m++) {
    let x = 0;
    
    for (let n = j; n < matrix[0].length; n++) {
      if (matrix[m][n] === 1) {
        x++;
      } else {
        break;
      }
    }
    
    minX = Math.min(x, minX);
    ans = Math.max(Math.min(minX, m - i + 1), ans);
  }
  
  return ans;
}


console.log(maxSquare(
  [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0]
  ]));
