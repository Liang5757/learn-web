function isPlainObject (target) {
  // 1.先排除明显不是Object的
  if (!target || Object.prototype.toString.call(target) !== "[object Object]") return false;
  
  // 2.判断是否有原型，没有原型的是简单对象
  const proto = Object.getPrototypeOf(target);
  if (!proto) return true;
  
  // 3.判断其构造函数是否为 Object
  const ctor = proto.constructor;
  return typeof ctor === "function" && ctor === Object;
}


console.log(isPlainObject("join"))
