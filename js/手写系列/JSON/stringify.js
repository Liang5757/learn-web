// ����String��Boolean��Number��null
// ����undefined��symbol��function
// ѭ�����þ���
function stringify (obj) {
  let type = typeof obj;
  if (type !== "object" || obj === null) { // ����ǻ������ͻ�null��ֱ�ӷ���
    return String(obj);
  }
  
  let json = [];
  let isArray = Array.isArray(obj);
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      let item = obj[k];
      if (item === obj) { // ѭ�����þ���
        console.error(new TypeError("Converting circular structure to JSON"));
        return false;
      }
      if (type === "object") { // ����Ƕ���������ݹ����
        item = stringify(item);
      }
      json.push(isArray ? `${item}` : `${k}:${item}`)
    }
  }
  
  return isArray ? `[${json}]` : `{${json}}`;
}

// ���Դ���
console.log(stringify({name: {name: "abc"}})); // "{"name": "{"name": "abc"}"}"
console.log(stringify([1, 2, 4])); // "["1","2","4"]"
console.log(stringify(null)); // "null"
console.log(stringify(undefined)); // "undefined"
console.log(stringify("123")); // "123"
