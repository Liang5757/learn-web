function deepClone(target) {
  let result = null;
  if (Array.isArray(target)) {
    result = [];
    for (let value of target) {
      result.push(deepClone(value));
    }
  } else if (isObject(target)) {
    result = {}
    for (let key in target) {
      result[key] = deepClone(target[key]);
    }
  } else {
    result = target;
  }
  
  return result;
}

function isObject(target) {
  return Object.prototype.toString.call(target) === "[object Object]";
}


let test = {
  a: 1,
  b: 2,
  c: {
    d: 3
  }
}

let cloneTest = deepClone(test);
console.log(cloneTest, cloneTest === test);
