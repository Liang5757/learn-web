// 判断是否是window，这里巧用了window上面有个window属性
function isWindow( obj ) {
  return obj != null && obj === obj.window;
}

// jquery源码，判断是否是类数组对象
function isArrayLike( obj ) {
  //  是否存在length 属性
  let length = !!obj && obj.length,
    type = typeof obj;
  // 排除function window
  if ( typeof type === "function" || isWindow( obj ) ) {
    return false;
  }
  // 数组判断： type === "array"  类数组判断：存在length属性值； length值为数字且大于0； obj[length - 1] 存在；
  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

function each(obj, callback) {
  let length, i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj
}

let data = { 0: "a", 1: "b", length: 2 }
each(data, (key, val) => {
  console.log(key, val);
});
