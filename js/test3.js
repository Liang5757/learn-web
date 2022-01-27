const str = 'meituan';
const tar = 'uta';

function readPip() {
  let ans = 0;
  let j = 0, cur_size = 0;
  
  for (let i = 0; i < tar.length; i++) {
    while (cur_size < str.length) {
      if (str[j] !== tar[i]) {
        j++
        cur_size++;
        ans++;
        if (cur_size === str.length) {
          return -1;
        }
        if (j === str.length) {
          j = 0
        }
      } else {
        cur_size = 0;
        j++;
        break;
      }
    }
  }
  return ans;
}

console.log(readPip());
