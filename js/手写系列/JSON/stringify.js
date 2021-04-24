// 区分String与Boolean、Number、null
// 过滤undefined、symbol、function
// 循环引用警告
function stringify (obj) {
  let type = typeof obj;
  if (type !== "object" || obj === null) { // 如果是基本类型或null则直接返回
    return String(obj);
  }
  
  let json = [];
  let isArray = Array.isArray(obj);
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      let item = obj[k];
      if (item === obj) { // 循环引用警告
        console.error(new TypeError("Converting circular structure to JSON"));
        return false;
      }
      if (type === "object") { // 如果是对象类型则递归调用
        item = stringify(item);
      }
      json.push(isArray ? `${item}` : `${k}:${item}`)
    }
  }
  
  return isArray ? `[${json}]` : `{${json}}`;
}

// 测试代码
console.log(stringify({name: {name: "abc"}})); // "{"name": "{"name": "abc"}"}"
console.log(stringify([1, 2, 4])); // "["1","2","4"]"
console.log(stringify(null)); // "null"
console.log(stringify(undefined)); // "undefined"
console.log(stringify("123")); // "123"
