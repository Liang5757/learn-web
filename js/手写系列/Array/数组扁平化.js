function flat(arr) {
  return [].concat(...arr.map(item => (Array.isArray(item) ? flat(item) : item)));
}

console.log(flat([1, 2, [3, [4, 5]]]));
