function getNext (T) {
  let i = 1, j = 0;
  let next = [0, 0];
  while (i < T.length) {
    if (j === 0 || T[i] === T[j]) {
      if (T[++i] !== T[++j]) {
        next[i] = j;
      } else {
        next[i] = next[j];
      }
      
    } else {
      j = next[j];
    }
  }
  return next;
}

function indexOf (S, T, pos) {
  let i = pos;
  let j = 0;
  let next = getNext(T);
  
  while (i < S.length && j < T.length) {
    if (j === 0 || S[i] === T[j]) {
      ++i;
      ++j;
    } else {
      j = next[j];
    }
  }
  
  if (j === T.length) {
    return i - T.length;
  } else {
    return -1;
  }
}

console.log(getNext('abbbbdasd'))
console.log(indexOf('asbaaaaabcdeFDG', 'baaaa', 0))

