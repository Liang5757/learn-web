function Singleton (name) {
  this.name = name;
}

Singleton.prototype.getName = function () {
  console.log(this.name);
}

// 利用闭包创建单例
Singleton.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();

let a = Singleton.getInstance('zheng');
let b = Singleton.getInstance('liang');

console.log(a === b); // true

let ProxySingleton = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  }
})();

let c = new ProxySingleton('liang1');
let d = new ProxySingleton('liang2');

console.log(c === d); // true

// 通用的惰性单例
function getSingle (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}

let bindEvent = getSingle(function () {
  
})
