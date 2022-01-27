function createArray (defaultValue, ...args) {
  if (args.length === 0) {
    return defaultValue;
  }
  
  const length = args[0];
  let arr = new Array(length || 0),
    i = length;
  
  const arguments = Array.prototype.slice.call(args, 1);
  while (i--) arr[length - 1 - i] = createArray.call(this, defaultValue, ...arguments);
  
  return arr;
}

console.log(createArray(4, 2));
